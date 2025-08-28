// SPDX-FileCopyrightText: 2023 Nextcloud contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Types d'utilisateur
 */
export enum UserType {
  Guest = 'guest',
  User = 'user',
  Moderator = 'moderator',
  Admin = 'admin',
  Owner = 'owner'
}

/**
 * Types de contenu
 */
export enum ContentType {
  Inquiry = 'inquiry',
  Comment = 'comment',
  Support = 'support',
  Attachment = 'attachment'
}

/**
 * État du contenu
 */
export enum ContentStatus {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived',
  Deleted = 'deleted'
}

/**
 * Interface pour les paramètres de permission
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

  return context.isPublic || context.userType !== UserType.Guest;
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

  return canView(context);
}

/**
 * @param context
 */
export function canViewComment(context: PermissionContext): boolean {
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

  if (context.hasGroupRestrictions && context.userType !== UserType.Guest) {
    const hasGroupAccess = context.userGroups.some((group) =>
      context.allowedGroups.includes(group)
    );
    if (!hasGroupAccess) {
      return false;
    }
  }

  if (context.userType === UserType.Guest) {
    return context.isPublic; // À adapter selon les règles métier
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

  if (context.hasGroupRestrictions && context.userType !== UserType.Guest) {
    const hasGroupAccess = context.userGroups.some((group) =>
      context.allowedGroups.includes(group)
    );
    if (!hasGroupAccess) {
      return false;
    }
  }

  if (context.userType === UserType.Guest) {
    return context.isPublic;
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

  // Les modérateurs et administrateurs peuvent supprimer
  return [UserType.Moderator, UserType.Admin].includes(context.userType);
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

  return [UserType.Moderator, UserType.Admin].includes(context.userType);
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
  // Les modérateurs et administrateurs peuvent modérer
  return [UserType.Moderator, UserType.Admin].includes(context.userType);
}

/**
 * @param context
 */
export function canAttachFile(context: PermissionContext): boolean {
  if (context.contentStatus !== ContentStatus.Published || context.isLocked) {
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
 * Vérifie si l'utilisateur peut éditer le contenu
 * @param context
 */
export function canEdit(context: PermissionContext): boolean {
  // Le contenu verrouillé, archivé ou supprimé ne peut pas être édité
  if (
    context.isLocked ||
    [ContentStatus.Archived, ContentStatus.Deleted].includes(
      context.contentStatus
    )
  ) {
    return false;
  }

  // Les propriétaires peuvent éditer leur propre contenu
  if (context.isOwner) {
    return true;
  }

  // Les modérateurs et administrateurs peuvent éditer
  return [UserType.Moderator, UserType.Admin].includes(context.userType);
}

/**
 * @param context
 */
export function canCreate(context: PermissionContext): boolean {
  // Les invités ne peuvent pas créer de contenu sauf si explicitement autorisé
  if (context.userType === UserType.Guest) {
    return false; // À adapter selon les règles métier
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
  allowedGroups: string[] = []
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
    allowedGroups
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
  createPermissionContext
};
