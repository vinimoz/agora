// SPDX-FileCopyrightText: 2023 Nextcloud contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useSessionStore } from '../stores/session.ts'
import { useAppSettingsStore } from '../stores/appSettings.ts'
import { useParticipationStore } from '../stores/participation.ts'
import { useInquiryStore } from '../stores/inquiry.ts'
import { useInquiryGroupStore } from '../stores/inquiryGroup.ts'
import { isInquiryFinalStatus } from '../helpers/modules/InquiryHelper'
import type { Inquiry, InquiryGroup, Option } from '../Types/index.ts'
import type { ParticipationPolicy } from '../Api/modules/participation'

/* ============================================================
 * VISIBILITY / STATUS
 * ============================================================
 *
 *   - configuration.visibility       ('private' | 'groups' | 'users' | 'participants' | 'everyone' | 'moderate')
 *   - configuration.visibilityGroups (string[]  — Nextcloud groups)
 *   - configuration.visibilityUsers  (string[]  — user IDs)
 * ============================================================ */

export type VisibilityType =
	| 'private'
	| 'groups'
	| 'users'
	| 'participants'
	| 'everyone'
	| 'invitation'

export enum PublicationStatusLevel {
	Draft = 'draft',
	Pending = 'pending',
	Published = 'published',
	Archived = 'archived',
	Deleted = 'deleted',
}

export enum InquiryFamily {
	Legislatif = 'legislative',
	Administratif = 'administrative',
	Collective = 'collective',
	Official = 'official',
}

export enum UserType {
	Guest = 'guest',
	User = 'user',
	Moderator = 'moderator',
	Official = 'official',
	Admin = 'admin',
	Owner = 'owner',
}

export enum ContentType {
	Inquiry = 'inquiry',
	Comment = 'comment',
	Support = 'support',
	Attachment = 'attachment',
	Share = 'share',
	InquiryGroup = 'inquiry_group',
	Option = 'option',
}

/* ============================================================
 * RIGHTS ()
 * ============================================================ */

export interface ModeratorRights {
	changeInquiryStatus?: boolean
	deleteInquiry?: boolean
	archiveInquiry?: boolean
	transferInquiry?: boolean
	modifyInquiry?: boolean
	addShares?: boolean
	addSharesExternal?: boolean
	deanonymize?: boolean
	seeUsernames?: boolean
}

export interface OfficialRights {
	changeInquiryStatus?: boolean
	deleteInquiry?: boolean
	archiveInquiry?: boolean
	transferInquiry?: boolean
	modifyInquiry?: boolean
}

export const DefaultModeratorRights: ModeratorRights = {
	changeInquiryStatus: true,
	deleteInquiry: true,
	archiveInquiry: true,
	transferInquiry: true,
	modifyInquiry: true,
	addShares: true,
	addSharesExternal: false,
	deanonymize: false,
}

export const DefaultOfficialRights: OfficialRights = {
	changeInquiryStatus: false,
	deleteInquiry: false,
	archiveInquiry: false,
	transferInquiry: false,
	modifyInquiry: false,
}

export function getCurrentModeratorRights(): ModeratorRights | null {
	const sessionStore = useSessionStore()
	const appSettings = useAppSettingsStore()
	return sessionStore.currentUser?.id && sessionStore.currentUser.isModerator
		? appSettings.moderatorRights
		: null
}

export function getCurrentOfficialRights(): OfficialRights | null {
	const sessionStore = useSessionStore()
	const appSettings = useAppSettingsStore()
	return sessionStore.currentUser?.id && sessionStore.currentUser.isOfficial
		? appSettings.officialRights
		: null
}

/* ============================================================
 * PERMISSION CONTEXT
 * ============================================================
 *
 * ============================================================ */

export interface PermissionContext {
	userType: UserType
	contentType: ContentType
	isOwner: boolean

	// Visibilité — source unique
	visibilityLevel: VisibilityType
	visibilityGroups: string[]
	visibilityUsers: string[]

	// Blocages
	isLocked: boolean
	isExpired: boolean
	isDeleted: boolean
	isArchived: boolean

	// Modération — définie uniquement pour les Inquiry (pas pour les groupes)
	moderationStatus?: string
	isFinalStatus?: boolean

	// Type / famille
	inquiryType?: string
	optionType?: string
	inquiryFamily?: InquiryFamily
}

/* ============================================================
 * CONTEXT FACTORIES
 * ============================================================ */

