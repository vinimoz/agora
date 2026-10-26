import { computed } from 'vue'
import type { Inquiry } from '../Types'
import { useHomeConfig } from './useHomeConfig'
import type { RelevanceTier } from '../Types/experience.types'
export type { RelevanceTier }
import { useUserContext, isValidContextTag, type AgoraContextTag } from './useUserContext'

// ------------------------------------------------------------
// Tag → tier semantics
//
// Relevance tiers are fixed across org types: for_you / local / region /
// public. What changes per org is the *label* on each tier — see
// HOME_TEMPLATES[*].relevance.tiers. The mapping here only depends on the
// abstract "specific scope vs broader scope" concept, so it stays the
// same regardless of org type.
//
//   'local' tier  → specific scope  (faculty, chapter, team, locality,
//                                     working group, …)
//   'region' tier → broader scope   (campus, branch, department, region…)
//
// Unknown tag types default to 'local' (conservative: assume narrow scope).
// Adding a new tag type is a one-line edit here — no schema change.
// ------------------------------------------------------------
type TagSemantics = { tier: RelevanceTier; weightKey: 'locality' | 'region' }

const TAG_SEMANTICS: Record<string, TagSemantics> = {
  // Municipality
  locality:      { tier: 'local',  weightKey: 'locality' },
  region:        { tier: 'region', weightKey: 'region' },

  // University
  faculty:       { tier: 'local',  weightKey: 'locality' },
  campus:        { tier: 'region', weightKey: 'region' },

  // Association
  chapter:       { tier: 'local',  weightKey: 'locality' },
  branch:        { tier: 'region', weightKey: 'region' },

  // Company
  team:          { tier: 'local',  weightKey: 'locality' },
  department:    { tier: 'region', weightKey: 'region' },

  // Cooperative
  working_group: { tier: 'local',  weightKey: 'locality' },
}

function tagSemantics(tagType: string): TagSemantics {
  return TAG_SEMANTICS[tagType] ?? { tier: 'local', weightKey: 'locality' }
}

/**
 * Extract context tags from an inquiry.
 *
 * Prefers the structured `miscFields.tags` array; falls back to synthesising
 * a `locality` tag from the legacy `miscFields.location` string so that
 * pre-tag inquiries score identically to before.
 */

function getInquiryTags(inquiry: Inquiry): AgoraContextTag[] {
  const raw = inquiry.miscFields?.tags
  if (Array.isArray(raw) && raw.length > 0) {
    return raw.filter(isValidContextTag)
  }
  const legacy = inquiry.miscFields?.location
  if (typeof legacy === 'string' && legacy.length > 0) {
    return [{ type: 'locality', value: legacy }]
  }
  return []
}

function buildTagMap(tags: AgoraContextTag[]): Map<string, Set<string>> {
  const map = new Map<string, Set<string>>()
  for (const t of tags) {
    let set = map.get(t.type)
    if (!set) {
      set = new Set()
      map.set(t.type, set)
    }
    set.add(t.value)
  }
  return map
}

export function useRelevance() {
  const { context } = useUserContext()
  const { config } = useHomeConfig()

  const weights = computed(() => config.value.relevance.weights)
  const tierLabels = computed(() => config.value.relevance.tiers)

  function score(inquiry: Inquiry) {
    const ctx = context.value
    const w = weights.value
    let score = 0
    const reasons: string[] = []
    let tier: RelevanceTier = 'public'

    // ---- Ownership ----
    if (inquiry.owner?.id === ctx.userId) {
      score += w.owner
      reasons.push('owner')
      tier = 'for_you'
    }

    // ---- Space membership ----
    if (ctx.spaces.some((s) => inquiry.inquiryGroups?.includes(s.id))) {
      score += w.space
      reasons.push('your space')
      if (tier === 'public') tier = 'for_you'
    }

    // ---- Context tags ----
    //
    // Every matching tag contributes its weight. A user with two matching
    // tag types (e.g. faculty + campus) is *more* relevant than one with a
    // single match, so we sum. Tier assignment uses the highest-priority
    // match only: 'local' (specific scope) wins over 'region' (broader).
    //
    // Tier only upgrades from 'public' — a 'for_you' match from ownership
    // never downgrades to 'local' just because a tag also matched.
    const inquiryTags = getInquiryTags(inquiry)
    if (inquiryTags.length > 0 && ctx.location.tags.length > 0) {
      const userTagMap = buildTagMap(ctx.location.tags)
      let bestTierScore = 0 // local = 2, region = 1, none = 0

      for (const inqTag of inquiryTags) {
        const userValues = userTagMap.get(inqTag.type)
        if (!userValues?.has(inqTag.value)) continue

        const { tier: tagTier, weightKey } = tagSemantics(inqTag.type)
        const tagWeight = w[weightKey] ?? 0

        score += tagWeight
        reasons.push(`your ${inqTag.type}`)

        const tagTierScore = tagTier === 'local' ? 2 : tagTier === 'region' ? 1 : 0
        if (tier === 'public' && tagTierScore > bestTierScore) {
          bestTierScore = tagTierScore
          tier = tagTier
        }
      }
    }

    // ---- Active phase ----
    if (inquiry.miscFields?.activePhase) {
      score += w.activePhase
      reasons.push('active phase')
    }

    // ---- Recency ----
    const ageDays = (Date.now() / 1000 - (inquiry.status?.created || 0)) / 86400
    if (ageDays < 7) {
      score += w.new
      reasons.push('new')
    }

    return { inquiry, score, tier, reasons }
  }

  function rank(list: Inquiry[]) {
    return list.map(score).sort((a, b) => b.score - a.score)
  }

  function byTier(list: Inquiry[]) {
    const out: Record<RelevanceTier, ReturnType<typeof score>[]> = {
      for_you: [],
      local: [],
      region: [],
      public: [],
    }
    for (const s of rank(list)) out[s.tier].push(s)
    return out
  }

  return { score, rank, byTier, tierLabels }
}
