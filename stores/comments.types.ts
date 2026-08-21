/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { User } from '../Types'

export type Comment = {
	id: number
	inquiryId: number
	optionId: number  
	userId: string
	comment: string
	timestamp: number
	deleted: number
	confidential: number
	recipient: string | null
	user: User
}

export type ShortComment = {
	comment: string
	deleted: number
	id: number
}

export interface CommentsGrouped extends Comment {
	comments: Comment[]
}

export type CommentsStore = {
	comments: Comment[]
}
