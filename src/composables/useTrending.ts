/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { useSupportsStore } from '../stores/supports'
import { useCommentsStore } from '../stores/comments'
import { useOptionsStore } from '../stores/options'

export function useTrending(inquiryId: number) {
  const supportsStore = useSupportsStore()
  const commentsStore = useCommentsStore()
  const optionsStore = useOptionsStore()

  const calculateTrendingScore = (optionId: number): number => {
    const option = optionsStore.options.find(o => o.id === optionId)
    if (!option) return 0

    // 1. Vote score (40%)
    const optionSupports = supportsStore.getOptionSupports(inquiryId, optionId)
    let voteScore = 0
    if (optionSupports.length > 0) {
      // Normalize support values to a 0-100 scale based on engine type
      const values = optionSupports.map(s => {
        const v = s.value
        if (typeof v === 'number') return Math.min(100, Math.max(0, v * 10)) // rough normalization
        if (typeof v === 'string') return 100 // any reaction counts as positive
        return 0
      })
      const total = values.reduce((a, b) => a + b, 0)
      voteScore = Math.min(100, (total / optionSupports.length) * 100)
    }

    // 2. Comment score (30%)
    const comments = commentsStore.comments.filter(c => c.optionId === optionId && c.deleted !== 1)
    let commentScore = 0
    if (comments.length > 0) {
      commentScore = Math.min(100, Math.log2(comments.length + 1) * 25)
    }

    // 3. Recency score (20%)
    const ageInDays = (Date.now() - (option.created || 0)) / (1000 * 3600 * 24)
    const recencyScore = Math.max(0, 100 - ageInDays * 10)

    // 4. Engagement score (10%)
    const uniqueUserIds = new Set([
      ...optionSupports.map(s => s.userId),
      ...comments.map(c => c.userId)
    ])
    const totalParticipants = uniqueUserIds.size
    const engagementScore = Math.min(100, totalParticipants * 10)

    // Weighted total
    return Math.round(
      voteScore * 0.4 +
      commentScore * 0.3 +
      recencyScore * 0.2 +
      engagementScore * 0.1
    )
  }

  return { calculateTrendingScore }
}