function getCurrentUserType(): UserType {
	const sessionStore = useSessionStore()
	const currentUser = sessionStore.currentUser

	if (!currentUser?.id) return UserType.Guest
	if (currentUser.isAdmin) return UserType.Admin
	if (currentUser.isModerator) return UserType.Moderator
	if (currentUser.isOfficial) return UserType.Official
	return UserType.User
}

function isContentOwner(contentOwnerId: string): boolean {
	const sessionStore = useSessionStore()
	return sessionStore.currentUser?.id === contentOwnerId
}

export function createInquiryContext(inquiry: Inquiry): PermissionContext | null {
	if (!inquiry?.owner || !inquiry.configuration || !inquiry.status) {
		console.warn('createInquiryContext: invalid inquiry', inquiry)
		return null
	}

	const appSettings = useAppSettingsStore()

	return {
		userType: getCurrentUserType(),
		contentType: ContentType.Inquiry,
		isOwner: isContentOwner(inquiry.owner.id),

		visibilityLevel: inquiry.configuration.visibility as VisibilityType,
		visibilityGroups: inquiry.configuration.visibilityGroups ?? [],
		visibilityUsers: inquiry.configuration.visibilityUsers ?? [],

		isLocked: inquiry.currentUserStatus?.isLocked ?? false,
		isExpired: inquiry.status.isExpired ?? false,
		isDeleted: (inquiry.status.deletionDate ?? 0) > 0,
		isArchived: inquiry.status.isArchived ?? false,

		moderationStatus: inquiry.status.moderationStatus,
		isFinalStatus: isInquiryFinalStatus(inquiry, appSettings),

		inquiryType: inquiry.type,
		inquiryFamily: inquiry.family as InquiryFamily,
	}
}

export function createOptionContext(
	option: Option,
	parentInquiry: Inquiry,
): PermissionContext | null {
	const parentCtx = createInquiryContext(parentInquiry)
	if (!parentCtx) return null

	return {
		...parentCtx, // hérite visibilité, blocages, modération, famille
		contentType: ContentType.Option,
		isOwner: isContentOwner(option.owner.id),
		optionType: option.type,
	}
}

export function createInquiryGroupContext(group: InquiryGroup): PermissionContext {
	return {
		userType: getCurrentUserType(),
		contentType: ContentType.InquiryGroup,
		isOwner: isContentOwner(group.owner.id),

		visibilityLevel: group.configuration.visibility as VisibilityType,
		visibilityGroups: group.configuration.visibilityGroups ?? [],
		visibilityUsers: group.configuration.visibilityUsers ?? [],

		isLocked: false,
		isExpired: group.expire ? group.expire * 1000 < Date.now() : false,
		isDeleted: (group.deleted ?? 0) > 0,
		isArchived: group.status.groupStatus === 'archived',

		// Pas de moderationStatus sur les InquiryGroup
	}
}

/* ============================================================
 * VISIBILITY / ACCESS
 * ============================================================ */

function isParticipantOfInquiry(): boolean {
	const participationStore = useParticipationStore()
	const policy = participationStore.participation
	if (!policy) return false

	const sessionStore = useSessionStore()
	const user = sessionStore.currentUser
	if (!user?.id) return false

	switch (policy.policyType) {
		case 'everyone':
			return true
		case 'users':
			return (policy.policyConfig?.user_ids ?? []).includes(user.id)
		case 'groups':
			return (policy.policyConfig?.group_ids ?? []).some((g) =>
				(user.groups ?? []).includes(g),
			)
		case 'lottery': {
			const selections = policy.policyConfig?.lottery?.selections ?? []
			const sel = selections.find((s: any) => s.selected_user_id === user.id)
			if (!sel) return false
			if (sel.status === 'declined' || sel.status === 'expired') return false
			if (sel.expires_at && sel.expires_at < Date.now() / 1000) return false
			return sel.status === 'pending' || sel.status === 'accepted'
		}
		default:
			return false
	}
}

/**
 * visibilityLevel / visibilityGroups / visibilityUsers.
 */
function hasGroupAccess(ctx: PermissionContext): boolean {
	const sessionStore = useSessionStore()
	const user = sessionStore.currentUser

	if (ctx.userType === UserType.Admin) return true

	switch (ctx.visibilityLevel) {
		case 'everyone':
			return true

		case 'private':
			return ctx.isOwner

		case 'groups': {
			if (!user?.id) return false
			const userGroups = user.groups ?? []
			return ctx.visibilityGroups.some((g) => userGroups.includes(g))
		}

		case 'users': {
			if (!user?.id) return false
			return ctx.visibilityUsers.includes(user.id)
		}

		case 'participants':
			return isParticipantOfInquiry()

		default:
			return false
	}
}

