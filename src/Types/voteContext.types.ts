// SPDX-FileCopyrightText: 2025 Nextcloud contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * The two kinds of things a voting engine can be attached to.
 *
 * - `option`  engines live on the inquiry (`engine.inquiry_id === inquiryId`)
 * - `inquiry` engines live on the inquiry group (`engine.inquiry_group_id === groupId`)
 *
 * The `parentId` you feed `useVoteContext` must match this rule:
 *   option  → pass the inquiry id
 *   inquiry → pass the group id
 */
export type TargetType = 'option' | 'inquiry'

/**
 * A shape every family layout (cards, kanban, timeline, vote) can render.
 * Both `Option` and `Inquiry` must be adaptable to this.
 */
export interface VotableItem {
  id: number
  title: string
  [key: string]: unknown
}
