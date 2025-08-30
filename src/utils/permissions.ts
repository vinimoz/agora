// SPDX-FileCopyrightText: 2023 Nextcloud contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useSessionStore } from '../stores/session.ts'
import { appSettings } from '../stores/appSettings.ts'
import { InquiryTypeRights } from '../helpers/modules/InquiryHelper.ts'

const sessionStore = useSessionStore();

interface ModeratorRights extends appSettings.ModeratorRights {}
interface OfficialRights extends appSettings.OfficialRights {}

/**
 * User TYPE 
 */
export enum UserType {
  Guest = 'guest',
  User = 'user',
  Moderator = 'moderator',
  Admin = 'admin',
  Owner = 'owner'
}

/**
 * Content type
 */
export enum ContentType {
  Inquiry = 'inquiry',
  Comment = 'comment',
  Support = 'support',
  Attachment = 'attachment',
  Share = 'share'
}

/**
 * Content State
 */
export enum ContentStatus {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived',
  Deleted = 'deleted'
}

/**
 * Interface rights permission 
 */
export interface PermissionContext {
  userType: UserType;
  contentType: ContentType;
  contentStatus: ContentStatus;
  isOwner: boolean;
  isPublic: boolean;
  isLocked: boolean;
  isExpired: boolean;
  hasGroupRestrictions: boolean;
  userGroups: string[];
  allowedGroups: string[];
  inquiryType?: string; 
}

function getCurrentUserType(): UserType {
  const currentUser = sessionStore.getCurrentUser();
  
  if (!currentUser) return UserType.Guest;
  if (currentUser.isAdmin) return UserType.Admin;
  if (currentUser.isModerator) return UserType.Moderator;
  if (currentUser.isOfficial) return UserType.User;
  return UserType.User;
}

/**
 */
function getCurrentUserGroups(): string[] {
  const currentUser = sessionStore.getCurrentUser();
  return currentUser?.groups || [];
}

/**
 */
function getCurrentModeratorRights(): ModeratorRights | null {
  const currentUser = sessionStore.getCurrentUser();
  return currentUser?.isModerator ? appSettings.moderatorRights : null;
}

/**
 */
function getCurrentOfficialRights(): OfficialRights | null {
  const currentUser = sessionStore.getCurrentUser();
  return currentUser?.isOfficial ? appSettings.officialRights : null;
}

/**
 */
function isContentOwner(contentOwnerId: string): boolean {
  const currentUser = sessionStore.getCurrentUser();
  return currentUser?.id === contentOwnerId;
}

/**
 */
function canInquiryTypePerformAction(inquiryType: string, action: keyof InquiryTypeRights[keyof InquiryTypeRights]['settings']): boolean {
  const typeRights = appSettings.inquiryTypeRights[inquiryType as keyof typeof appSettings.inquiryTypeRights];
  return typeRights?.settings[action] ?? false;
}

export function canViewToggle(inquiry: any): boolean {
  const userType = getCurrentUserType();
  const userGroups = getCurrentUserGroups();
  const isOwner = isContentOwner(inquiry.ownerId);
  
  const context = createPermissionContext(
    userType,
    ContentType.Inquiry,
    inquiry.status as ContentStatus,
    isOwner,
    inquiry.isPublic,
    inquiry.isLocked,
    inquiry.isExpired,
    inquiry.hasGroupRestrictions,
    userGroups,
    inquiry.allowedGroups || [],
    inquiry.type // Ajout du type d'inquiry
  );
  
  return canView(context);
}

/**
 * @param context
 */
export function canView(context: PermissionContext): boolean {
  if (context.contentStatus === ContentStatus.Deleted) {
    return [UserType.Moderator, UserType.Admin, UserType.Owner].includes(
      context.userType
    );
  }

  if (context.contentStatus === ContentStatus.Archived) {
    return [
      UserType.Moderator,
      UserType.Admin,
      UserType.Owner,
      UserType.User
    ].includes(context.userType);
  }

  if (context.hasGroupRestrictions && context.userType !== UserType.Guest) {
    const hasGroupAccess = context.userGroups.some((group) =>
      context.allowedGroups.includes(group)
    );
    if (
      !hasGroupAccess &&
      context.userType !== UserType.Admin &&
      context.userType !== UserType.Moderator
    ) {
      return false;
    }
  }

  if (context.userType === UserType.Guest) {
    return context.isPublic && appSettings.allowPublicAccess;
  }

  return true;
}

