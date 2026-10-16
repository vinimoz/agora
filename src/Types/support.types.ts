/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type {
	SupportResultData,
	SupportValue,
	SupportFeature,
	Phase,
} from './votingType'

// ============================================================================
// SUPPORT ENGINE
// ============================================================================

export type SupportEngineTarget = 'inquiry' | 'option'
export type SupportResultType = SupportResultData['type']

export interface SupportEngine {
	id: number
	engine: string                 // voting engine type (binary, score, ranking, …)
	purpose: string                // support purpose
	title: string
	description: string
	inquiry_group_id: number
	inquiry_id: number
	status: 'draft' | 'active' | 'closed'
	config: Record<string, unknown>
	created: number

	// Scope: applies to inquiries OR options
	target_type: SupportEngineTarget
	target_ids: number[]

	metadata?: {
		phase?: Phase
		started_at?: number
		ended_at?: number
		quorum?: number
		participation_threshold?: number
	}
}

// ============================================================================
// SUPPORT RESULTS
// ============================================================================

export interface SupportResult {
	id: number
	support_engine_id: number | null
	target_type: SupportEngineTarget
	target_id: number
	result: SupportResultData
	updated: number
}

// ============================================================================
// SUPPORT ITEM (raw row)
// ============================================================================

export type Support = {
	id?: number
	inquiryId: number
	optionId: number
	userId: string
	value: SupportValue
	weight: number
	created: number
	updated?: number
	supportEngineId?: number
}

// ============================================================================
// SUPPORTABLE ITEM (anything that can be voted on)
// ============================================================================

export interface SupportableItem {
	id: number
	configuration?: {
		supportFeature?: SupportFeature
		grades?: string[]
	}
	currentUserStatus?: {
		supportValue?: SupportValue
		hasSupported?: boolean
	}
	status?: {
		countSupports?: number
		supportResult?: SupportResultData
	}
}