/* ============================================================
 * CONTENT BLOCKERS
 * ============================================================ */

function isContentBlocked(ctx: PermissionContext): boolean {
	return ctx.isArchived || ctx.isDeleted || ctx.isLocked || ctx.isExpired
}

function hasAcceptedModeration(ctx: PermissionContext): boolean {
	if (!ctx.moderationStatus) return true
	return ctx.moderationStatus === 'accepted'
}

/* ============================================================
 * VIEW
 * ============================================================ */

export function canView(ctx: PermissionContext): boolean {
	const appSettings = useAppSettingsStore()

	if (ctx.isDeleted) {
		return [UserType.Moderator, UserType.Admin, UserType.Owner].includes(ctx.userType)
	}

	if (ctx.isArchived) {
		return ctx.userType !== UserType.Guest
	}

	if (!hasGroupAccess(ctx)) return false

	if (ctx.userType === UserType.Guest) {
		return ctx.visibilityLevel === 'everyone' && appSettings.allowPublicAccess
	}

	return true
}

export function canViewToggle(ctx: PermissionContext): boolean {
	return [UserType.Admin, UserType.Owner, UserType.Moderator, UserType.User].includes(
		ctx.userType,
	)
}

/* ============================================================
 * SUPPORT / COMMENT
 * ============================================================ */

export function canSupport(ctx: PermissionContext): boolean {
	const appSettings = useAppSettingsStore()

	if (isContentBlocked(ctx)) return false

	if (ctx.contentType === ContentType.Inquiry) {
		if (ctx.isFinalStatus) return false
		if (!hasAcceptedModeration(ctx)) return false
	}

	if (!hasGroupAccess(ctx)) return false

	if (ctx.userType === UserType.Guest) {
		return ctx.visibilityLevel === 'everyone' && appSettings.allowGuestSupport
	}

	return true
}

export function canComment(ctx: PermissionContext): boolean {
	const appSettings = useAppSettingsStore()

	if (isContentBlocked(ctx)) return false

	if (ctx.contentType === ContentType.Inquiry) {
		if (ctx.isFinalStatus) return false
		if (!hasAcceptedModeration(ctx)) return false
	}

	if (!hasGroupAccess(ctx)) return false

	if (ctx.userType === UserType.Guest) {
		return ctx.visibilityLevel === 'everyone' && appSettings.allowGuestComments
	}

	return true
}

/* ============================================================
 * EDIT / DELETE / ARCHIVE / RESTORE / TRANSFER / MODERATE
 * ============================================================ */

export function canEdit(ctx: PermissionContext): boolean {
	if (!ctx) return false

	if (ctx.contentType === ContentType.InquiryGroup) {
		if (ctx.isArchived || ctx.isDeleted) return false
		if (ctx.isOwner || ctx.userType === UserType.Admin) return true
		return useSessionStore().currentUser.isGroupEditor === true
	}

	// --- Contenus classiques ---
	if (ctx.isLocked || ctx.isArchived || ctx.isDeleted) return false
	if (ctx.moderationStatus === 'rejected' || ctx.moderationStatus === 'pending') return false

	if (ctx.userType === UserType.Admin || ctx.isOwner) return true
	if (ctx.userType === UserType.Moderator) {
		return getCurrentModeratorRights()?.modifyInquiry ?? false
	}
	if (ctx.userType === UserType.Official) {
		return getCurrentOfficialRights()?.modifyInquiry ?? false
	}
	return false
}

export function canDelete(ctx: PermissionContext): boolean {
	// --- InquiryGroup ---
	if (ctx.contentType === ContentType.InquiryGroup) {
		if (ctx.isDeleted) return false
		return ctx.isOwner || ctx.userType === UserType.Admin
	}

	// --- Contenus classiques ---
	if (ctx.isDeleted) return false
	if (ctx.moderationStatus === 'rejected' || ctx.moderationStatus === 'pending') return false

	if (ctx.userType === UserType.Admin || ctx.isOwner) return true
	if (ctx.userType === UserType.Moderator) {
		return getCurrentModeratorRights()?.deleteInquiry ?? false
	}
	if (ctx.userType === UserType.Official) {
		return getCurrentOfficialRights()?.deleteInquiry ?? false
	}
	return false
}

