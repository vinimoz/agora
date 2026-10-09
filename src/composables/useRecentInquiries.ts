// SPDX-FileCopyrightText: 2026 Nextcloud contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

import { computed, type ComputedRef } from 'vue'
import { useViewableInquiries } from './useViewableInquiries'
import type { Inquiry } from '../Types'

export interface UseRecentInquiriesOptions {
  /**
   * Maximum number of items to return.
   * `0` disables truncation. Default: `5`.
   */
  limit?: number
}

/**
 * The most recent viewable inquiries, ordered by last interaction
 * (falling back to creation time when the former is missing).
 *
 * Used by the admin sidebar's "Recent inquiries" list and available to any
 * other surface that needs the same ranking.
 */
export function useRecentInquiries(
  options: UseRecentInquiriesOptions = {},
): ComputedRef<Inquiry[]> {
  const { limit = 5 } = options
  const viewable = useViewableInquiries()

  return computed(() => {
    const sorted = [...viewable.value].sort((a, b) => {
      const aTime = a.status?.lastInteraction || a.status?.created || 0
      const bTime = b.status?.lastInteraction || b.status?.created || 0
      return bTime - aTime
    })

    return limit > 0 ? sorted.slice(0, limit) : sorted
  })
}
