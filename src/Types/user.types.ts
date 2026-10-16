/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// Search type constants
export const SEARCH_TYPE_USERS = 0
export const SEARCH_TYPE_GROUPS = 1
export const SEARCH_TYPE_ALL = 99

export type ISearchType = 0 | 1 | 2 | 4 | 7 | 51 | 99

export type UserType =
	| 'user'
	| 'admin'
	| 'public'
	| 'external'
	| 'guest'
	| 'empty'
	| 'ghost'
	| 'cron'
	| 'contact'
	| 'contactgroup'
	| 'circle'
	| 'group'
	| 'email'

export interface User {
	array: 'richArray' | 'simpleArray'
	id: string
	userId: string
	user: string | null
	displayName: string
	emailAddress: string
	type: UserType

	// role flags (only meaningful for richArray)
	isAdmin: boolean
	isOfficial: boolean
	isModerator: boolean
	isLegislative: boolean
	isGroupEditor: boolean
	isGuest: boolean
	isUnrestrictedOwner: boolean

	// i18n
	languageCode: string
	languageCodeIntl: string
	localeCode: string
	localeCodeIntl: string

	// Nextcloud group IDs
	groups: string[]

	// comes from IAccountManager → address
	location: string

	// misc
	description: string
	subname: string
	subtitle: string
	organisation: string
	timeZone: string
	categories: string[]
}

export type VirtualUserItemType = 'addPublicLink' | 'internalAccess' | 'deleted' | 'anonymous'

export type AppPermissions = {
	addShares: boolean
	addSharesExternal: boolean
	allAccess: boolean
	changeForeignInquiries: boolean
	deanonymizeInquiry: boolean
	inquiryCreation: boolean
	inquiryDownload: boolean
	publicShares: boolean
	seeMailAddresses: boolean
	unrestrictedOwner: boolean
}

export interface Participant {
	inquiryId: number
	user: User
}
