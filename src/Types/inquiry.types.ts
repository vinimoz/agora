/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { User } from './user.types'
import type { Option } from './option.types'
import type { SupportEngine, SupportResult } from './support.types'

// ============================================================================
// SHARED PRIMITIVES
// ============================================================================

export type Chunking = {
	size: number
	loaded: number
}

export type StatusResults =
	| 'error'
	| 'warning'
	| 'success'
	| 'loading'
	| 'loaded'
	| 'unchanged'
	| ''

export type SignalingType = '' | 'empty' | 'error' | 'valid' | 'invalid' | 'success' | 'checking'

export type ButtonMode = 'navigation' | 'actionMenu' | 'native'

export interface BaseEntry {
	id: number
	name: string
	parentId?: number
	children?: BaseEntry[]
}

// ============================================================================
// INQUIRY ENUMS
// ============================================================================

export type VisibilityType = 'private' | 'groups' | 'participants' | 'everyone' | 'users'
export type PublicationStatus = 'draft' | 'pending' | 'published' | 'archived' | 'deleted'
export type ShowResultsType = 'always' | 'closed' | 'never'
export type ModerationWorkflowStatus = 'draft' | 'pending' | 'accepted' | 'rejected'
export type InquiryWorkflowStatus =
	| 'draft'
	| 'waiting_approval'
	| 'active'
	| 'closed'
	| 'rejected'
export type SortParticipants = 'alphabetical' | 'supportCount' | 'unordered'

// ============================================================================
// INQUIRY CONFIG / STATUS / PERMISSIONS
// ============================================================================

export type InquiryConfiguration = {
	autoReminder: boolean
	expire: number
	forceConfidentialComments: boolean
	allowComment: number | null
	supportFeature: string
	supportEngine: SupportEngine[]
	visibility: VisibilityType
	visibilityGroups: string[]
	visibilityUsers: string[]
}

export type InquiryStatus = {
	moderationStatus: ModerationWorkflowStatus
	inquiryStatus: InquiryWorkflowStatus
	lastInteraction: number
	created: number
	isAnonymous: boolean
	isArchived: boolean
	isExpired: boolean
	relevantThreshold: number
	deletionDate: number
	archivedDate: number
	supportResult: SupportResult[] | null
	countParticipants: number
	countComments: number
	countSupports: number
	trendingScore: number
	publicationStatus: string
}

export type InquiryPermissions = {
	view: boolean
	edit: boolean
	delete: boolean
	archive: boolean
	support: boolean
	comment: boolean
	addShares: boolean
	addSharesExternal: boolean
	changeForeignInquiries: boolean
	changeOwner: boolean
	reorderOptions: boolean
	seeResults: boolean
	seeUsernames: boolean
	subscribe: boolean
	takeOver: boolean
	deanonymize: boolean
	addOptions: boolean
	confirmOptions: boolean
	clone: boolean
}

export type CurrentUserStatus = {
	groupInvitations: string[]
	isInvolved: boolean
	isShared: boolean
	hasSupported: boolean
	supportValue: string | null
	isLocked: boolean
	isLoggedIn: boolean
	isOwner: boolean
	shareToken: string
	userId: string
	userRole: string
	countInquiries: number
	orphanedInquiries: number
}

export type InquiryMeta = {
	chunking: Chunking
	status: StatusResults
}

// ============================================================================
// INQUIRY
// ============================================================================

export type Inquiry = {
	id: number
	type: string
	family: string
	coverId: number
	title: string
	description: string
	descriptionSafe: string
	parentId: number | null
	locationId: number
	categoryId: number
	owner: User
	ownedGroup: string
	inquiryGroups: number[]
	childs: Inquiry[]
	miscFields: Record<string, unknown>
	configuration: InquiryConfiguration
	status: InquiryStatus
	currentUserStatus: CurrentUserStatus
	permissions: InquiryPermissions
	revealParticipants: boolean
	sortParticipants: SortParticipants
	meta: InquiryMeta
}

// ============================================================================
// INQUIRY TYPE / FAMILY
// ============================================================================

export interface InquiryType {
	id: number
	inquiry_type: string
	family: string
	icon: string
	label: string
	description?: string
	fields: string[]
	allowed_response: string[]
	allowed_transformation: string[]
	allowed_option_type: string[]
	allow_comment: number
	support_feature: string
	is_root: boolean
	created: number
}

export interface InquiryFamily {
	id: number
	family_type: string
	label: string
	description?: string
	icon: string
	sort_order: number
	ui: string[]
	features: string[]
	rules: string[]
	actions: string[]
	statuses: string[]
	created: number
}

export type FamilyType = 'vote' | 'timeline' | 'kanban'

// ============================================================================
// LIST / FILTERS
// ============================================================================

export type ViewMode = 'table-view' | 'list-view'

export type SortType =
	| 'created'
	| 'title'
	| 'visibility'
	| 'owner'
	| 'comments'
	| 'supports'
	| 'expire'
	| 'interaction'
	| 'type'
	| 'countComments'
	| 'countSupports'

export type SortDirection = 'asc' | 'desc'

export type FilterType =
	| 'relevant'
	| 'my'
	| 'private'
	| 'reject'
	| 'open'
	| 'participated'
	| 'shared'
	| 'group'
	| 'all'
	| 'closed'
	| 'archived'
	| 'admin'
	| 'moderate'
	| 'for_you'
	| 'to_vote'
	| 'debates'

export type AdvancedFilters = {
	type?: FilterType
	categoryId?: string
	locationId?: string
	hasComments?: boolean
	hasSupports?: boolean
	parentId?: number | null
	search?: string
	familyType?: string
	types?: string[]
}

export type FilterState = {
	currentFilter: FilterType
	advancedFilters: AdvancedFilters
}

export type InquiryCategory = {
	id: FilterType
	title: string
	titleExt: string
	description: string
	pinned: boolean
	showInNavigation(): boolean
	filterCondition(inquiry: Inquiry): boolean
}

export type InquiryCategoryList = Record<FilterType, InquiryCategory>

export type InquiryListMeta = {
	chunks: Chunking
	maxInquiriesInNavigation: number
	status: StatusResults
}

export type InquiryList = {
	inquiries: Inquiry[]
	viewMode: ViewMode
	meta: InquiryListMeta
	sort: {
		by: SortType
		reverse: boolean
	}
	status: {
		loadingGroups: boolean
	}
	categories: InquiryCategoryList

	currentFilter: FilterType
	advancedFilters: AdvancedFilters
}

// ============================================================================
// UNIFIED ITEM — consumed by family layouts
// ============================================================================

export type ItemKind = 'option' | 'inquiry'

export interface Item {
	kind: ItemKind
	id: number
	parentId: number
	title: string
	text: string
	type: string
	family: string
	owner: User
	statusKey: string
	raw: Option | Inquiry
}