export function canArchive(ctx: PermissionContext): boolean {
	// --- InquiryGroup ---
	if (ctx.contentType === ContentType.InquiryGroup) {
		if (ctx.isArchived || ctx.isDeleted) return false
		if (ctx.isOwner || ctx.userType === UserType.Admin) return true
		return useSessionStore().currentUser.isGroupEditor === true
	}

	// --- Contenus classiques ---
	if (ctx.isArchived || ctx.isDeleted) return false
	if (ctx.moderationStatus === 'rejected' || ctx.moderationStatus === 'pending') return false

	if (ctx.userType === UserType.Admin || ctx.isOwner) return true
	if (ctx.userType === UserType.Moderator) {
		return getCurrentModeratorRights()?.archiveInquiry ?? false
	}
	if (ctx.userType === UserType.Official) {
		return getCurrentOfficialRights()?.archiveInquiry ?? false
	}
	return false
}

export function canRestore(ctx: PermissionContext): boolean {
	if (!(ctx.isArchived || ctx.isDeleted)) return false

	// --- InquiryGroup ---
	if (ctx.contentType === ContentType.InquiryGroup) {
		if (ctx.isOwner || ctx.userType === UserType.Admin) return true
		return useSessionStore().currentUser.isGroupEditor === true
	}

	// --- Contenus classiques ---
	if (ctx.userType === UserType.Admin || ctx.isOwner) return true
	if (ctx.userType === UserType.Moderator) {
		return getCurrentModeratorRights()?.archiveInquiry ?? false
	}
	if (ctx.userType === UserType.Official) {
		return getCurrentOfficialRights()?.archiveInquiry ?? false
	}
	return false
}

export function canTransfer(ctx: PermissionContext): boolean {
	if (ctx.moderationStatus === 'rejected' || ctx.moderationStatus === 'pending') return false

	if (ctx.userType === UserType.Admin || ctx.isOwner) return true
	if (ctx.userType === UserType.Moderator) {
		return getCurrentModeratorRights()?.transferInquiry ?? false
	}
	if (ctx.userType === UserType.Official) {
		return getCurrentOfficialRights()?.transferInquiry ?? false
	}
	return false
}

export function canModerate(ctx: PermissionContext): boolean {
	if (ctx.userType === UserType.Admin) return true
	if (ctx.userType === UserType.Moderator) {
		return getCurrentModeratorRights()?.changeInquiryStatus ?? false
	}
	if (ctx.userType === UserType.Official) {
		return getCurrentOfficialRights()?.changeInquiryStatus ?? false
	}
	return false
}

export function canLock(ctx: PermissionContext): boolean {
	return [UserType.Moderator, UserType.Admin].includes(ctx.userType)
}

/* ============================================================
 * SHARE
 * ============================================================ */

export function canShare(ctx: PermissionContext): boolean {
	const sessionStore = useSessionStore()

	if (ctx.isArchived || ctx.isDeleted) return false
	
	if (ctx.moderationStatus  === 'pending' ) return false

	if (!hasGroupAccess(ctx)) return false

	if (sessionStore.appPermissions.allAccess) return true

	if (ctx.userType === UserType.Guest) return false
	if (ctx.userType === UserType.Admin) return true

	if (ctx.userType === UserType.Moderator) {
		return getCurrentModeratorRights()?.addShares ?? true
	}

	return ctx.isOwner
}

export function canShareExternal(ctx: PermissionContext): boolean {
	if (!canShare(ctx)) return false
	if (ctx.userType === UserType.Admin) return true
	if (ctx.userType === UserType.Moderator) {
		return getCurrentModeratorRights()?.addSharesExternal ?? false
	}
	return false
}

/* ============================================================
 * RESOURCE / CREATE
 * ============================================================ */

export function canUseResource(ctx: PermissionContext): boolean {
	if (ctx.isArchived || ctx.isDeleted || ctx.isLocked) return false
	if (!hasAcceptedModeration(ctx)) return false
	if (!hasGroupAccess(ctx)) return false
	if (ctx.userType === UserType.Guest) return false
	return true
}

export function canCreate(ctx: PermissionContext): boolean {
	const appSettings = useAppSettingsStore()
	if (ctx.userType === UserType.Guest) {
		return appSettings.allowGuestCreation
	}
	return true
}

/* ============================================================
 * MODERATION-AWARE ACTIONS
 * ============================================================ */

export function canEditResult(moderationStatus: string): boolean {
	return moderationStatus !== 'rejected' && moderationStatus !== 'pending'
}

