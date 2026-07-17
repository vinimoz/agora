// SPDX-FileCopyrightText: 2023 Nextcloud contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useSessionStore } from '../stores/session.ts'
import { useAppSettingsStore } from '../stores/appSettings.ts'
import { isInquiryFinalStatus } from '../helpers/modules/InquiryHelper' 
import type { InquiryType, InquiryOptionType } from '../Types/index.ts'


export interface InquiryTypeSettings {
  supportInquiry: boolean
  commentInquiry: boolean
  useResourceInquiry: boolean
  shareInquiry?: boolean
  editorType: string
}

export interface InquiryTypeRights {
  supportInquiry: boolean
  supportFeature: string 
  commentInquiry: boolean
  useResourceInquiry: boolean
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

export interface InquiryType {
  inquiry_type: string
  allowed_response?: string | string[]
  allowed_transformation?: string | string[]
}

export interface InquiryGroupRights {
  createInquiry?: boolean
  modifyGroup?: boolean
  deleteGroup?: boolean
  addInquiry?: boolean
  removeInquiry?: boolean
  manageMembers?: boolean
  managePermissions?: boolean
  viewGroup?: boolean
}

/**
 * Publication status levels
 */
export enum PublicationStatusLevel {
  Draft = 'draft',
  Pending = 'pending',
  Published = 'published',
  Archived = 'archived',
  Deleted = 'deleted',
}

/**
 * Visibility levels
 */
export enum VisibilityLevel {
  Private = 'private',
  Groups = 'groups',
  Participants = 'participants',
  Everyone = 'everyone',
}

/**
 * Inquiry Family types
 */
export enum InquiryFamily {
  Legislatif = 'legislative',
  Administratif = 'administrative',
  Collective = 'collective',
  Official = 'official'
}


export interface InquiryStoreLike {
  owner: { id: string }
  configuration: { visibility: VisibilityLevel | string }
  status: {
    isLocked: boolean
    isExpired: boolean
    deletionDate: number
    isArchived: boolean
    moderationStatus?: string
    inquiryStatus?: string
    publicationStatus?: PublicationStatusLevel
  }
  inquiryGroups: InquiryGroup[]
  type: string
  family: InquiryFamily
}

export interface OptionStoreLike {
  owner: { id: string }
  type: string // option_type
  isDeleted?: boolean
  isArchived?: boolean
}

export interface InquiryGroupStoreLike {
  owner: { id: string }
  deleted: number
  group_status: string
  owned_group: string | null
  type: string
  isPublic?: boolean
}



// ADD THESE DEFAULT VALUES BACK:
export const DefaultInquiryRights: InquiryTypeRights = {
  supportInquiry: true, 
  supportFeature: 'none', 
  commentInquiry: false,
  useResourceInquiry: false,
  shareInquiry: false,
  editorType: 'wysiwyg',
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

export const DefaultInquiryGroupRights: InquiryGroupRights = {
  createInquiry: true,
  modifyGroup: true,
  deleteGroup: true,
  addInquiry: true,
  removeInquiry: true,
  manageMembers: true,
  managePermissions: true,
  viewGroup: true,
}

/**
 * User TYPE
 */
export enum UserType {
  Guest = 'guest',
  User = 'user',
  Moderator = 'moderator',
  Official = 'official',
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
  InquiryGroup = 'inquiry_group',
  Option = 'option',
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
  optionType?: string
  inquiryFamily?: InquiryFamily
  visibilityLevel?: VisibilityLevel
  publicationStatusLevel?: PublicationStatusLevel
  isFinalStatus?: boolean
  moderationStatus?: string
  supportFeature?: string  
  allowComment?: boolean  
  
  // Group-specific properties
  isGroupMember?: boolean
  isGroupModerator?: boolean
  isGroupEditor?: boolean
  groupType?: string
  ownedGroup?: string
}


// GET METHODS

function getCurrentUserType(): UserType {
  const sessionStore = useSessionStore()
  const currentUser = sessionStore.currentUser

  if (!currentUser?.id) return UserType.Guest
  if (sessionStore.currentUser.isAdmin) return UserType.Admin
  if (sessionStore.currentUser.isModerator) return UserType.Moderator
  if (sessionStore.currentUser.isOfficial) return UserType.Official
  if (sessionStore.currentUser.isGroupEditor) return UserType.User // Group editors are regular users with extra permissions
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
  return currentUser?.id && sessionStore.currentUser.isModerator ? appSettings.moderatorRights : null
}

export function getCurrentOfficialRights(): OfficialRights | null {
  const sessionStore = useSessionStore()
  const appSettings = useAppSettingsStore()
  const currentUser = sessionStore.currentUser
  return currentUser?.id && sessionStore.currentUser.isOfficial ? appSettings.officialRights : null
}

export function getCurrentInquiryGroupRights(): InquiryGroupRights | null {
  const appSettings = useAppSettingsStore()
  return appSettings.inquiryGroupRights || DefaultInquiryGroupRights
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
  const typeRights = sessionStore.appSettings.inquiryTypeRights?.[inquiryType]
  return typeRights?.[action] ?? false
}


export function createInquiryContext(inquiry: InquiryStoreLike, appSettings: unknown): PermissionContext {
    if (!inquiry || !inquiry.owner || !inquiry.configuration || !inquiry.status) {
    console.warn('createInquiryContext called with invalid inquiry:', inquiry)
    return null
  }
  const isFinalStatus = isInquiryFinalStatus(inquiry, appSettings)
  
  const supportFeature = inquiry.configuration.supportFeature
  const allowComment = inquiry.configuration.allowComment
 
  // const currentUserStatus = inquiry.currentUserStatus || {}

  return {
    userType: getCurrentUserType(),
    contentType: ContentType.Inquiry,
    isOwner: isContentOwner(inquiry.owner.id),
    isPublic: inquiry.configuration.visibility === 'everyone',
    isLocked: inquiry.currentUserStatus.isLocked || false,
    isExpired: inquiry.status.isExpired || false,
    isDeleted: inquiry.status.deletionDate > 0,
    isArchived: inquiry.status.isArchived || false,
    hasGroupRestrictions: inquiry.inquiryGroups.length > 0,
    userGroups: getCurrentUserGroups(),
    allowedGroups: inquiry.inquiryGroups,
    inquiryType: inquiry.type,
    inquiryFamily: inquiry.family,
    visibilityLevel: inquiry.configuration.visibility as VisibilityLevel,
    isFinalStatus,
    moderationStatus: inquiry.status.moderationStatus,
    supportFeature,
    allowComment,
  }
}

export function createOptionContext(option: OptionStoreLike): PermissionContext {
  const supportFeature = option.supportFeature 
  const allowComment = option.allowComment    
  
  return {
    userType: getCurrentUserType(),
    contentType: ContentType.Option,
    isOwner: isContentOwner(option.owner.id),
    isPublic: true,
    isLocked: false,
    isExpired: false,
    isDeleted: option.isDeleted || false,
    isArchived: option.isArchived || false,
    hasGroupRestrictions: false,
    userGroups: getCurrentUserGroups(),
    allowedGroups: [],
    optionType: option.type,
    VisibilityLevel: VisibilityLevel.Everyone,
    supportFeature,
    allowComment,
  }
}

export function createInquiryGroupContext(group: InquiryGroup): PermissionContext {
  const sessionStore = useSessionStore()
  const isOwner = isContentOwner(group.owner.id)
  const isGroupEditor = sessionStore.currentUser.isGroupEditor
  
  // Handle different field name variations
  const deleted = group.deleted ?? 0
const groupStatus = group.group_status || group.groupStatus || ''
const ownedGroup = group.owned_group || group.ownedGroup || null
const isPublic = group.isPublic ?? (group.protected === false || group.protected === 0)

  return {
    userType: getCurrentUserType(),
    contentType: ContentType.InquiryGroup,
    isOwner,
    isPublic,
    isLocked: false,
    isExpired: false,
    isDeleted: deleted > 0,
    isArchived: groupStatus === 'archived',
    hasGroupRestrictions: ownedGroup !== null,
    userGroups: getCurrentUserGroups(),
    allowedGroups: ownedGroup ? [ownedGroup] : [],
    isGroupMember: true,
    isGroupEditor: isGroupEditor || isOwner,
    groupType: group.type,
    ownedGroup,
  }
}


function getDisplayPermissions(context: PermissionContext): {
  canSupport: boolean
  canComment: boolean
} {
  
  const hasSupportValue = context.supportFeature !== undefined
  const hasCommentValue = context.allowComment !== undefined
  

  // If context has explicit values, use them
  if (hasSupportValue || hasCommentValue) {
    
    const canSupport = hasSupportValue 
      ? context.supportFeature !== 'none' && 
        context.supportFeature !== '' && 
        context.supportFeature !== null
      : false
    
    const canComment = hasCommentValue
      ? context.allowComment !== null && Boolean(context.allowComment)
      : true // Default to true if not specified
    
    return { canSupport, canComment }
  }
  
  // Only fall back to type config if context doesn't have explicit values
  // But avoid infinite recursion - check if we're already in a type config check
  if (context.contentType === ContentType.Inquiry || context.contentType === ContentType.Option) {
    return getTypeConfigPermissions(context)
  }
  
  // Default for other content types
  return { canSupport: false, canComment: true }
}


export function getEditPermissions(context: PermissionContext): {
  canSupport: boolean
  canComment: boolean
} {
  return getTypeConfigPermissions(context)
}

function getTypeConfigPermissions(context: PermissionContext): {
  canSupport: boolean
  canComment: boolean
} {
  const sessionStore = useSessionStore()
  const appSettings = sessionStore.appSettings
  const typeKey = context.contentType === ContentType.Inquiry 
    ? context.inquiryType 
    : context.optionType
  
  if (!typeKey) {
    return { canSupport: false, canComment: false }
  }
  
  if (context.contentType === ContentType.Inquiry) {
    const typeRights = appSettings.inquiryTypeRights?.[typeKey]
    if (typeRights) {
      return {
        canSupport: typeRights.supportInquiry && typeRights.supportFeature !== 'none',
        canComment: typeRights.commentInquiry !== false && typeRights.commentInquiry !== null
      }
    }
  }
  
  if (context.contentType === ContentType.Inquiry) {
    const inquiryTypes = appSettings.inquiryTypeTab || []
    const inquiryConfig = inquiryTypes.find((type: InquiryType) => 
      type.inquiry_type === typeKey || type.inquiryType === typeKey
    )
    
    if (inquiryConfig) {
      return {
        canSupport: inquiryConfig.support_feature !== '' && 
                   inquiryConfig.support_feature !== 'none' && 
                   inquiryConfig.support_feature !== null,
        canComment: inquiryConfig.allow_comment !== null && 
                   inquiryConfig.allow_comment !== false
      }
    }
  } 
  else if (context.contentType === ContentType.Option) {
    const optionTypes = appSettings.inquiryOptionTypeTab || []
    const optionConfig = optionTypes.find((type: InquiryOptionType) => 
       type.option_type === typeKey
    )
    
    if (optionConfig) {
      return {
        canSupport: optionConfig.support_feature !== '' && 
                   optionConfig.support_feature !== 'none' && 
                   optionConfig.support_feature !== null,
        canComment: optionConfig.allow_comment !== null && 
                   optionConfig.allow_comment !== false
      }
    }
  }
  
  return { canSupport: false, canComment: false }
}

export function canSupport(context: PermissionContext): boolean {
  const appSettings = useSessionStore().appSettings

    // Content blocked check
    if (isContentBlocked(context)) {
        return false
    }

    // Access restriction check (only for inquiries)
    if (context.contentType === ContentType.Inquiry && isAccessRestrictedForSupports(context)) {
        return false
    }


    if (context.supportFeature && context.supportFeature!=='') {
        return context.supportFeature !=='none'
    }


    const typePerms = getDisplayPermissions(context) 
      if (!typePerms.canSupport) {
        return false
    }


      // Group access check
    if (!hasGroupAccess(context)) {
        return false
    }


    // Guest user check
    if (context.userType === UserType.Guest) {
        return context.isPublic && appSettings.allowGuestSupport
    }

    return true

}

export function canComment(context: PermissionContext): boolean {
    const appSettings = useAppSettingsStore()

    // Content blocked check
    if (isContentBlocked(context)) {
        return false
    }

    // Access restriction check (only for inquiries)
    if (context.contentType === ContentType.Inquiry && isAccessRestrictedForComments(context)) {
        return false
    }

    if (context.allowComment) {
        return context.allowComment
    }

    const typePerms = getDisplayPermissions(context) // Utilise getDisplayPermissions
    if (!typePerms.canComment) {
        return false
    }

     // Group access check
    if (!hasGroupAccess(context)) {
        return false
    }

    // Guest user check
    if (context.userType === UserType.Guest) {
        return context.isPublic && appSettings.allowGuestComments
    }

    return true
}

function hasGroupAccess(context: PermissionContext): boolean {
    // Check if user is admin - they have access to everything
    if (context.userType === UserType.Admin) {
        return true;
    }

    // For inquiry groups, check if user belongs to ownedGroup or is group editor
    if (context.contentType === ContentType.InquiryGroup && context.ownedGroup) {
        const sessionStore = useSessionStore();
        const currentUser = sessionStore.currentUser;

        if (!currentUser) {
            return false;
        }

        // Check if user belongs to the owned group
        const groups = currentUser.groups;
        
        // Check if groups is an array and includes the owned group
        if (Array.isArray(groups) && groups.includes(context.ownedGroup)) {
            return true;
        }

        // Check if user is a group editor
        if (currentUser.isGroupEditor) {
            return true;
        }

        return false;
    }

    // For other content types with group restrictions
    if (context.hasGroupRestrictions) {
        const sessionStore = useSessionStore();
        const currentUser = sessionStore.currentUser;

        if (!currentUser) {
            return false;
        }

        // Check if user is moderator
        if (context.userType === UserType.Moderator) {
            return true;
        }

        // Check if user's groups intersect with allowed groups
        const userGroups = currentUser.groups;
        if (Array.isArray(userGroups) && 
            Array.isArray(context.allowedGroups) &&
            userGroups.some(group => context.allowedGroups.includes(group))) {
            return true;
        }

        // Check if user is group editor
        if (currentUser.isGroupEditor) {
            return true;
        }

        return false;
    }

    // If no group restrictions, return true (or false based on your logic)
    // You might want to add a default return value here
    return false;
}

function isContentBlocked(context: PermissionContext): boolean {
    return context.isArchived || context.isDeleted || context.isLocked || context.isExpired
}

function isAccessRestrictedForComments(context: PermissionContext): boolean {
    if (context.isFinalStatus) {
        return true
    }

    if (context.moderationStatus && context.moderationStatus !== 'accepted') {
        return true
    }

    switch (context.visibilityLevel) {
        case VisibilityLevel.Private:
            return true
        case VisibilityLevel.Everyone:
            default:
            return false
    }

    switch (context.publicationStatusLevel) {
        case PublicationStatusLevel.Pending:
            return context.userType !== UserType.Moderator && context.userType !== UserType.Admin
            default:
            return false
    }

}

function isAccessRestrictedForSupports(context: PermissionContext): boolean {
    if (context.isFinalStatus) {
        return true
    }

    // Check if moderation status is accepted
    if (context.moderationStatus && context.moderationStatus !== 'accepted') {
        return true
    }

    switch (context.visibilityLevel) {
        case VisibilityLevel.Private:
            return true
        case VisibilityLevel.Everyone:
            default:
            return false
    }
    switch (context.publicationStatusLevel) {
        case PublicationStatusLevel.Pending:
		return true
            default:
            return false
    }


}

function isAccessRestrictedForSharing(context: PermissionContext): boolean {
    if (context.isFinalStatus) {
        return true
    }

    switch (context.accessLevel) {
        case VisibilityLevel.Private:
            return true
        case VisibilityLevel.Everyone:
            default:
            return false
    }

     switch (context.publicationStatusLevel) {
        case PublicationStatusLevel.Pending:
                return true
            default:
            return false
    }

}

/**
 * Check if user can edit result based on moderation status
 * @param moderationStatus
 */
export function canEditResult(moderationStatus: string): boolean {
    return moderationStatus !== 'rejected' && moderationStatus !== 'pending'
}

/**
 * Check if user can perform actions based on moderation status
 * @param moderationStatus
 */
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

/**
 * Verify access to family menu based on user permissions and selected family type
 * @param selectedFamilyType
 */
export function accessFamilyMenu(selectedFamilyType: InquiryFamily): boolean {
    const sessionStore = useSessionStore()
    const currentUser = sessionStore.currentUser

    if (!currentUser?.id) {
        return false
    }

    let hasAccess = false

    switch (selectedFamilyType) {
        case InquiryFamily.Official:
            hasAccess = sessionStore.currentUser.isOfficial || sessionStore.currentUser.isAdmin
        break
        case InquiryFamily.Legislatif:
            hasAccess = sessionStore.currentUser.isLegislative || sessionStore.currentUser.isAdmin
        break
        default:
            hasAccess = true
    }

    return hasAccess
}

/**
 * Check if user can create official response
 * @param context
 */
export function canCreateOfficialResponse(context: PermissionContext): boolean {
    const sessionStore = useSessionStore()

    // Check if user is official and moderation status is accepted
    if (!sessionStore.currentUser.isOfficial || context.moderationStatus !== 'accepted') {
        return false
    }

    // Additional checks for content blocking
    if (isContentBlocked(context)) {
        return false
    }

    return true
}

/**
 * Check if user can create transformation based on inquiry family
 * @param context
 */
export function canCreateTransformation(context: PermissionContext): boolean {
    const sessionStore = useSessionStore()

    // Base check - must be able to edit and have accepted moderation
    if (!canEdit(context) || context.moderationStatus !== 'accepted') {
        return false
    }

    // Check for official user - they can create transformations regardless of family
    if (sessionStore.currentUser.isOfficial) {
        return true
    }

    // Check based on inquiry family and user permissions
    if (context.inquiryFamily) {
        switch (context.inquiryFamily) {
            case InquiryFamily.Legislatif:
                return sessionStore.currentUser.isLegislative
            case InquiryFamily.Collective:
                // Check if user is group editor
                return sessionStore.currentUser.isGroupEditor
            default:
                return false
        }
    }

    return false
}

/**
 * Check if user can create content based on family type
 * @param context
 */
export function canCreateByFamily(context: PermissionContext): boolean {
    const sessionStore = useSessionStore()

    // Base check - must be able to edit and have accepted moderation
    if (!canEdit(context) || context.moderationStatus !== 'accepted') {
        return false
    }

    // Check based on inquiry family and user permissions
    if (context.inquiryFamily) {
        switch (context.inquiryFamily) {
            case InquiryFamily.Legislatif:
                return sessionStore.currentUser.isLegislative
            case InquiryFamily.Collective:
                // Check if user is group editor
                return sessionStore.currentUser.isGroupEditor
            default:
                return false
        }
    }

    return false
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
    // Handle inquiry groups separately
    if (context.contentType === ContentType.InquiryGroup) {
        return context.isOwner || context.userType === UserType.Admin
    }

    // Original logic for other content types
    if (context.isDeleted) return false

        // Check moderation status restrictions
        if (context.moderationStatus === 'rejected' || context.moderationStatus === 'pending') {
            return false
        }

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
    // Handle inquiry groups: owner, admin, or group editor
    if (context.contentType === ContentType.InquiryGroup) {
        if (!(context.isArchived || context.isDeleted)) return false

            if (context.isOwner || context.userType === UserType.Admin) {
                return true
            }

            // Group editors can restore
            const sessionStore = useSessionStore()
            if (sessionStore.currentUser.isGroupEditor) {
                return true
            }

            // Check if user belongs to ownedGroup
            if (context.ownedGroup && hasGroupAccess(context)) {
                return true
            }

            return false
    }

    // Original logic for other content types
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

export function canCreateInquiryGroupInGeneral(): boolean {
    const sessionStore = useSessionStore()
    const context: PermissionContext = {
        userType: getCurrentUserType(),
        contentType: ContentType.InquiryGroup,
        isOwner: false,
        isPublic: true,
        isLocked: false,
        isExpired: false,
        isDeleted: false,
        isArchived: false,
        hasGroupRestrictions: false,
        userGroups: getCurrentUserGroups(),
        allowedGroups: [],
        isGroupEditor: sessionStore.currentUser.isGroupEditor
    }

    return canCreateInquiryGroup(context)
}

/**
 * @param context
 */
export function canArchive(context: PermissionContext): boolean {
    // Handle inquiry groups: owner, admin, or group editor
    if (context.contentType === ContentType.InquiryGroup) {
        if (context.isArchived || context.isDeleted) return false

            if (context.isOwner || context.userType === UserType.Admin) {
                return true
            }

            // Group editors can archive
            const sessionStore = useSessionStore()
            if (sessionStore.currentUser.isGroupEditor) {
                return true
            }

            // Check if user belongs to ownedGroup
            if (context.ownedGroup && hasGroupAccess(context)) {
                return true
            }

            return false
    }

    // Original logic for other content types
    if (context.isArchived || context.isDeleted) return false

        // Check moderation status restrictions
        if (context.moderationStatus === 'rejected' || context.moderationStatus === 'pending') {
            return false
        }

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
    // Check moderation status restrictions
    if (context.moderationStatus === 'rejected' || context.moderationStatus === 'pending') {
        return false
    }

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
        if (!context || context === undefined || context === null) {
        console.warn('canEdit called with undefined context')
        return false
    
        }
    // Handle inquiry groups separately
    if (context.contentType === ContentType.InquiryGroup) {
        if (context.isOwner || context.userType === UserType.Admin) {
            return true
        }

        // Group editors can modify
        const sessionStore = useSessionStore()
        if (sessionStore.currentUser.isGroupEditor) {
            return true
        }

        // Check if user belongs to ownedGroup
        if (context.ownedGroup && hasGroupAccess(context)) {
            return true
        }

        return false
    }

    // Original logic for other content types
    if (context.isLocked || context.isArchived || context.isDeleted) {
        return false
    }

    // Check moderation status restrictions
    if (context.moderationStatus === 'rejected' || context.moderationStatus === 'pending') {
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
export function canShare(context: PermissionContext): boolean {
    const sessionStore = useSessionStore()

    if (context.isArchived || context.isDeleted) {
        return false
    }

    if (isAccessRestrictedForSharing(context)) {
        return false
    }
   
    if (context.accessLevel === VisibilityLevel.Open &&
        context.userType !== UserType.Moderator &&
        context.userType !== UserType.Admin &&
        !context.isOwner) {
            return false;
        }


    if (sessionStore.appPermissions.allAccess) {
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

export function canUseResource(context: PermissionContext): boolean {
    if (context.isArchived || context.isDeleted || context.isLocked) {
        return false
    }

    // Check moderation status restrictions
    if (context.moderationStatus === 'rejected' || context.moderationStatus === 'pending') {
        return false
    }

    // Only check resource permissions for inquiries
    if (context.contentType === ContentType.Inquiry && context.inquiryType) {
        if (!canInquiryTypePerformAction(context.inquiryType, 'useResourceInquiry')) {
            return false
        }
    }

    if (!hasGroupAccess(context)) {
        return false
    }

    if (context.userType === UserType.Guest) {
        return false
    }

    return true
}


/**
 * @param context
 */
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
        if (!hasGroupAccess(context)) {
            return false
        }
    }

    if (context.userType === UserType.Guest) {
        return context.isPublic && appSettings.allowPublicAccess
    }

    return true
}

/**
 * @param context
 */
export function canCreate(context: PermissionContext): boolean {
    const appSettings = useAppSettingsStore()

    if (context.userType === UserType.Guest) {
        return appSettings.allowGuestCreation
    }
    return true
}

/**
 * @param context
 */
export function canLock(context: PermissionContext): boolean {
    return [UserType.Moderator, UserType.Admin].includes(context.userType)
}

/**
 * INQUIRY GROUP SPECIFIC PERMISSIONS
 */

/**
 * Check if user can view an inquiry group
 * @param context
 */
export function canViewInquiryGroup(context: PermissionContext): boolean {
    // Always allow admins and moderators
    if (context.userType === UserType.Admin || context.userType === UserType.Moderator) {
        return true
    }

    // If group is public, anyone can view
    if (context.isPublic) {
        return true
    }

    // For private groups, check group access
    const sessionStore = useSessionStore()
    return context.isOwner || 
        sessionStore.currentUser.isGroupEditor || 
        (context.ownedGroup && hasGroupAccess(context))
}

/**
 * Check if user can create an inquiry group
 * @param context
 */
export function canCreateInquiryGroup(context: PermissionContext): boolean {
    const groupRights = getCurrentInquiryGroupRights()

    if (context.userType === UserType.Guest) {
        return false
    }

    if (context.userType === UserType.Admin) {
        return true
    }

    const sessionStore = useSessionStore()
    // Only group editors can create inquiry groups
    if (!sessionStore.currentUser.isGroupEditor) {
        return false
    }

    return groupRights?.createInquiry ?? false
}

/**
 * Check if user can modify an inquiry group
 * @param context
 */
export function canModifyInquiryGroup(context: PermissionContext): boolean {
    // For inquiry groups: check if user is owner, admin, or group editor
    if (context.contentType === ContentType.InquiryGroup) {
        if (context.isOwner || context.userType === UserType.Admin) {
            return true
        }

        // Group editors can modify
        const sessionStore = useSessionStore()
        if (sessionStore.currentUser.isGroupEditor) {
            return true
        }

        // Check if user belongs to ownedGroup
        if (context.ownedGroup && hasGroupAccess(context)) {
            return true
        }

        return false
    }

    // Original logic for other content types
    const groupRights = getCurrentInquiryGroupRights()

    if (context.isOwner || context.userType === UserType.Admin) {
        return true
    }

    if (context.userType === UserType.Moderator) {
        return groupRights?.modifyGroup ?? false
    }

    return false
}

/**
 * Check if user can delete an inquiry group
 * @param context
 */
export function canDeleteInquiryGroup(context: PermissionContext): boolean {
    // For inquiry groups: only owners and admins can delete
    if (context.contentType === ContentType.InquiryGroup) {
        return context.isOwner || context.userType === UserType.Admin
    }

    // Original logic for other content types
    const groupRights = getCurrentInquiryGroupRights()

    if (context.isOwner || context.userType === UserType.Admin) {
        return true
    }

    if (context.userType === UserType.Moderator) {
        return groupRights?.deleteGroup ?? false
    }

    return false
}

/**
 * Check if user can add inquiries to a group
 * @param context
 */
export function canAddInquiryToGroup(context: PermissionContext): boolean {

    // Always allow owners and admins
    if (context.isOwner || context.userType === UserType.Admin) {
        return true
    }

    // Check group access level
    return context.isGroupEditor
}

/**
 * Check if user can remove inquiries from a group
 * @param context
 */
export function canRemoveInquiryFromGroup(context: PermissionContext): boolean {
    const groupRights = getCurrentInquiryGroupRights()

    // Always allow owners and admins
    if (context.isOwner || context.userType === UserType.Admin) {
        return true
    }

    // Group moderators/editors can remove
    if (context.isGroupModerator || context.isGroupEditor) {
        return true
    }

    // Moderators can remove if they have the right
    if (context.userType === UserType.Moderator) {
        return groupRights?.removeInquiry ?? false
    }

    // Users can only remove their own inquiries from groups
    return context.isOwner
}

/**
 * Check if user can manage group members
 * @param context
 */
export function canManageGroupMembers(context: PermissionContext): boolean {
    const groupRights = getCurrentInquiryGroupRights()

    // Always allow owners and admins
    if (context.isOwner || context.userType === UserType.Admin) {
        return true
    }

    // Group moderators/editors can manage members
    if (context.isGroupModerator || context.isGroupEditor) {
        return true
    }

    // Moderators can manage if they have the right
    if (context.userType === UserType.Moderator) {
        return groupRights?.manageMembers ?? false
    }

    return false
}

/**
 * Check if user can manage group permissions
 * @param context
 */
export function canManageGroupPermissions(context: PermissionContext): boolean {
    const groupRights = getCurrentInquiryGroupRights()

    // Only owners and admins can manage permissions
    if (context.isOwner || context.userType === UserType.Admin) {
        return true
    }

    // Moderators can manage if they have the right
    if (context.userType === UserType.Moderator) {
        return groupRights?.managePermissions ?? false
    }

    return false
}

/**
 * Check if user can create a specific response type
 * @param responseType
 * @param context
 */
export function canCreateResponseType(responseType: string, context: PermissionContext): boolean {
    if (responseType === 'official') {
        return canCreateOfficialResponse(context)
    }

    // Check if user has required group membership for this response type
    if (!hasRequiredGroupForResponseType(responseType, context)) {
        return false
    }

    // For regular responses: need edit rights AND accepted moderation
    const canCreate = canEdit(context) && context.moderationStatus === 'accepted'
    return canCreate
}

/**
 * Check if user can create a specific transformation type
 * @param transformType
 * @param context
 */
export function canCreateTransformationType(transformType: string, context: PermissionContext): boolean {
    // Check if user has required group membership for this transformation type
    if (!hasRequiredGroupForTransformationType(transformType, context)) {
        return false
    }
    return canCreateTransformation(context)
}

/**
 * Check if user has required group membership for response type
 * @param responseType
 */
function hasRequiredGroupForResponseType(responseType: string): boolean {
    const sessionStore = useSessionStore()

    if (!sessionStore.currentUser?.id) return false

        // Only check group membership for specific family-related response types
        const responseTypeRequirements: { [key: string]: boolean } = {
            'legislative': sessionStore.currentUser.isLegislative,
            'official': sessionStore.currentUser.isOfficial,
            'collective': sessionStore.currentUser.isGroupEditor
        }

        // If this response type requires specific group membership, check it
        const requiredPermission = responseTypeRequirements[responseType]
        if (requiredPermission !== undefined) {
            return requiredPermission
        }

        // For all other response types, allow by default
        return true
}

/**
 * Check if user has required group membership for transformation type  
 * @param transformType
 */
function hasRequiredGroupForTransformationType(transformType: string): boolean {
    const sessionStore = useSessionStore()

    if (!sessionStore.currentUser?.id) return false

        // Only check group membership for specific family-related transformation types
        const transformTypeRequirements: { [key: string]: boolean } = {
            'legislative': sessionStore.currentUser.isLegislative,
            'official': sessionStore.currentUser.isOfficial,
            'collective': sessionStore.currentUser.isGroupEditor
        }

        // If this transformation type requires specific group membership, check it
        const requiredPermission = transformTypeRequirements[transformType]
        if (requiredPermission !== undefined) {
            return requiredPermission
        }

        // For all other transformation types, allow by default
        return true
}

/**
 * Check if response actions menu should be shown
 * @param inquiryType
 * @param inquiryTypes
 * @param context
 */
export function shouldShowResponseActions(
    inquiryType: string, 
    inquiryTypes: InquiryType[],
    context: PermissionContext
): boolean {
    const availableTypes = getAvailableResponseTypesWithPermissions(inquiryType, inquiryTypes, context)
    return availableTypes.length > 0
}

/**
 * Check if transformation actions menu should be shown
 * @param inquiryType
 * @param inquiryTypes
 * @param context
 */
export function shouldShowTransformationActions(
    inquiryType: string, 
    inquiryTypes: InquiryType[],
    context: PermissionContext
): boolean {
    const availableTypes = getAvailableTransformTypesWithPermissions(inquiryType, inquiryTypes, context)
    return availableTypes.length > 0
}

/**
 * Get available response types with permission filtering
 * @param inquiryType
 * @param inquiryTypes
 * @param context
 */
export function getAvailableResponseTypesWithPermissions(
    inquiryType: string, 
    inquiryTypes: InquiryType[],
    context: PermissionContext
): InquiryType[] {
    const currentType = inquiryTypes.find(t => t.inquiry_type === inquiryType)
    if (!currentType?.allowed_response) return []

        let allowedResponses: string[] = []
        if (typeof currentType.allowed_response === 'string') {
            try {
                allowedResponses = JSON.parse(currentType.allowed_response)
            } catch {
                allowedResponses = []
            }
        } else {
            allowedResponses = currentType.allowed_response
        }

        const availableTypes = inquiryTypes.filter(type => 
                                                   allowedResponses.includes(type.inquiry_type) && 
                                                       canCreateResponseType(type.inquiry_type, context)
                                                  )

                                                  return availableTypes
}

/**
 * Get available transformation types with permission filtering
 * @param inquiryType
 * @param inquiryTypes
 * @param context
 */
export function getAvailableTransformTypesWithPermissions(
    inquiryType: string, 
    inquiryTypes: InquiryType[],
    context: PermissionContext
): InquiryType[] {
    const currentType = inquiryTypes.find(t => t.inquiry_type === inquiryType)
    if (!currentType?.allowed_transformation) return []

        let allowedTransforms: string[] = []
        if (typeof currentType.allowed_transformation === 'string') {
            try {
                allowedTransforms = JSON.parse(currentType.allowed_transformation)
            } catch {
                allowedTransforms = []
            }
        } else {
            allowedTransforms = currentType.allowed_transformation
        }

        const availableTypes = inquiryTypes.filter(type => 
                                                   allowedTransforms.includes(type.inquiry_type) && 
                                                       canCreateTransformationType(type.inquiry_type, context)
                                                  )

                                                  return availableTypes
}

// ////////////////////////////////////
// Options methods 
// ////////////////////////////////////
/**
 * Check if user can change status (only Owner, Admin or Moderator can change status)
 * @param context
 */
export function canChangeStatus(context: PermissionContext): boolean {
    // Only Owner, Admin or Moderator can change status
    if (context.userType === UserType.Admin || 
        context.userType === UserType.Moderator || 
        context.isOwner) {
        return true
    }

    return false
}

/**
 * Check if user can change status of an option
 * (Only Owner, Admin or Moderator can change status)
 * @param context
 */
export function canChangeOptionStatus(context: PermissionContext): boolean {
    // Only for options
    if (context.contentType !== ContentType.Option) {
        return false
    }

    // Only Owner, Admin or Moderator can change status
    return canChangeStatus(context)
}

/**
 * Check if user can edit an option
 * @param context
 */
export function canEditOption(context: PermissionContext): boolean {
    // Only for options
    if (context.contentType !== ContentType.Option) {
        return false
    }

    // Content blocking check
    if (context.isLocked || context.isArchived || context.isDeleted) {
        return false
    }

    // Only admin or owner can edit options
    if (context.userType === UserType.Admin || context.isOwner) {
        return true
    }

    return false
}

/**
 * Check if user can delete an option
 * @param context
 */
export function canDeleteOption(context: PermissionContext): boolean {
    // Only for options
    if (context.contentType !== ContentType.Option) {
        return false
    }

    // Already deleted
    if (context.isDeleted) {
        return false
    }

    // Only admin or owner can delete options
    if (context.userType === UserType.Admin || context.isOwner) {
        return true
    }

    return false
}

/**
 * Check if user can comment on an option
 * @param context
 */
export function canCommentOption(context: PermissionContext): boolean {
    // Only for options
    if (context.contentType !== ContentType.Option) {
        return false
    }

    // Content blocking check
    if (context.isArchived || context.isDeleted || context.isLocked) {
        return false
    }

    // Get type-specific permissions
    const typePerms = getDisplayPermissions(context)
    if (!typePerms.canComment) {
        return false
    }

    // Guest user check
    if (context.userType === UserType.Guest) {
        const appSettings = useAppSettingsStore()
        return context.isPublic && appSettings.allowGuestComments
    }

    return true
}

/**
 * Check if user can support an option
 * @param context
 */
export function canSupportOption(context: PermissionContext): boolean {
    // Only for options
    if (context.contentType !== ContentType.Option) {
        return false
    }

    // Content blocking check
    if (context.isArchived || context.isDeleted || context.isLocked) {
        return false
    }

    // Get type-specific permissions
    const typePerms = getDisplayPermissions(context)
    if (!typePerms.canSupport) {
        return false
    }

    // Guest user check
    if (context.userType === UserType.Guest) {
        const appSettings = useAppSettingsStore()
        return context.isPublic && appSettings.allowGuestSupport
    }

    return true
}

/**
 * Generic permission checker for options that delegates to specific functions
 * @param context
 * @param action - The action to check ('edit', 'delete', 'changeStatus', 'comment', 'support')
 */
export function canPerformOptionAction(context: PermissionContext, action: string): boolean {
    switch (action) {
        case 'edit':
            return canEditOption(context)
        case 'delete':
            return canDeleteOption(context)
        case 'changeStatus':
            return canChangeStatus(context)  // Use the general function
        case 'comment':
            return canCommentOption(context)
        case 'support':
            return canSupportOption(context)
        default:
            return false
    }
}


export default {
    // Enums
    UserType,
    ContentType,
    VisibilityLevel,
    InquiryFamily,

    // Default values
    DefaultModeratorRights,
    DefaultInquiryRights,
    DefaultOfficialRights,
    DefaultInquiryGroupRights,

    // Permission functions
    canView,
    canViewToggle,
    canComment,
    canSupport,
    canShare,
    canUseResource,
    canDelete,
    canArchive,
    canRestore,
    canTransfer,
    canModerate,
    canEdit,
    canCreate,
    canLock,

    // New moderation status functions
    canEditResult,
    canPerformActions,
    accessFamilyMenu,

    // Creation, filtering inquiries
    canCreateOfficialResponse,
    canCreateTransformation,
    canCreateByFamily,
    canCreateResponseType,
    canCreateTransformationType,
    shouldShowResponseActions,
    shouldShowTransformationActions,
    getAvailableResponseTypesWithPermissions,
    getAvailableTransformTypesWithPermissions,

    // Inquiry Group specific permissions
    canViewInquiryGroup,
    canCreateInquiryGroup,
    canCreateInquiryGroupInGeneral,
    canModifyInquiryGroup,
    canDeleteInquiryGroup,
    canAddInquiryToGroup,
    canRemoveInquiryFromGroup,
    canManageGroupMembers,
    canManageGroupPermissions,

    // Option 
     canEditOption,
    canDeleteOption,
    canChangeStatus,      
    canChangeOptionStatus, 
    canCommentOption,
    canSupportOption,
    canPerformOptionAction,

    // Context functions
    createInquiryContext,
    createOptionContext,
    createInquiryGroupContext,

    // Helper functions
    getCurrentUserType,
    getEditPermissions,
    getCurrentUserGroups,
    getCurrentModeratorRights,
    getCurrentOfficialRights,
    getCurrentInquiryGroupRights,
    canInquiryTypePerformAction,
}
