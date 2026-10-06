// src/composables/useUserContext.ts
import { computed } from 'vue'
import { useSessionStore } from '../stores/session'
import { useInquiryGroupsStore } from '../stores/inquiryGroups'
import { useInquiriesStore } from '../stores/inquiries'
import { usePreferencesStore } from '../stores/preferences'
import type { InquiryGroup } from '../stores/inquiryGroups.types'

export interface AgoraLocation {
  /** Raw string from NC profile — hint only */
  raw: string
  /** Explicitly chosen by user (overrides raw) */
  city?: string
  municipality?: string
  /** InquiryGroup slugs the user chose as "my place" */
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
    isLegislative: boolean
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
    isLegislative: !!session.currentUser?.isLegislative,
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
    const stored = (prefs.user as any)?.location as AgoraLocation | undefined
    if (stored?.city || stored?.municipality || (stored?.spaceSlugs?.length ?? 0) > 0) {
      return stored
    }
    return {
      raw: session.currentUser?.location ?? '',
      spaceSlugs: [],
    }
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
