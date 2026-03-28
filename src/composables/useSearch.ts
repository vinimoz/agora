/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { computed, ref } from 'vue'
import { useOptionsStore } from '../stores/options'
import { useInquiriesStore } from '../stores/inquiries'
import type { Option, Inquiry } from '../Types'

export function useSearch(type: 'options' | 'inquiries', inquiryId?: number) {
  const optionsStore = useOptionsStore()
  const inquiriesStore = useInquiriesStore()

  const query = ref('')
  const results = computed<(Option | Inquiry)[]>(() => {
    const q = query.value.toLowerCase().trim()
    if (!q) return []

    if (type === 'options') {
      // Filter by inquiryId if provided
      let filtered = optionsStore.options
      if (inquiryId) {
        filtered = filtered.filter(opt => opt.targetId === inquiryId)
      }

      return filtered.filter(opt =>
        opt.id.toString().includes(q) ||
        opt.title?.toLowerCase().includes(q)
      )
    } 
      return inquiriesStore.inquiries.filter(inq =>
        inq.id.toString().includes(q) ||
        inq.title?.toLowerCase().includes(q)
      )
    
  })

  return { query, results }
}
