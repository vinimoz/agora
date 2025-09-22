/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { computed } from 'vue'
import {
  createPermissionContextForContent,
  ContentType,
  type PermissionContext,
} from '@/utils/permissions.ts'

export function useInquiryPermissions(inquiry: any) {
  const context = computed<PermissionContext>(() =>
    createPermissionContextForContent(
      ContentType.Inquiry,
      inquiry.value.ownerId,
      inquiry.value.isPublic,
      inquiry.value.isLocked,
      inquiry.value.isExpired,
      inquiry.value.deleted,
      inquiry.value.archived,
      inquiry.value.hasGroupRestrictions,
      inquiry.value.allowedGroups,
      inquiry.value.type
    )
  )

  return { context }
}
