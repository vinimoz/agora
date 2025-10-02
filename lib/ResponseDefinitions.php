<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\Agora;

/**
 * @psalm-type InquiriesInquiryPermissions = array {
 *  addOptions: boolean,
 *  reorderOptions: boolean,
 *  archive: boolean,
 *  comment: boolean,
 *  confirmOptions: boolean,
 *  delete: boolean,
 *  edit: boolean,
 *  seeResults: boolean,
 *  seeUsernames: boolean,
 *  subscribe: boolean,
 *  view: boolean,
 *  support: boolean,
 * }
 *
 * @psalm-type InquiriesCurrentUserStatus = array {
 *     userRole: string,
 *  isLocked: boolean,
 *  isInvolved: boolean,
 *  isLoggedIn: boolean,
 *  isOwner: boolean,
 *  userId: string,
 *  orphanedSupports: int,
 *  yesSupports: int,
 *  countSupports: int,
 *  shareToken: string,
 *  groupInvitations: string[],
 * }
 *
 * @psalm-type InquiriesInquiriesStatus = array {
 *     lastInteraction: int,
 *  created: int,
 *  deleted: boolean,
 *  expired: boolean,
 *  relevantThreshold: int,
 *  countParticipants: int,
 *  countComments: int,
 *  countSupports: int,
 * }
 *
 * @psalm-type InquiriesUser = array {
 *  array: string,
 *  categories?: string[],
 *  desc?: string,
 *  displayName: string,
 *  emailAddress?: string,
 *  id: string,
 *  user?: string,
 *  isAdmin: boolean,
 *  isModerator: boolean,
 *  isOfficial: boolean,
 *  isGuest: boolean,
 *  isUnrestrictedOwner: boolean,
 *  languageCode?: string,
 *  languageCodeIntl?: string,
 *  localeCode?: string,
 *  localeCodeIntl?: string,
 *  organisation?: string,
 *  subName?: string,
 *  subtitle?: string,
 *  timeZone?: string,
 *  type: string,
 *  userId: string,
 * }
 *
 * @psalm-type InquiriesInquiryConfiguration = array {
 *  title: string,
 *  description: string,
 *  access: string,
 *  anonymous: boolean,
 *  autoReminder: boolean,
 *  expire: int,
 *  hideBookedUp: boolean,
 *  suggestionsExpire: int,
 *  showResults: string,
 *  useNo: boolean,
 *  maxSupportsPerOption: int,
 *  maxSupportsPerUser: int,
 * }
 *
 * @psalm-type     InquiriesInquiry = array {
 *   id: int,
 *   type: string,
 *   locationId: int,
 *   categoryId: int,
 *   parentId: int,
 *   descriptionSafe: string,
 *   configuration: InquiriesInquiryConfiguration,
 *   owner: InquiriesUser,
 *   moderationStatus: string,
 *   currentUserStatus: InquiriesCurrentUserStatus,
 *   permissions: InquiriesInquiryPermissions,
 *   revealPartitians: boolean,
 * }
 * @psalm-suppress UnusedClass
 */
class ResponseDefinitions
{
}
