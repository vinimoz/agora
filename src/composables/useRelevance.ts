// src/composables/useRelevance.ts
import { computed } from 'vue'
import { useUserContext } from './useUserContext'
import { useSessionStore } from '../stores/session'
import type { Inquiry } from '../Types'

export type RelevanceTier = 'for_you' | 'local' | 'region' | 'public'

export function useRelevance() {
  const { context } = useUserContext()
  const session = useSessionStore()

  const weights = computed(() => {
    const w = session.appSettings?.home?.relevance?.weights
    return {
      owner:        w?.owner        ?? 100,
      participant:  w?.participant  ?? 60,
      space:        w?.space        ?? 40,
      city:         w?.city         ?? 30,
      municipality: w?.municipality ?? 15,
      activePhase:  w?.activePhase  ?? 20,
      new:          w?.new          ?? 10,
    }
  })

  const tierLabels = computed(() =>
    session.appSettings?.home?.relevance?.tiers ?? [
      { key: 'for_you', label: 'For you' },
      { key: 'local',   label: 'Local' },
      { key: 'region',  label: 'Region' },
      { key: 'public',  label: 'Public' },
    ],
  )

  function score(inquiry: Inquiry) {
    const ctx = context.value
    const w = weights.value
    let score = 0
    const reasons: string[] = []
    let tier: RelevanceTier = 'public'

    if (inquiry.owner?.id === ctx.userId) {
      score += w.owner; reasons.push('owner'); tier = 'for_you'
    }
    if (ctx.spaces.some((s) => inquiry.inquiryGroups?.includes(s.id))) {
      score += w.space; reasons.push('your space'); if (tier === 'public') tier = 'for_you'
    }
    // Participation is not on Inquiry directly in your schema — extend later:
    // if (inquiry.currentUserStatus?.isInvolved) { ... }

    const inquiryLocation = (inquiry.miscFields?.location as string) || ''
    const explicit = ctx.location
    if (tier === 'public' && explicit.city && inquiryLocation === explicit.city) {
      score += w.city; reasons.push('your city'); tier = 'local'
    } else if (tier === 'public' && explicit.municipality && inquiryLocation === explicit.municipality) {
      score += w.municipality; reasons.push('your area'); tier = 'region'
    }

    // Active phase — if you expose `miscFields.activePhase`:
    if (inquiry.miscFields?.activePhase) { score += w.activePhase; reasons.push('active phase') }

    const ageDays = (Date.now() / 1000 - (inquiry.status?.created || 0)) / 86400
    if (ageDays < 7) { score += w.new; reasons.push('new') }

    return { inquiry, score, tier, reasons }
  }

  function rank(list: Inquiry[]) {
    return list.map(score).sort((a, b) => b.score - a.score)
  }

  function byTier(list: Inquiry[]) {
    const out: Record<RelevanceTier, ReturnType<typeof score>[]> = {
      for_you: [], local: [], region: [], public: [],
    }
    for (const s of rank(list)) out[s.tier].push(s)
    return out
  }

  return { score, rank, byTier, tierLabels }
}
