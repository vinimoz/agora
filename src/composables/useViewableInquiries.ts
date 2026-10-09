// SPDX-FileCopyrightText: 2026 Nextcloud contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed, type ComputedRef } from 'vue'
import { useInquiriesStore } from '../stores/inquiries'
import type { Inquiry } from '../Types'

/**
 * Non-archived inquiries that the current user is allowed to view.
 *
 * This is the base set every consumer builds on — sorting, pagination and
 * additional filtering are layered on top by the caller. Centralising the
 * predicate here avoids drift between the sidebar, the landing and any
 * future surface that needs the same baseline.
 */
export function useViewableInquiries(): ComputedRef<Inquiry[]> {
  const inquiriesStore = useInquiriesStore()

  return computed(() =>
    inquiriesStore.inquiries.filter(
      (i) => !i.status?.isArchived && i.permissions?.view === true,
    ),
  )
}