export function canPerformActions(moderationStatus: string): {
	canUseResource: boolean
	canTransfer: boolean
	canDelete: boolean
	canArchive: boolean
} {
	const canPerform = moderationStatus !== 'rejected' && moderationStatus !== 'pending'
	return {
		canUseResource: canPerform,
		canTransfer: canPerform,
		canDelete: canPerform,
		canArchive: canPerform,
	}
}

export function accessFamilyMenu(selectedFamilyType: InquiryFamily): boolean {
	const sessionStore = useSessionStore()
	const user = sessionStore.currentUser
	if (!user?.id) return false

	switch (selectedFamilyType) {
		case InquiryFamily.Official:
			return user.isOfficial || user.isAdmin
		case InquiryFamily.Legislatif:
			return user.isLegislative || user.isAdmin
		default:
			return true
	}
}

/* ============================================================
 * FAMILY / RESPONSE / TRANSFORMATION CREATION
 * ============================================================ */

export function canCreateOfficialResponse(ctx: PermissionContext): boolean {
	const sessionStore = useSessionStore()
	if (!sessionStore.currentUser.isOfficial) return false
	if (ctx.moderationStatus !== 'accepted') return false
	if (isContentBlocked(ctx)) return false
	return true
}

export function canCreateTransformation(ctx: PermissionContext): boolean {
	const sessionStore = useSessionStore()

	if (!canEdit(ctx) || ctx.moderationStatus !== 'accepted') return false
	if (sessionStore.currentUser.isOfficial) return true

	if (ctx.inquiryFamily) {
		switch (ctx.inquiryFamily) {
			case InquiryFamily.Legislatif:
				return sessionStore.currentUser.isLegislative
			case InquiryFamily.Collective:
				return sessionStore.currentUser.isGroupEditor
			default:
				return false
		}
	}
	return false
}

export function canCreateByFamily(ctx: PermissionContext): boolean {
	const sessionStore = useSessionStore()

	if (!canEdit(ctx) || ctx.moderationStatus !== 'accepted') return false

	if (ctx.inquiryFamily) {
		switch (ctx.inquiryFamily) {
			case InquiryFamily.Legislatif:
				return sessionStore.currentUser.isLegislative
			case InquiryFamily.Collective:
				return sessionStore.currentUser.isGroupEditor
			default:
				return false
		}
	}
	return false
}

/* ============================================================
 * INQUIRY GROUPS (gestion)
 * ============================================================ */

export function canViewInquiryGroup(ctx: PermissionContext): boolean {
	if (ctx.userType === UserType.Admin || ctx.userType === UserType.Moderator) return true
	if (hasGroupAccess(ctx)) return true
	return useSessionStore().currentUser.isGroupEditor === true
}

export function canCreateInquiryGroup(ctx: PermissionContext): boolean {
	if (ctx.userType === UserType.Guest) return false
	if (ctx.userType === UserType.Admin) return true
	return useSessionStore().currentUser.isGroupEditor === true
}

export function canCreateInquiryGroupInGeneral(): boolean {
	const sessionStore = useSessionStore()
	return sessionStore.currentUser.isGroupEditor === true || sessionStore.currentUser.isAdmin === true
}

export function canModifyInquiryGroup(ctx: PermissionContext): boolean {
	if (ctx.isArchived || ctx.isDeleted) return false
	if (ctx.isOwner || ctx.userType === UserType.Admin) return true
	return useSessionStore().currentUser.isGroupEditor === true
}

export function canDeleteInquiryGroup(ctx: PermissionContext): boolean {
	if (ctx.isDeleted) return false
	if (ctx.isOwner || ctx.userType === UserType.Admin) return true
	return useSessionStore().currentUser.isGroupEditor === true
}

export function canArchiveInquiryGroup(ctx: PermissionContext): boolean {
	if (ctx.isArchived || ctx.isDeleted) return false
	if (ctx.isOwner || ctx.userType === UserType.Admin) return true
	return useSessionStore().currentUser.isGroupEditor === true
}

export function canAddInquiryToGroup(ctx: PermissionContext): boolean {
	if (ctx.userType === UserType.Admin) return true
	if (ctx.isOwner) return true
	return useSessionStore().currentUser.isGroupEditor === true
}

export function canRemoveInquiryFromGroup(ctx: PermissionContext): boolean {
	if (ctx.userType === UserType.Admin) return true
	if (ctx.isOwner) return true
	return useSessionStore().currentUser.isGroupEditor === true
}

export function canManageGroupMembers(ctx: PermissionContext): boolean {
	if (ctx.userType === UserType.Admin || ctx.isOwner) return true
	return useSessionStore().currentUser.isGroupEditor === true
}

