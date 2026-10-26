// src/composables/useUserContext.ts
import { computed } from 'vue'
import { useSessionStore } from '../stores/session'
import { useInquiryGroupsStore } from '../stores/inquiryGroups'
import { useInquiriesStore } from '../stores/inquiries'
import { usePreferencesStore } from '../stores/preferences'
import type { InquiryGroup } from '../Types/inquiryGroups.types'


export interface AgoraContextTag {
  /** Tag type — e.g. 'locality', 'region', 'campus', 'faculty', 'chapter', 'team' */
  type: string
  /** Tag value — free string; matched by exact equality */
  value: string
}

export interface AgoraLocation {
  /** Raw string from NC profile — hint only */
  raw: string

  /**
   * Generic context tags — the canonical source for relevance scoring.
   * A user may have several: { type: 'faculty', value: 'Sciences' },
   * { type: 'campus', value: 'Punaauia' }, etc. Tag types are not
   * enumerated — the mapping from tag type to tier lives in useRelevance
   * (TAG_SEMANTICS), so adding a new type there is enough.
   */
  tags: AgoraContextTag[]

  /**
   * Legacy convenience fields.
   *
   * Populated from `tags` when the stored row only has tags, and backfilled
   * into `tags` when the stored row only has these fields. Kept so that any
   * existing consumer (and legacy DB rows) continue to work. New code should
   * read `tags`.
   */
  locality?: string
  region?: string

  spaceSlugs: string[]
}

export interface AgoraSpace {
  id: number
  slug: string
  title: string
  type: string
  role: 'owner' | 'member' | 'editor' | 'viewer'
}

export interface AgoraUserContext {
  userId: string
  displayName: string
  /** Free-form from NC profile */
  rawLocation: string
  /** Explicit location (user or admin chosen) */
  location: AgoraLocation
  /** Agora spaces the user belongs to */
  spaces: AgoraSpace[]
  /** Agora NC groups the user is in (from session) */
  ncGroups: string[]
  /** Global roles */
  roles: {
    isAdmin: boolean
    isModerator: boolean
    isOfficial: boolean
    isBoard: boolean
    isGroupEditor: boolean
  }
  preferences: {
    defaultDisplayMode: 'view' | 'create' | 'group'
    interests: string[]
    language: string
  }
}

export function useUserContext() {
  const session = useSessionStore()
  const groups = useInquiryGroupsStore()
  const inquiries = useInquiriesStore()
  const prefs = usePreferencesStore()

  const ncGroups = computed<string[]>(() => session.currentUser?.groups ?? [])

  const roles = computed(() => ({
    isAdmin: !!session.currentUser?.isAdmin,
    isModerator: !!session.currentUser?.isModerator,
    isOfficial: !!session.currentUser?.isOfficial,
    isBoard: !!session.currentUser?.isBoard,
    isGroupEditor: !!session.currentUser?.isGroupEditor,
  }))

  /**
   * Derive the user's Agora spaces from the InquiryGroup collection.
   * A user belongs to a group if:
   *   - they are the owner
   *   - the group's ownedGroup is one of their NC groups
   *   - the group visibility is 'groups' and one of their NC groups matches
   *   - the group visibility is 'users' and their userId is listed
   */
  const spaces = computed<AgoraSpace[]>(() => {
    const uid = session.currentUser?.id
    if (!uid) return []

    return groups.inquiryGroups
      .filter((g) => isUserInGroup(g, uid, ncGroups.value))
      .map((g) => toAgoraSpace(g, uid, ncGroups.value))
  })

  /**
   * Explicit location: prefer preferences, fall back to parsing NC profile string.
   * We DO NOT auto-map a free-form string to a specific group.
   */
const location = computed<AgoraLocation>(() => {
  const stored = (prefs.user as any)?.location as Partial<AgoraLocation> | undefined
  return normalizeLocation(stored, session.currentUser?.location ?? '')
})

  const context = computed<AgoraUserContext>(() => ({
    userId: session.currentUser?.id ?? '',
    displayName: session.currentUser?.displayName ?? '',
    rawLocation: session.currentUser?.location ?? '',
    location: location.value,
    spaces: spaces.value,
    ncGroups: ncGroups.value,
    roles: roles.value,
    preferences: {
      defaultDisplayMode: (prefs.user as any)?.defaultDisplayMode ?? 'view',
      interests: (prefs.user as any)?.interests ?? [],
      language: session.currentUser?.languageCodeIntl ?? 'en',
    },
  }))

  return { context, spaces, location, ncGroups, roles }
}

// ---- helpers ----
export function isValidContextTag(t: unknown): t is AgoraContextTag {
  if (!t || typeof t !== 'object') return false
  const tag = t as Record<string, unknown>
  return (
    typeof tag.type === 'string' &&
    tag.type.length > 0 &&
    typeof tag.value === 'string' &&
    tag.value.length > 0
  )
}

/**
 * Normalise whatever shape `prefs.user.location` happens to hold into a
 * canonical `AgoraLocation`. Handles three cases:
 *
 *   1. `tags` present         → canonical, backfill `locality` / `region`
 *   2. `locality`/`region`    → legacy, synthesise tags from them
 *   3. nothing stored         → empty, `raw` from the NC profile
 *
 * This replaces the previous `hasStoredPreference` short-circuit, which
 * only checked `locality` / `region` / `spaceSlugs` and silently dropped
 * a stored row that used a different tag vocabulary.
 */
function normalizeLocation(
  stored: Partial<AgoraLocation> | undefined | null,
  rawFromProfile: string,
): AgoraLocation {
  const raw =
    typeof stored?.raw === 'string' && stored.raw.length > 0 ? stored.raw : rawFromProfile

  const tags: AgoraContextTag[] = Array.isArray(stored?.tags)
	  ? stored.tags.filter(isValidContextTag)
	  : []

	  const spaceSlugs = Array.isArray(stored?.spaceSlugs) ? stored.spaceSlugs : []

	  let locality = typeof stored?.locality === 'string' ? stored.locality : undefined
	  let region = typeof stored?.region === 'string' ? stored.region : undefined

	  if (tags.length === 0) {
		  // Legacy → tags
		  if (locality) tags.push({ type: 'locality', value: locality })
		  if (region) tags.push({ type: 'region', value: region })
	  } else {
		  // tags → legacy convenience fields
		  if (!locality) locality = tags.find((t) => t.type === 'locality')?.value
			  if (!region) region = tags.find((t) => t.type === 'region')?.value
	  }

  return { raw, tags, locality, region, spaceSlugs }
}


function isUserInGroup(group: InquiryGroup, uid: string, ncGroups: string[]): boolean {
	if (group.owner?.id === uid) return true

		const cfg = group.configuration
		if (!cfg) return false

			if (cfg.visibility === 'groups' && cfg.visibilityGroups?.length) {
				return cfg.visibilityGroups.some((g) => ncGroups.includes(g))
			}
			if (cfg.visibility === 'users' && cfg.visibilityUsers?.length) {
				return cfg.visibilityUsers.includes(uid)
			}
			// 'everyone' → visible but not a "member"; keep it out of spaces
			return false
}

function toAgoraSpace(group: InquiryGroup, uid: string, ncGroups: string[]): AgoraSpace {
	let role: AgoraSpace['role'] = 'viewer'
	if (group.owner?.id === uid) role = 'owner'
		else if (group.permissions?.edit) role = 'editor'
			else if (group.permissions?.view) role = 'member'

				return {
					id: group.id,
					slug: group.slug,
					title: group.title,
					type: group.type,
					role,
				}
}
