/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { User } from './user.types'
import type { InquiryType, InquiryFamily } from './inquiry.types'
import type { InquiryOptionType, OptionFamily } from './option.types'
import type { InquiryGroupType } from './inquiryGroups.types'

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

// ============================================================================
// HOME / NAVIGATION
// ============================================================================

export interface HeroActionConfig {
	key: string
	label: string
	icon: string
	color: string
	hint?: string
}

export interface HomeConfig {
	sections: string[]
	hero: {
		cityName?: string
		tagline?: string
		title?: string
		subtitle?: string
		backgroundUrl?: string
		showWeather?: boolean
		weather?: { temp: number; location: string }
		actions: Array<{
			key: string
			label: string
			icon: string
			color: string
			hint: string
		}>
	}
	promo?: {
		title?: string
		text?: string
		cta?: string
		imageUrl?: string
	}
	services: Array<{ key: string; label: string; icon: string }>
	relevance: {
		tiers: Record<string, unknown>[]
		weights: Record<string, number>
	}
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