export function canManageGroupPermissions(ctx: PermissionContext): boolean {
	if (ctx.userType === UserType.Admin || ctx.isOwner) return true
	return false
}

/* ============================================================
 * OPTIONS — délèguent au contexte hérité du parent
 * ============================================================ */

export function canEditOption(ctx: PermissionContext): boolean {
	if (ctx.contentType !== ContentType.Option) return false
	return canEdit(ctx)
}

export function canDeleteOption(ctx: PermissionContext): boolean {
	if (ctx.contentType !== ContentType.Option) return false
	return canDelete(ctx)
}

export function canChangeStatus(ctx: PermissionContext): boolean {
	return (
		ctx.userType === UserType.Admin ||
		ctx.userType === UserType.Moderator ||
		ctx.isOwner
	)
}

export function canChangeOptionStatus(ctx: PermissionContext): boolean {
	if (ctx.contentType !== ContentType.Option) return false
	return canChangeStatus(ctx)
}

export function canCommentOption(ctx: PermissionContext): boolean {
	if (ctx.contentType !== ContentType.Option) return false
	return canComment(ctx)
}

export function canSupportOption(ctx: PermissionContext): boolean {
	if (ctx.contentType !== ContentType.Option) return false
	return canSupport(ctx)
}

export function canPerformOptionAction(ctx: PermissionContext, action: string): boolean {
	switch (action) {
		case 'edit':
			return canEditOption(ctx)
		case 'delete':
			return canDeleteOption(ctx)
		case 'changeStatus':
			return canChangeOptionStatus(ctx)
		case 'comment':
			return canCommentOption(ctx)
		case 'support':
			return canSupportOption(ctx)
		default:
			return false
	}
}

/* ============================================================
 * PARTICIPATION
 * ============================================================ */

export function canParticipate(
	_ctx: PermissionContext,
	policy?: ParticipationPolicy | null,
): boolean {
	if (!policy) return true

	const sessionStore = useSessionStore()
	const user = sessionStore.currentUser

	if (!user?.id) {
		return policy.policyType === 'everyone'
	}

	switch (policy.policyType) {
		case 'everyone':
			return true

		case 'users':
			return (policy.policyConfig?.user_ids ?? []).includes(user.id)

		case 'groups':
			return (policy.policyConfig?.group_ids ?? []).some((g) =>
				(user.groups ?? []).includes(g),
			)

		case 'lottery': {
			const selections = policy.policyConfig?.lottery?.selections ?? []
			const sel = selections.find((s: any) => s.selected_user_id === user.id)
			if (!sel) return false
			if (sel.status === 'declined' || sel.status === 'expired') return false
			if (sel.expires_at && sel.expires_at < Date.now() / 1000) return false
			return true
		}

		default:
			return false
	}
}

export function canParticipateInInquiry(
	ctx: PermissionContext,
	policy?: ParticipationPolicy | null,
): boolean {
	if (!canView(ctx)) return false
	if (ctx.isLocked || ctx.isArchived || ctx.isDeleted) return false
	if (ctx.moderationStatus === 'rejected' || ctx.moderationStatus === 'pending') return false
	return canParticipate(ctx, policy)
}

