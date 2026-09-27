/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { t } from '@nextcloud/l10n'
import { computed, ref, watch, onMounted, type ComputedRef, type Ref } from 'vue'
import { useSupportEngineStore } from '../stores/supportEngine'
import { useSupportsStore } from '../stores/supports'
import { useOptionsStore } from '../stores/options'
import { useSessionStore } from '../stores/session'
import { useInquiryStore } from '../stores/inquiry'
import { useInquiriesStore } from '../stores/inquiries'
import type { SupportResultData } from './index.ts'
import type { Option, Inquiry, SupportEngine, SupportValue } from '../Types/index'
// import { useTrending } from './useTrending'
import { ENGINE_DEFINITIONS } from '../Types/votingType'

export type TargetType = 'option' | 'inquiry'

export interface VotableItem {
  id: number
  title: string
  [key: string]: unknown
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
  selectedOptions: Ref<Set<number>>
  hasUserVoted: ComputedRef<boolean>
  canVote: ComputedRef<boolean>
  canSubmitMultiVote: ComputedRef<boolean>
  voteSelectionInfo: ComputedRef<string | null>
  isEngineMulti: ComputedRef<boolean>

  totalVotes: ComputedRef<number>
  getItemVoteCount: (itemId: number) => number
  getPercentage: (item: VotableItem, total?: number) => number
  getRankedItems: (items: VotableItem[]) => VotableItem[]
  getWinner: (items: VotableItem[]) => VotableItem | null
  getWinnerPercentage: (items: VotableItem[]) => number
  getUserVoteValueForItem: (itemId: number) => SupportValue | null

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
  submitMultiVote: () => Promise<boolean>
  resetSelections: () => void
  hasUserVotedFor: (itemId: number) => boolean
  isSelectedForVote: (itemId: number) => boolean
  removeMyVote: () => Promise<boolean>
}

