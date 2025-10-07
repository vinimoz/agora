// SPDX-FileCopyrightText: 2023 Nextcloud contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useSessionStore } from '../stores/session.ts'
import { useAppSettingsStore } from '../stores/appSettings.ts'

export interface InquiryTypeSettings {
  supportInquiry: boolean
  commentInquiry: boolean
  attachFileInquiry: boolean
  shareInquiry?: boolean
  editorType: string
}

export interface InquiryTypeRights {
  supportInquiry: boolean
  commentInquiry: boolean
  attachFileInquiry: boolean
  shareInquiry?: boolean
  editorType: string
}

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

export const DefaultInquiryTypeRights: Record<string, InquiryTypeRights> = {
  proposal: {
    supportInquiry: true,
    commentInquiry: true,
    attachFileInquiry: true,
    shareInquiry: true,
    editorType: 'wysiwyg',
  },
  debate: {
    supportInquiry: true,
    commentInquiry: false,
    attachFileInquiry: false,
    shareInquiry: true,
    editorType: 'texteditor',
  },
  petition: {
    supportInquiry: true,
    commentInquiry: true,
    attachFileInquiry: true,
    shareInquiry: true,
    editorType: 'wysiwyg',
  },
  project: {
    supportInquiry: true,
    commentInquiry: true,
    attachFileInquiry: true,
    shareInquiry: true,
    editorType: 'texteditor',
  },
  grievance: {
    supportInquiry: true,
    commentInquiry: true,
    attachFileInquiry: true,
    shareInquiry: true,
    editorType: 'wysiwyg',
  },
  suggestion: {
    supportInquiry: true,
    commentInquiry: false,
    attachFileInquiry: false,
    shareInquiry: true,
    editorType: 'textarea',
  },
  official: {
    supportInquiry: false,
    commentInquiry: false,
    attachFileInquiry: true,
    shareInquiry: true,
    editorType: 'textarea',
  },
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

/**
 * User TYPE
 */
export enum UserType {
  Guest = 'guest',
  User = 'user',
  Moderator = 'moderator',
  Admin = 'admin',
  Owner = 'owner',
}

/**
 * Content type
 */
export enum ContentType {
  Inquiry = 'inquiry',
  Comment = 'comment',
  Support = 'support',
  Attachment = 'attachment',
  Share = 'share',
}

/**
 * Interface rights permission
 */
export interface PermissionContext {
  userType: UserType
  contentType: ContentType
  isOwner: boolean
  isPublic: boolean
  isLocked: boolean
  isExpired: boolean
  isDeleted: boolean
  isArchived: boolean
  hasGroupRestrictions: boolean
  userGroups: string[]
  allowedGroups: string[]
  inquiryType?: string
}

// GET METHODS

function getCurrentUserType(): UserType {
  const sessionStore = useSessionStore()
  const currentUser = sessionStore.currentUser

  if (!currentUser) return UserType.Guest
  if (currentUser.isAdmin) return UserType.Admin
  if (currentUser.isModerator) return UserType.Moderator
  if (currentUser.isOfficial) return UserType.Official
  return UserType.User
}

function getCurrentUserGroups(): string[] {
  const sessionStore = useSessionStore()
  const currentUser = sessionStore.currentUser
  return currentUser?.groups || []
}

export function getCurrentModeratorRights(): ModeratorRights | null {
  const sessionStore = useSessionStore()
  const appSettings = useAppSettingsStore()
  const currentUser = sessionStore.currentUser
  return currentUser?.isModerator ? appSettings.moderatorRights : null
}

export function getCurrentOfficialRights(): OfficialRights | null {
  const sessionStore = useSessionStore()
  const appSettings = useAppSettingsStore()
  const currentUser = sessionStore.currentUser
  return currentUser?.isOfficial ? appSettings.officialRights : null
}

function isContentOwner(contentOwnerId: string): boolean {
  const sessionStore = useSessionStore()
  const currentUser = sessionStore.currentUser
  return currentUser?.id === contentOwnerId
}

export function canInquiryTypePerformAction(
  inquiryType: string,
  action: keyof InquiryTypeSettings
): boolean {
  const sessionStore = useSessionStore()
  const typeRights = sessionStore.appSettings.inquiryTypeRights[inquiryType]
  return typeRights?.[action] ?? false
}

function hasGroupAccess(context: PermissionContext): boolean {
  if (!context.hasGroupRestrictions || context.userType === UserType.Guest) {
    return true
  }

  if (context.userType === UserType.Admin || context.userType === UserType.Moderator) {
    return true
  }

  return context.userGroups.some((group) => context.allowedGroups.includes(group))
}

function isContentBlocked(context: PermissionContext): boolean {
  return context.isArchived || context.isDeleted || context.isLocked || context.isExpired
}

export function canViewToggle(context: PermissionContext): boolean {
  return [UserType.Admin, UserType.Owner, UserType.Moderator, UserType.User].includes(
    context.userType
  )
}

/**
 * @param context
 */
export function canDelete(context: PermissionContext): boolean {
  if (context.isDeleted) return false

  if (context.userType === UserType.Admin || context.isOwner) {
    return true
  }

  if (context.userType === UserType.Moderator) {
    const moderatorRights = getCurrentModeratorRights()
    return moderatorRights?.deleteInquiry ?? false
  }

  if (context.userType === UserType.User) {
    const officialRights = getCurrentOfficialRights()
    return officialRights?.deleteInquiry ?? false
  }

  return false
}

/**
 * @param context
 */
export function canRestore(context: PermissionContext): boolean {
  if (!(context.isArchived || context.isDeleted)) return false

  if (context.userType === UserType.Admin || context.isOwner) {
    return true
  }

  if (context.userType === UserType.Moderator) {
    const moderatorRights = getCurrentModeratorRights()
    return moderatorRights?.archiveInquiry ?? false
  }

  if (context.userType === UserType.User) {
    const officialRights = getCurrentOfficialRights()
    return officialRights?.archiveInquiry ?? false
  }

  return false
}

/**
 * @param context
 */
export function canArchive(context: PermissionContext): boolean {
  if (context.isArchived || context.isDeleted) return false

  if (context.userType === UserType.Admin || context.isOwner) {
    return true
  }

  if (context.userType === UserType.Moderator) {
    const moderatorRights = getCurrentModeratorRights()
    return moderatorRights?.archiveInquiry ?? false
  }

  if (context.userType === UserType.User) {
    const officialRights = getCurrentOfficialRights()
    return officialRights?.archiveInquiry ?? false
  }

  return false
}

/**
 * @param context
 */
export function canTransfer(context: PermissionContext): boolean {
  if (context.userType === UserType.Admin || context.isOwner) {
    return true
  }

  if (context.userType === UserType.Moderator) {
    const moderatorRights = getCurrentModeratorRights()
    return moderatorRights?.transferInquiry ?? false
  }

  if (context.userType === UserType.User) {
    const officialRights = getCurrentOfficialRights()
    return officialRights?.transferInquiry ?? false
  }

  return false
}

/**
 * @param context
 */
export function canModerate(context: PermissionContext): boolean {
  if (context.userType === UserType.Admin) {
    return true
  }

  if (context.userType === UserType.Moderator) {
    const moderatorRights = getCurrentModeratorRights()
    return moderatorRights?.changeInquiryStatus ?? false
  }

  if (context.userType === UserType.User) {
    const officialRights = getCurrentOfficialRights()
    return officialRights?.changeInquiryStatus ?? false
  }

  return false
}

/**
 * @param context
 */
export function canEdit(context: PermissionContext): boolean {
  if (context.isLocked || context.isArchived || context.isDeleted) {
    return false
  }
  if (context.userType === UserType.Admin || context.isOwner) {
    return true
  }

  if (context.userType === UserType.Moderator) {
    const moderatorRights = getCurrentModeratorRights()
    return moderatorRights?.modifyInquiry ?? false
  }

  if (context.userType === UserType.User) {
    const officialRights = getCurrentOfficialRights()
    return officialRights?.modifyInquiry ?? false
  }

  return false
}

/**
 * @param context
 */
export function canComment(context: PermissionContext): boolean {
  const appSettings = useAppSettingsStore()

  if (isContentBlocked(context)) {
    return false
  }

  if (context.inquiryType && !canInquiryTypePerformAction(context.inquiryType, 'commentInquiry')) {
    return false
  }

  if (!hasGroupAccess(context)) {
    return false
  }

  if (context.userType === UserType.Guest) {
    return context.isPublic && appSettings.allowGuestComments
  }

  return true
}

/**
 * @param context
 */
export function canSupport(context: PermissionContext): boolean {
  const appSettings = useSessionStore().appSettings

  if (isContentBlocked(context)) {
    return false
  }

  if (context.inquiryType && !canInquiryTypePerformAction(context.inquiryType, 'supportInquiry')) {
    return false
  }
  if (!hasGroupAccess(context)) {
    return false
  }

  if (context.userType === UserType.Guest) {
    return context.isPublic && appSettings.allowGuestSupport
  }

  return true
}

/**
 * @param context
 */
export function canShare(context: PermissionContext): boolean {
   const sessionStore = useSessionStore()

  if (context.isArchived || context.isDeleted) {
    return false
  }
  if (sessionStore.appPermissions.allowAllAccess) {
    return true
   }

  if (context.userType === UserType.Guest) {
    return false
  }

  if (context.userType === UserType.Admin || context.userType === UserType.Moderator) {
    return true
  }

  if (context.userType === UserType.Official) {
    return context.isOwner
  }

  return false
}



/**
 * @param context
 */
export function canAttachFile(context: PermissionContext): boolean {
  if (context.isArchived || context.isDeleted || context.isLocked) {
    return false
  }

  if (
    context.inquiryType &&
    !canInquiryTypePerformAction(context.inquiryType, 'attachFileInquiry')
  ) {
    return false
  }

  if (!hasGroupAccess(context)) {
    return false
  }

  if (context.userType === UserType.Guest) {
    return false
  }

  return true
}

export function canView(context: PermissionContext): boolean {
  const appSettings = useAppSettingsStore()

  if (context.isDeleted) {
    return [UserType.Moderator, UserType.Admin, UserType.Owner].includes(context.userType)
  }

  if (context.isArchived) {
    return [UserType.Moderator, UserType.Admin, UserType.Owner, UserType.User].includes(
      context.userType
    )
  }

  if (context.hasGroupRestrictions) {
    if (
      !hasGroupAccess(context) &&
      context.userType !== UserType.Admin &&
      context.userType !== UserType.Moderator
    ) {
      return false
    }
  }

  if (context.userType === UserType.Guest) {
    return context.isPublic && appSettings.allowPublicAccess
  }

  return true
}

export function canCreate(context: PermissionContext): boolean {
  const appSettings = useAppSettingsStore()

  if (context.userType === UserType.Guest) {
    return appSettings.allowGuestCreation
  }
  return true
}

export function canLock(context: PermissionContext): boolean {
  return [UserType.Moderator, UserType.Admin].includes(context.userType)
}

export function createPermissionContextForContent(
  contentType: ContentType,
  contentOwnerId: string,
  isPublic: boolean = true,
  isLocked: boolean = false,
  isExpired: boolean = false,
  isDeleted: boolean = false,
  isArchived: boolean = false,
  hasGroupRestrictions: boolean = false,
  allowedGroups: string[] = [],
  inquiryType?: string
): PermissionContext {
  const userType = getCurrentUserType()
  const userGroups = getCurrentUserGroups()
  const isOwner = isContentOwner(contentOwnerId)

  return {
    userType,
    contentType,
    isOwner,
    isPublic,
    isLocked,
    isExpired,
    isDeleted,
    isArchived,
    hasGroupRestrictions,
    userGroups,
    allowedGroups,
    inquiryType,
  }
}

export default {
  // Enums
  UserType,
  ContentType,

  // Default values
  DefaultInquiryTypeRights,
  DefaultModeratorRights,
  DefaultOfficialRights,

  // Permission functions
  canView,
  canViewToggle,
  canComment,
  canSupport,
  canShare,
  canAttachFile,
  canDelete,
  canArchive,
  canRestore,
  canTransfer,
  canModerate,
  canEdit,
  canCreate,
  canLock,

  // Context functions
  createPermissionContextForContent,

  // Helper functions
  getCurrentUserType,
  getCurrentUserGroups,
  getCurrentModeratorRights,
  getCurrentOfficialRights,
  canInquiryTypePerformAction,
}