export function getParticipationStatus(
	_ctx: PermissionContext,
	policy?: ParticipationPolicy | null,
): {
	canParticipate: boolean
	reason?: string
	status?: 'allowed' | 'denied' | 'pending' | 'selected'
} {
	if (!policy) return { canParticipate: true, status: 'allowed' }

	const sessionStore = useSessionStore()
	const user = sessionStore.currentUser

	if (!user?.id) {
		return policy.policyType === 'everyone'
			? { canParticipate: true, status: 'allowed' }
			: {
					canParticipate: false,
					reason: 'Guests are not allowed to participate',
					status: 'denied',
			  }
	}

	switch (policy.policyType) {
		case 'everyone':
			return { canParticipate: true, status: 'allowed' }

		case 'users': {
			const ok = (policy.policyConfig?.user_ids ?? []).includes(user.id)
			return {
				canParticipate: ok,
				reason: ok ? undefined : 'You are not in the allowed users list',
				status: ok ? 'allowed' : 'denied',
			}
		}

		case 'groups': {
			const ok = (policy.policyConfig?.group_ids ?? []).some((g) =>
				(user.groups ?? []).includes(g),
			)
			return {
				canParticipate: ok,
				reason: ok ? undefined : 'You are not in any allowed group',
				status: ok ? 'allowed' : 'denied',
			}
		}

		case 'lottery': {
			const selections = policy.policyConfig?.lottery?.selections ?? []
			const sel = selections.find((s: any) => s.selected_user_id === user.id)
			if (!sel) {
				return {
					canParticipate: false,
					reason: 'You were not selected in the lottery',
					status: 'denied',
				}
			}
			if (sel.expires_at && sel.expires_at < Date.now() / 1000) {
				return {
					canParticipate: false,
					reason: 'Your lottery selection has expired',
					status: 'denied',
				}
			}
			switch (sel.status) {
				case 'pending':
					return {
						canParticipate: true,
						reason: 'You have been selected but need to accept',
						status: 'pending',
					}
				case 'accepted':
					return { canParticipate: true, status: 'allowed' }
				case 'declined':
					return {
						canParticipate: false,
						reason: 'You declined the lottery selection',
						status: 'denied',
					}
				case 'expired':
					return {
						canParticipate: false,
						reason: 'Your lottery selection has expired',
						status: 'denied',
					}
				default:
					return {
						canParticipate: false,
						reason: 'Unknown lottery selection status',
						status: 'denied',
					}
			}
		}

		default:
			return {
				canParticipate: false,
				reason: 'Unknown participation policy type',
				status: 'denied',
			}
	}
}

/* ============================================================
 * RESPONSE / TRANSFORMATION FILTERING
 * ============================================================ */

export interface InquiryType {
	inquiry_type: string
	allowed_response?: string | string[]
	allowed_transformation?: string | string[]
}

function hasRequiredGroupForResponseType(responseType: string): boolean {
	const sessionStore = useSessionStore()
	if (!sessionStore.currentUser?.id) return false

	const requirements: Record<string, boolean> = {
		legislative: sessionStore.currentUser.isLegislative,
		official: sessionStore.currentUser.isOfficial,
		collective: sessionStore.currentUser.isGroupEditor,
	}
	const req = requirements[responseType]
	return req === undefined ? true : req
}

function hasRequiredGroupForTransformationType(transformType: string): boolean {
	const sessionStore = useSessionStore()
	if (!sessionStore.currentUser?.id) return false

	const requirements: Record<string, boolean> = {
		legislative: sessionStore.currentUser.isLegislative,
		official: sessionStore.currentUser.isOfficial,
		collective: sessionStore.currentUser.isGroupEditor,
	}
	const req = requirements[transformType]
	return req === undefined ? true : req
}

export function canCreateResponseType(responseType: string, ctx: PermissionContext): boolean {
	if (responseType === 'official') return canCreateOfficialResponse(ctx)
	if (!hasRequiredGroupForResponseType(responseType)) return false
	return canEdit(ctx) && ctx.moderationStatus === 'accepted'
}

export function canCreateTransformationType(
	transformType: string,
	ctx: PermissionContext,
): boolean {
	if (!hasRequiredGroupForTransformationType(transformType)) return false
	return canCreateTransformation(ctx)
}

function parseAllowed(raw: string | string[] | undefined): string[] {
	if (!raw) return []
	if (typeof raw === 'string') {
		try {
			return JSON.parse(raw)
		} catch {
			return []
		}
	}
	return raw
}

export function getAvailableResponseTypesWithPermissions(
	inquiryType: string,
	inquiryTypes: InquiryType[],
	ctx: PermissionContext,
): InquiryType[] {
	const current = inquiryTypes.find((t) => t.inquiry_type === inquiryType)
	if (!current) return []
	const allowed = parseAllowed(current.allowed_response)
	return inquiryTypes.filter(
		(t) => allowed.includes(t.inquiry_type) && canCreateResponseType(t.inquiry_type, ctx),
	)
}

export function getAvailableTransformTypesWithPermissions(
	inquiryType: string,
	inquiryTypes: InquiryType[],
	ctx: PermissionContext,
): InquiryType[] {
	const current = inquiryTypes.find((t) => t.inquiry_type === inquiryType)
	if (!current) return []
	const allowed = parseAllowed(current.allowed_transformation)
	return inquiryTypes.filter(
		(t) =>
			allowed.includes(t.inquiry_type) &&
			canCreateTransformationType(t.inquiry_type, ctx),
	)
}

export function shouldShowResponseActions(
	inquiryType: string,
	inquiryTypes: InquiryType[],
	ctx: PermissionContext,
): boolean {
	return getAvailableResponseTypesWithPermissions(inquiryType, inquiryTypes, ctx).length > 0
}

