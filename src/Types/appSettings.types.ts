/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { User } from './user.types'
import type { InquiryType, InquiryFamily } from './inquiry.types'
import type { InquiryOptionType, OptionFamily } from './option.types'
import type { InquiryGroupType } from './inquiryGroups.types'
import type { OrganizationType, RelevanceTier } from './experience.types'
import type { InquiryTypeRights, ModeratorRights, OfficialRights } from '../utils/permissions'

// ============================================================================
// SIMPLE TYPES
// ============================================================================

export type UpdateType = 'noInquirying' | 'periodicInquirying' | 'longInquirying'

export type Group = {
  id: string
  userId: string
  displayName: string
  emailAddress: string
  type: string
}


export interface OrganizationConfig {
  /** Which organization template this deployment (or tenant) uses. */
  type: OrganizationType
  tenantId?: number
  displayName?: string
}

// ============================================================================
// HOME / NAVIGATION
// ============================================================================
export interface PromoConfig {
  title: string
  text: string
  cta: string
  imageUrl: string | number
}

export interface RelevanceTierLabel {
  key: RelevanceTier
  label: string
}

export interface RelevanceWeights {
  owner: number
  participant: number
  space: number
  locality: number
  region: number
  activePhase: number
  new: number
}

export interface RelevanceConfig {
  tiers: RelevanceTierLabel[]
  weights: RelevanceWeights
}

export interface HeroRoute {
  name: string
  params?: Record<string, string | number>
  query?: Record<string, string | number | null | undefined>
}

export interface HeroAction {
  key: string
  label: string
  icon: string
  color?: string
  hint?: string
  /**
   * Where the action navigates. When omitted, the renderer falls back to
   * the legacy hardcoded switch in ExperienceRenderer (deprecated; kept
   * so pre-existing DB rows keep working).
   */
  route?: HeroRoute
}

export interface HeroActionConfig {
  key: string
  label: string
  icon: string
  color: string
  hint?: string
}

export interface HomeHeroConfig {
  cityName: string
  tagline: string
  title: string
  subtitle: string
  backgroundUrl: string
  showWeather?: boolean
  weather?: { temp: number; location: string }
  actions: HeroAction[]   // was: any[]
}

export interface HomeConfig {
  sections: string[]
  hero: HomeHeroConfig
  promo: PromoConfig
  relevance: RelevanceConfig
  sectionLabels?: Record<string, string>
}

export interface NavigationConfig {
  [key: string]: unknown
}

// ============================================================================
// CATEGORY / LOCATION
// ============================================================================

export interface Category {
  id: number
  name: string
  parentId: number | null
}

export interface Location {
  id: number
  name: string
  parentId: number | null
}

// ============================================================================
// STATUS DEFINITION
// NOTE: renamed from `InquiryStatus` to avoid clash with the runtime
//       `InquiryStatus` defined in `inquiry.types.ts`.
// ============================================================================

export interface InquiryStatusDefinition {
  id: number
  inquiryType: string
  statusKey: string
  label: string
  description?: string
  isFinal: boolean
  icon: string
  order?: number
}

// ============================================================================
// APP SETTINGS
// ============================================================================

export type AppSettings = {
  allAccessGroups: string[]
  allowPublicShares: boolean
  allowAllAccess: boolean
  allowInquiryCreation: boolean
  allowInquiryDownload: boolean
  autoExpire: boolean
  autoExpireOffset: number
  autoArchive: boolean
  autoArchiveOffset: number
  autoDelete: boolean
  autoDeleteOffset: number
  defaultPrivacyUrl: string
  defaultImprintUrl: string
  disclaimer: string
  imprintUrl: string
  legalTermsInEmail: boolean
  privacyUrl: string
  showMailAddresses: boolean
  showLogin: boolean
  unrestrictedOwner: boolean
  updateType: UpdateType
  useActivity: boolean
  useCollaboration: boolean
  useModeration: boolean
  officialBypassModeration: boolean
  useSiteLegalTerms: boolean
  navigationInquiriesInList: boolean
  finalPrivacyUrl: string
  finalImprintUrl: string
  publicSharesGroups: string[]
  inquiryCreationGroups: string[]
  inquiryDownloadGroups: string[]
  showMailAddressesGroups: string[]
  unrestrictedOwnerGroups: string[]
  home?: HomeConfig
  organization?: OrganizationConfig
  navigation?: NavigationConfig
  categoryTab: Category[]
  locationTab: Location[]
  inquiryStatusTab: InquiryStatusDefinition[]
  inquiryTypeTab: InquiryType[]
  inquiryOptionTypeTab: InquiryOptionType[]
  inquiryGroupTypeTab: InquiryGroupType[]
  inquiryFamilyTab: InquiryFamily[]
  optionFamilyTab: OptionFamily[]
  groups: Group[]
  inquiryTypeRights: Record<string, InquiryTypeRights>
  moderatorRights: ModeratorRights
  officialRights: OfficialRights
  status: {
    loadingGroups: boolean
  }
}

// Keep `User` in the public surface for callers
export type { User }