/**
 * @param context
 */
export function canViewSupport(context: PermissionContext): boolean {
  if (context.contentStatus !== ContentStatus.Published) {
    return [UserType.Moderator, UserType.Admin, UserType.Owner].includes(
      context.userType
    );
  }

  // Vérifier si le type d'inquiry permet de voir les supports
  if (context.inquiryType && !canInquiryTypePerformAction(context.inquiryType, 'supportInquiry')) {
    return false;
  }

  return canView(context);
}

/**
 * @param context
 */
export function canViewComment(context: PermissionContext): boolean {
  if (context.inquiryType && !canInquiryTypePerformAction(context.inquiryType, 'commentInquiry')) {
    return false;
  }

  return canView(context);
}

/**
 * @param context
 */
export function canViewDelete(context: PermissionContext): boolean {
  return [UserType.Moderator, UserType.Admin, UserType.Owner].includes(
    context.userType
  );
}

/**
 * @param context
 */
export function canComment(context: PermissionContext): boolean {
  if (
    context.contentStatus !== ContentStatus.Published ||
    context.isLocked ||
    context.isExpired
  ) {
    return false;
  }

  if (context.inquiryType && !canInquiryTypePerformAction(context.inquiryType, 'commentInquiry')) {
    return false;
  }

  if (!appSettings.allowComments) {
    return false;
  }

  if (context.hasGroupRestrictions && context.userType !== UserType.Guest) {
    const hasGroupAccess = context.userGroups.some((group) =>
      context.allowedGroups.includes(group)
    );
    if (!hasGroupAccess) {
      return false;
    }
  }

  if (context.userType === UserType.Guest) {
    return context.isPublic && appSettings.allowGuestComments;
  }

  return true;
}

/**
 * @param context
 */
export function canSupport(context: PermissionContext): boolean {
  if (
    context.contentStatus !== ContentStatus.Published ||
    context.isLocked ||
    context.isExpired
  ) {
    return false;
  }

  if (context.inquiryType && !canInquiryTypePerformAction(context.inquiryType, 'supportInquiry')) {
    return false;
  }

  if (!appSettings.allowSupport) {
    return false;
  }

  if (context.hasGroupRestrictions && context.userType !== UserType.Guest) {
    const hasGroupAccess = context.userGroups.some((group) =>
      context.allowedGroups.includes(group)
    );
    if (!hasGroupAccess) {
      return false;
    }
  }

  if (context.userType === UserType.Guest) {
    return context.isPublic && appSettings.allowGuestSupport;
  }

  return true;
}

/**
 * @param context
 */
export function canAttachFile(context: PermissionContext): boolean {
  if (context.contentStatus !== ContentStatus.Published || context.isLocked) {
    return false;
  }

  if (context.inquiryType && !canInquiryTypePerformAction(context.inquiryType, 'attachFileInquiry')) {
    return false;
  }

  if (!appSettings.allowAttachments) {
    return false;
  }

  if (context.hasGroupRestrictions && context.userType !== UserType.Guest) {
    const hasGroupAccess = context.userGroups.some((group) =>
      context.allowedGroups.includes(group)
    );
    if (!hasGroupAccess) {
      return false;
    }
  }

  if (context.userType === UserType.Guest) {
    return false;
  }

  return true;
}

/**
 * @param context
 */
export function canDelete(context: PermissionContext): boolean {
  if (context.contentStatus === ContentStatus.Deleted) {
    return false;
  }

  if (context.isOwner) {
    return true;
  }

  const moderatorRights = getCurrentModeratorRights();
  
  if (context.userType === UserType.Moderator && moderatorRights) {
    return moderatorRights.deleteInquiry;
  }
  
  if (context.userType === UserType.Admin) {
    return true;
  }

  return false;
}

/**
 * @param context
 */