export function useVoteContext(
  parentId: number | null,
  targetType: TargetType
): VoteContext {
  const engineStore = useSupportEngineStore()
  const supportsStore = useSupportsStore()
  const optionsStore = useOptionsStore()
  const sessionStore = useSessionStore()
  const inquiryStore = useInquiryStore()
  const inquiriesStore = useInquiriesStore()

  // ---------- Engine management ----------
  const loadingEngines = ref(false)
  const selectedEngineId = ref<number | null>(null)
  
  // Get engines for this parent (inquiry or option group)
  const availableEngines = computed(() => {
    console.log(" PARENT IDDDDDDDDDDDDDDD",parentId)
    console.log(" TARGET TYPE  IDDDDDDDDDDDDDDD",targetType)

    if (!parentId) return []
    return engineStore.getEnginesByTarget(targetType, parentId)
  })

  const currentEngine = computed<SupportEngine | null>(() => {
    const engines = availableEngines.value
    if (!engines.length) return null

    if (selectedEngineId.value) {
      const found = engines.find((e) => e.id === selectedEngineId.value)
      if (found) {
        engineStore.setCurrentEngine(found)
        return found
      }
    }
    if (engines[0]) engineStore.setCurrentEngine(engines[0])
    return engines[0] || null
  })

  watch(
    availableEngines,
    (engines) => {
      if (engines.length > 0 && !selectedEngineId.value) {
        selectedEngineId.value = engines[0].id
      }
    },
    { immediate: true }
  )

  // Get votable items based on target type
  const votableItems = computed<VotableItem[]>(() => {
    const engine = currentEngine.value
    if (!engine?.target_ids) return []

    if (targetType === 'option') {
      const allOptions = optionsStore.options || []
      return allOptions.filter((opt) => engine.target_ids.includes(opt.id))
    } 
      // targetType === 'inquiry'
      const allInquiries = inquiriesStore.inquiries || []
      return allInquiries.filter((inq) => engine.target_ids.includes(inq.id))
    
  })

  const hasActiveEngine = computed(() => availableEngines.value.length > 0)

  const refreshEngines = async () => {
    // Implementation if needed
  }

  const selectEngine = (engineId: number) => {
    if (availableEngines.value.some((e) => e.id === engineId)) {
      selectedEngineId.value = engineId
      resetSelections()
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
  const selectedOptions = ref<Set<number>>(new Set())

const currentUserVotes = computed(() => {
  const userId = sessionStore.currentUser?.id
  // Check if parentId exists before proceeding
  if (!userId || !parentId) return []
  
  const engineId = currentEngine.value?.id
  if (!engineId) return []
  
  const votes = supportsStore.getSupportsByParent(parentId, targetType).filter((s) => s.userId === userId)
  const exact = votes.filter((s) => s.supportEngineId === engineId)
  return exact.length ? exact : votes.filter((s) => s.supportEngineId === null)
})

const hasUserVoted = computed(() => {
  const engineId = currentEngine.value?.id
  // Check if parentId exists before proceeding
  if (!engineId || !parentId) return false
  const userId = sessionStore.currentUser?.id
  if (!userId) return false
  return supportsStore
    .getSupportsByParent(parentId, targetType)
    .some(s => s.userId === userId && s.supportEngineId === engineId)
})

  const isEngineMulti = computed(() => {
    const def = ENGINE_DEFINITIONS[effectiveEngineId.value]
    return def?.voteScope !== 'none'
  })

  const canVote = computed(() => {
    const engine = currentEngine.value
    if (!engine || engine.status !== 'active') return false
    if (!isEngineMulti.value && hasUserVoted.value) return false
    return true
  })

  // ---------- Helper functions ----------
  const hasUserVotedFor = (itemId: number): boolean => {
    if (currentUserVotes.value.some((v) => v.optionId === itemId)) return true
    
    const engineVote = currentUserVotes.value.find((v) => v.optionId === 0)
    if (engineVote && typeof engineVote.value === 'object') {
      const val = engineVote.value
      if (val.scores && val.scores[itemId] !== undefined) return true
      if (val.reactions && val.reactions[itemId] !== undefined) return true
      if (val.ranking && val.ranking[itemId] !== undefined) return true
      if (val.grades && val.grades[itemId] !== undefined) return true
      if (val.selected && val.selected.includes(itemId)) return true
    }
    return false
  }

  const isSelectedForVote = (itemId: number): boolean => {
    const engineId = effectiveEngineId.value
    if (['binary', 'ternary', 'score', 'star'].includes(engineId)) {
      return scores.value[itemId] !== undefined && scores.value[itemId] !== null
    }
    if (engineId === 'reaction') {
      return reactions.value[itemId] !== undefined && reactions.value[itemId].length > 0
    }
    if (['ranking', 'condorcet', 'borda'].includes(engineId)) {
      return rankings.value[itemId] !== undefined && rankings.value[itemId] !== null
    }
    if (engineId === 'majority_judgment') {
      return grades.value[itemId] !== undefined && grades.value[itemId] !== null
    }
    if (engineId === 'quadratic') {
      return quadraticVotes.value[itemId] !== undefined && quadraticVotes.value[itemId] > 0
    }
    if (engineId === 'token_weighted') {
      return tokenWeights.value[itemId] !== undefined && tokenWeights.value[itemId] > 0
    }
    if (['approval', 'phased_voting'].includes(engineId)) {
      return selectedOptions.value.has(itemId)
    }
    return false
  }

  // Get the saved vote for the current engine (if any)
const currentUserVoteForEngine = computed(() => {
  const userId = sessionStore.currentUser?.id
  // Check if parentId exists before proceeding
  if (!userId || !parentId) return null
  const engineId = currentEngine.value?.id
  if (!engineId) return null
  const votes = supportsStore.getSupportsByParent(parentId, targetType)
  return votes.find(s => s.userId === userId && s.supportEngineId === engineId) || null
})

  // Compare current selections with saved vote
  const hasSelectionsChanged = computed(() => {
    const savedVote = currentUserVoteForEngine.value
    if (!savedVote) return true

    const engineType = effectiveEngineId.value
    const saved = savedVote.value

    if (savedVote.optionId > 0) {
      return false
    }

    if (typeof saved !== 'object' || saved === null) return true

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
        return !objectsEqual(scores.value, saved.scores || {})
      case 'reaction':
        return !objectsEqual(reactions.value, saved.reactions || {})
      case 'approval':
      case 'phased_voting': {
        const currentSet = new Set(selectedOptions.value)
        const savedSet = new Set(saved.selected || [])
        if (currentSet.size !== savedSet.size) return true
        for (const id of currentSet) {
          if (!savedSet.has(id)) return true
        }
        return false
      }
      case 'ranking':
      case 'condorcet':
      case 'borda':
        return !objectsEqual(rankings.value, saved.ranking || {})
      case 'majority_judgment':
        return !objectsEqual(grades.value, saved.grades || {})
      case 'quadratic':
        return !objectsEqual(quadraticVotes.value, saved.scores || {})
      case 'token_weighted':
        return !objectsEqual(tokenWeights.value, saved.scores || {})
      default:
        return true
    }
  })

  const getUserVoteValueForItem = (itemId: number): SupportValue | null => {
    const vote = currentUserVotes.value.find((v) => v.optionId === itemId)
    if (vote) return vote.value
    
    const engineVote = currentUserVotes.value.find((v) => v.optionId === 0)
    if (engineVote && typeof engineVote.value === 'object') {
      const val = engineVote.value
      if (val.scores && typeof val.scores === 'object') return val.scores[itemId] ?? null
      if (val.reactions && typeof val.reactions === 'object') return val.reactions[itemId] ?? null
      if (val.ranking && typeof val.ranking === 'object') return val.ranking[itemId] ?? null
      if (val.grades && typeof val.grades === 'object') return val.grades[itemId] ?? null
      if (val.selected && Array.isArray(val.selected))
        return val.selected.includes(itemId) ? 1 : null
    }
    return null
  }

  // ---------- Update functions ----------
  const toggleSelection = (itemId: number) => {
    if (selectedOptions.value.has(itemId)) selectedOptions.value.delete(itemId)
    else selectedOptions.value.add(itemId)
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
    selectedOptions.value.clear()
    rankings.value = {}
    scores.value = {}
    grades.value = {}
    reactions.value = {}
    quadraticVotes.value = {}
    tokenWeights.value = {}
  }

  // ---------- Submission ----------
  const submitSingleVote = async (parentId: number, item: VotableItem, value: SupportValue) => {
    if (!canVote.value || !parentId) return false
    try {
      await supportsStore.toggleSupport(
        parentId,
        item.id,
        sessionStore.currentUser?.id,
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
    const engineId = effectiveEngineId.value
    const config = currentEngine.value?.config || {}
    let valid = false

    switch (engineId) {
      case 'binary':
      case 'ternary':
        valid = Object.values(scores.value).filter((v) => v !== null && v !== undefined).length > 0
        break

      case 'approval': {
        const min = (config.min_choices as number) || 1
        const max = config.max_choices as number | null
        const count = selectedOptions.value.size
        valid = count >= min && (max === null || count <= max) && count > 0
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
        if (scored.length === 0) { valid = false; break }
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
        valid = selectedOptions.value.size > 0
        break

      default:
        valid = selectedOptions.value.size > 0
    }
    return valid
  })

  const voteSelectionInfo = computed(() => {
    const engineId = effectiveEngineId.value
    const config = currentEngine.value?.config || {}

    if (['approval', 'phased_voting'].includes(engineId)) {
      const min = (config.min_choices as number) || 1
      const max = config.max_choices as number | null
      const count = selectedOptions.value.size
      if (max) return t('agora', '{count}/{max} selected (min: {min})', { count, max, min })
      return t('agora', '{count} selected (min: {min})', { count, min })
    }
    if (['ranking', 'condorcet', 'borda'].includes(engineId)) {
      const count = Object.values(rankings.value).filter(
        (v) => v !== null && v !== undefined
      ).length
      return t('agora', '{count} options ranked', { count })
    }
    if (['score', 'star'].includes(engineId)) {
      const count = Object.values(scores.value).filter((v) => v !== null && v !== undefined).length
      return t('agora', '{count} options rated', { count })
    }
    if (engineId === 'majority_judgment') {
      const count = Object.values(grades.value).filter((v) => v !== null && v !== undefined).length
      return t('agora', '{count} options graded', { count })
    }
    if (engineId === 'reaction') {
      const count = Object.values(reactions.value).filter(
        (v) => v !== null && v !== undefined
      ).length
      return t('agora', '{count} reactions selected', { count })
    }
    if (engineId === 'quadratic') {
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
    if (engineId === 'token_weighted') {
      const count = Object.values(tokenWeights.value).filter(
        (v) => v !== null && v !== undefined && v > 0
      ).length
      return t('agora', '{count} options weighted', { count })
    }
    const count = Object.values(scores.value).filter((v) => v !== null && v !== undefined).length
    return t('agora', '{count} options voted', { count })
  })

  async function submitMultiVote() {
    if (!canVote.value || !canSubmitMultiVote.value || !parentId) return false

    const engine = currentEngine.value
    if (!engine) return false
    const engineId = engine.id
    const userId = sessionStore.currentUser?.id
    if (!userId) return false

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
        const selected = Array.from(selectedOptions.value)
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
        const selected = Array.from(selectedOptions.value)
        const round = (engine.config?.current_round as number) || 1
        if (selected.length === 0) return false
        payload = { selected, round }
        break
      }

      default:
        payload = { selected: Array.from(selectedOptions.value) }
        break
    }

    const existing = supportsStore.getSupport(parentId, userId, 0, engineId)

    try {
      if (existing) {
        await supportsStore.updateSupport(parentId, userId, payload, 0, engineId)
      } else {
        await supportsStore.addSupport(parentId, userId, payload, 0, engineId)
      }

      await loadUserVotesForEngine(engineId)
      await loadResults()
      return true
    } catch (error) {
      console.error('Failed to submit multi-vote:', error)
      return false
    }
  }

  // ---------- Results ----------
  const resultsMap = ref<Map<number, unknown>>(new Map())
  const engineResult = ref<SupportResultData>(null)

  const getItemVoteCount = (itemId: number): number => {
    if (effectiveEngineId.value === 'trending') {
      return getTrendingScore(itemId)
    }

    const engineId = effectiveEngineId.value
    const perOptionEngines = ['binary', 'ternary', 'score', 'star', 'majority_judgment', 'reaction']

    if (perOptionEngines.includes(engineId)) {
      const result = resultsMap.value.get(itemId)
      if (result) {
        switch (result.type) {
          case 'binary':
            return result.options?.[itemId]?.yes ?? result.totals?.yes ?? 0
          case 'ternary':
            return result.options?.[itemId]?.yes ?? result.totals?.yes ?? 0
          case 'score':
          case 'star':
            return result.options?.[itemId]?.total ?? result.totals?.total ?? 0
          case 'reaction': {
            const perOpt = result.options?.[itemId]
            if (perOpt) return Object.values(perOpt).reduce((a, b) => a + b, 0)
            return Object.values(result.counts || {}).reduce((a, b) => a + b, 0)
          }
          case 'majority_judgment':
            return result.options?.[itemId]?.total_votes ?? 0
        }
      }
      const res = engineResult.value
      if (res) {
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
            if (perOpt) return Object.values(perOpt).reduce((a, b) => a + b, 0)
            return Object.values(res.counts || {}).reduce((a, b) => a + b, 0)
          }
          case 'majority_judgment':
            return res.options?.[itemId]?.total_votes ?? 0
        }
      }
      return 0
    }

    const res = engineResult.value
    if (!res) return 0

    switch (engineId) {
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

  const totalVotes = computed(() => {
    if (effectiveEngineId.value === 'trending') {
      let total = 0
      for (const item of votableItems.value) total += getTrendingScore(item.id)
      return total
    }

    const engineId = effectiveEngineId.value
    const perOptionEngines = ['binary', 'ternary', 'score', 'star', 'majority_judgment', 'reaction']

    const res = engineResult.value
    if (res && perOptionEngines.includes(engineId)) {
      if (res.options) {
        let total = 0
        for (const optId in res.options) {
          const opt = res.options[optId]
          if (res.type === 'binary' || res.type === 'ternary') {
            total += (opt.yes || 0) + (opt.no || 0) + (opt.abstain || 0)
          } else if (res.type === 'score' || res.type === 'star') {
            total += opt.total || 0
          } else if (res.type === 'reaction') {
            total += Object.values(opt).reduce((a, b) => a + b, 0)
          } else if (res.type === 'majority_judgment') {
            total += opt.total_votes || 0
          }
        }
        return total
      } if (res.totals) {
        if (res.type === 'binary') return (res.totals.yes || 0) + (res.totals.no || 0)
        if (res.type === 'ternary')
          return (res.totals.yes || 0) + (res.totals.no || 0) + (res.totals.abstain || 0)
        if (res.type === 'score' || res.type === 'star') return res.totals.total || 0
        if (res.type === 'reaction')
          return Object.values(res.counts || {}).reduce((a, b) => a + b, 0)
        if (res.type === 'majority_judgment') return res.total_votes || 0
        return 0
      }
      return 0
    }

    if (perOptionEngines.includes(engineId)) {
      let total = 0
      for (const result of resultsMap.value.values()) {
        switch (result.type) {
          case 'binary':
            total += (result.totals?.yes || 0) + (result.totals?.no || 0)
            break
          case 'ternary':
            total +=
              (result.totals?.yes || 0) + (result.totals?.no || 0) + (result.totals?.abstain || 0)
            break
          case 'score':
          case 'star':
            total += result.totals?.total || 0
            break
          case 'majority_judgment':
            total += result.total_votes || 0
            break
          case 'reaction':
            total += Object.values(result.counts || {}).reduce((a, b) => a + b, 0)
            break
        }
      }
      return total
    }

    if (!res) return 0
    switch (engineId) {
      case 'approval':
        return Object.values(res.counts || {}).reduce((a, b) => a + b, 0)
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
        return Object.values(res.counts || {}).reduce((a, b) => a + b, 0)
      default:
        return 0
    }
  })

  const getPercentage = (item: VotableItem, total: number = totalVotes.value): number => {
    const count = getItemVoteCount(item.id)
    if (total === 0) return 0
    return Math.round((count / total) * 100)
  }

  const getRankedItems = (items: VotableItem[]): VotableItem[] => {
    const engineId = effectiveEngineId.value
    if (engineId === 'ranking') {
      return [...items].sort(
        (a, b) => (getItemVoteCount(a.id) || Infinity) - (getItemVoteCount(b.id) || Infinity)
      )
    }
    if (['condorcet', 'borda'].includes(engineId)) {
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

  // ---------- Load user votes ----------
  function loadUserVotesForEngine(engineId: number) {
    const userId = sessionStore.currentUser?.id
    if (!userId || !parentId) return

    const userVotes = supportsStore
      .getSupportsByParent(parentId, targetType)
      .filter((s) => s.userId === userId && s.supportEngineId === engineId)

    for (const vote of userVotes) {
      const value = vote.value
      const itemId = vote.optionId

      if (itemId > 0) {
        const engine = effectiveEngineId.value
        if (typeof value === 'number') {
          if (['score', 'star'].includes(engine)) scores.value[itemId] = value
          if (['binary', 'ternary'].includes(engine)) scores.value[itemId] = value
        } else if (typeof value === 'string' && engine === 'majority_judgment') {
          grades.value[itemId] = value
        } else if (Array.isArray(value) && engine === 'reaction') {
          reactions.value[itemId] = value
        }
      }

      if (itemId === 0 && value && typeof value === 'object') {
        if (value.scores && typeof value.scores === 'object') {
          const engine = effectiveEngineId.value
          if (engine === 'quadratic') {
            for (const [optId, votes] of Object.entries(value.scores)) {
              quadraticVotes.value[Number(optId)] = votes as number
            }
          } else if (engine === 'token_weighted') {
            for (const [optId, weight] of Object.entries(value.scores)) {
              tokenWeights.value[Number(optId)] = weight as number
            }
          } else if (['binary', 'ternary', 'score', 'star'].includes(engine)) {
            for (const [optId, val] of Object.entries(value.scores)) {
              scores.value[Number(optId)] = val as number
            }
          }
        }

        if (value.reactions && typeof value.reactions === 'object') {
          for (const [optId, arr] of Object.entries(value.reactions)) {
            if (Array.isArray(arr)) reactions.value[Number(optId)] = arr
          }
        }

        if (value.ranking && typeof value.ranking === 'object') {
          for (const [optId, rank] of Object.entries(value.ranking)) {
            rankings.value[Number(optId)] = rank as number
          }
        }

        if (value.grades && typeof value.grades === 'object') {
          for (const [optId, grade] of Object.entries(value.grades)) {
            grades.value[Number(optId)] = grade as string
          }
        }

        if (value.selected && Array.isArray(value.selected)) {
          value.selected.forEach((id: number) => selectedOptions.value.add(id))
        }
      }
    }
  }

  /**
   * Remove all votes of the current user for the active engine.
   */
  const removeMyVote = async (): Promise<boolean> => {
    const engine = currentEngine.value
    if (!engine || !parentId) return false
    const userId = sessionStore.currentUser?.id
    if (!userId) return false

    const userVotes = supportsStore
      .getSupportsByParent(parentId, targetType)
      .filter(s => s.userId === userId && s.supportEngineId === engine.id)

    if (userVotes.length === 0) return false

    for (const support of userVotes) {
      await supportsStore.removeSupport(parentId, userId, support.optionId, engine.id)
    }

    resetSelections()
    await loadUserVotesForEngine(engine.id)
    await loadResults()

    return true
  }

  // ---------- Trending score (placeholder) ----------
  const getTrendingScore = (itemId: number): number => 
    // Implement trending score calculation if needed
     0
  

  const loadResults = () => {
    if (!parentId) return
    const inquiry = inquiryStore
    if (inquiry.status?.supportResult) {
      const results = inquiry.status.supportResult
      const engineResultEntry = results.find(
        (r) => r.support_engine_id === selectedEngineId.value && r.target_type === targetType
      )
      if (engineResultEntry) {
        engineResult.value = engineResultEntry.result
      }
    }
  }

  // ---------- Watchers ----------
  watch(
    currentEngine,
    (engine) => {
      if (engine) {
        loadUserVotesForEngine(engine.id)
        loadResults()
      }
    },
    { immediate: true }
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
    const min = effectiveEngineId.value === 'star' ? (config.min as number ?? 1) : (config.min as number ?? 0)
    const max = effectiveEngineId.value === 'star' ? (config.max as number ?? 5) : (config.max as number ?? 10)
    return min > max ? (effectiveEngineId.value === 'star' ? 1 : 0) : min
  })

  const scoreMax = computed(() => {
    if (!['score', 'star'].includes(effectiveEngineId.value)) return 10
    const config = currentEngine.value?.config || {}
    const min = effectiveEngineId.value === 'star' ? (config.min as number ?? 1) : (config.min as number ?? 0)
    const max = effectiveEngineId.value === 'star' ? (config.max as number ?? 5) : (config.max as number ?? 10)
    return min > max ? (effectiveEngineId.value === 'star' ? 5 : 10) : max
  })

  onMounted(async () => {
    if (availableEngines.value.length > 0 && !selectedEngineId.value) {
      selectedEngineId.value = availableEngines.value[0].id
    }
  })

  // ---------- Expose ----------
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
    selectedOptions,
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
  }
}