export function shouldShowTransformationActions(
	inquiryType: string,
	inquiryTypes: InquiryType[],
	ctx: PermissionContext,
): boolean {
	return getAvailableTransformTypesWithPermissions(inquiryType, inquiryTypes, ctx).length > 0
}

/* ============================================================
 * EDIT PERMISSIONS 
 * ============================================================ */

export function getEditPermissions(ctx: PermissionContext): {
	canSupport: boolean
	canComment: boolean
} {
	const sessionStore = useSessionStore()
	const appSettings = sessionStore.appSettings

	const typeKey =
		ctx.contentType === ContentType.Inquiry ? ctx.inquiryType : ctx.optionType
	if (!typeKey) return { canSupport: false, canComment: false }

	const typeRights = appSettings.inquiryTypeRights?.[typeKey]
	if (ctx.contentType === ContentType.Inquiry && typeRights) {
		return {
			canSupport: typeRights.supportInquiry && typeRights.supportFeature !== 'none',
			canComment: typeRights.commentInquiry !== false && typeRights.commentInquiry !== null,
		}
	}

	if (ctx.contentType === ContentType.Inquiry) {
		const tabs = appSettings.inquiryTypeTab || []
		const cfg = tabs.find(
			(t: any) => t.inquiry_type === typeKey || t.inquiryType === typeKey,
		)
		if (cfg) {
			return {
				canSupport:
					cfg.support_feature !== '' &&
					cfg.support_feature !== 'none' &&
					cfg.support_feature !== null,
				canComment: cfg.allow_comment !== null && cfg.allow_comment !== false,
			}
		}
	} else if (ctx.contentType === ContentType.Option) {
		const tabs = appSettings.inquiryOptionTypeTab || []
		const cfg = tabs.find((t: any) => t.option_type === typeKey)
		if (cfg) {
			return {
				canSupport:
					cfg.support_feature !== '' &&
					cfg.support_feature !== 'none' &&
					cfg.support_feature !== null,
				canComment: cfg.allow_comment !== null && cfg.allow_comment !== false,
			}
		}
	}

	return { canSupport: false, canComment: false }
}

export function canInquiryTypePerformAction(
	inquiryType: string,
	action: string,
): boolean {
	const sessionStore = useSessionStore()
	const typeRights = sessionStore.appSettings.inquiryTypeRights?.[inquiryType]
	return (typeRights as any)?.[action] ?? false
}

export function getCurrentUserGroups(): string[] {
	return useSessionStore().currentUser?.groups ?? []
}

/* ============================================================
 * EXPORT DEFAULT
 * ============================================================ */

export default {
	// Enums
	UserType,
	ContentType,
	InquiryFamily,
	PublicationStatusLevel,

	// Defaults
	DefaultModeratorRights,
	DefaultOfficialRights,

	// Context factories
	createInquiryContext,
	createOptionContext,
	createInquiryGroupContext,

	// Core permissions
	canView,
	canViewToggle,
	canEdit,
	canDelete,
	canArchive,
	canRestore,
	canTransfer,
	canModerate,
	canLock,
	canCreate,
	canShare,
	canShareExternal,
	canUseResource,

	// Support / comment
	canSupport,
	canComment,

	// Groups
	canViewInquiryGroup,
	canCreateInquiryGroup,
	canCreateInquiryGroupInGeneral,
	canModifyInquiryGroup,
	canDeleteInquiryGroup,
	canArchiveInquiryGroup,
	canAddInquiryToGroup,
	canRemoveInquiryFromGroup,
	canManageGroupMembers,
	canManageGroupPermissions,

	// Options
	canEditOption,
	canDeleteOption,
	canChangeStatus,
	canChangeOptionStatus,
	canCommentOption,
	canSupportOption,
	canPerformOptionAction,

	// Participation
	canParticipate,
	canParticipateInInquiry,
	getParticipationStatus,

	// Moderation
	canEditResult,
	canPerformActions,
	accessFamilyMenu,

	// Family / response
	canCreateOfficialResponse,
	canCreateTransformation,
	canCreateByFamily,
	canCreateResponseType,
	canCreateTransformationType,
	shouldShowResponseActions,
	shouldShowTransformationActions,
	getAvailableResponseTypesWithPermissions,
	getAvailableTransformTypesWithPermissions,

	// Helpers
	getEditPermissions,
	getCurrentUserGroups,
	getCurrentModeratorRights,
	getCurrentOfficialRights,
	canInquiryTypePerformAction,
}