export function canArchive(context: PermissionContext): boolean {
  if (
    [ContentStatus.Archived, ContentStatus.Deleted].includes(
      context.contentStatus
    )
  ) {
    return false;
  }

  if (context.isOwner) {
    return true;
  }

  const moderatorRights = getCurrentModeratorRights();
  
  if (context.userType === UserType.Moderator && moderatorRights) {
    return moderatorRights.archiveInquiry;
  }
  
  if (context.userType === UserType.Admin) {
    return true;
  }

  return false;
}

/**
 * @param context
 */
export function canTransfer(context: PermissionContext): boolean {
  return context.isOwner || context.userType === UserType.Admin;
}

/**
 * @param context
 */
export function canGroup(context: PermissionContext): boolean {
  return [UserType.Moderator, UserType.Admin].includes(context.userType);
}

/**
 * @param context
 */
export function canModerate(context: PermissionContext): boolean {
  return [UserType.Moderator, UserType.Admin].includes(context.userType);
}

/**
 * Vérifie si l'utilisateur peut éditer le contenu
 * @param context
 */
export function canEdit(context: PermissionContext): boolean {
  if (
    context.isLocked ||
    [ContentStatus.Archived, ContentStatus.Deleted].includes(
      context.contentStatus
    )
  ) {
    return false;
  }

  if (context.isOwner) {
    return true;
  }

  const moderatorRights = getCurrentModeratorRights();
  
  if (context.userType === UserType.Moderator && moderatorRights) {
    return moderatorRights.modifyInquiry;
  }
  
  if (context.userType === UserType.Admin) {
    return true;
  }

  return false;
}

/**
 * @param context
 */
export function canCreate(context: PermissionContext): boolean {
  if (context.userType === UserType.Guest) {
    return appSettings.allowGuestCreation;
  }

  return true;
}

/**
 * @param context
 */
export function canLock(context: PermissionContext): boolean {
  return [UserType.Moderator, UserType.Admin].includes(context.userType);
}

/**
 * Crée un contexte de permission basé sur l'utilisateur actuel et le contenu
 */
export function createPermissionContextForContent(
  contentType: ContentType,
  contentStatus: ContentStatus,
  contentOwnerId: string,
  isPublic: boolean = true,
  isLocked: boolean = false,
  isExpired: boolean = false,
  hasGroupRestrictions: boolean = false,
  allowedGroups: string[] = [],
  inquiryType?: string
): PermissionContext {
  const userType = getCurrentUserType();
  const userGroups = getCurrentUserGroups();
  const isOwner = isContentOwner(contentOwnerId);
  
  return {
    userType,
    contentType,
    contentStatus,
    isOwner,
    isPublic,
    isLocked,
    isExpired,
    hasGroupRestrictions,
    userGroups,
    allowedGroups,
    inquiryType
  };
}

/**
 * @param userType
 * @param contentType
 * @param contentStatus
 * @param isOwner
 * @param isPublic
 * @param isLocked
 * @param isExpired
 * @param hasGroupRestrictions
 * @param userGroups
 * @param allowedGroups
 * @param inquiryType
 */
export function createPermissionContext(
  userType: UserType,
  contentType: ContentType,
  contentStatus: ContentStatus,
  isOwner: boolean = false,
  isPublic: boolean = true,
  isLocked: boolean = false,
  isExpired: boolean = false,
  hasGroupRestrictions: boolean = false,
  userGroups: string[] = [],
  allowedGroups: string[] = [],
  inquiryType?: string
): PermissionContext {
  return {
    userType,
    contentType,
    contentStatus,
    isOwner,
    isPublic,
    isLocked,
    isExpired,
    hasGroupRestrictions,
    userGroups,
    allowedGroups,
    inquiryType
  };
}

// Export par défaut pour une utilisation facile
export default {
  UserType,
  ContentType,
  ContentStatus,
  canView,
  canViewSupport,
  canViewComment,
  canViewDelete,
  canComment,
  canSupport,
  canDelete,
  canArchive,
  canTransfer,
  canGroup,
  canModerate,
  canAttachFile,
  canEdit,
  canCreate,
  canLock,
  createPermissionContext,
  createPermissionContextForContent,
  getCurrentUserType,
  getCurrentUserGroups,
  getCurrentModeratorRights,
  getCurrentOfficialRights,
  canInquiryTypePerformAction
};
