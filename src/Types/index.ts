/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// ---------------------------------------------------------------------------
// Domain types
// ---------------------------------------------------------------------------
export * from './user.types'
export * from './inquiry.types'
export * from './option.types'
export * from './support.types'
export * from './appSettings.types'

// ---------------------------------------------------------------------------
// Voting / engine types
// ---------------------------------------------------------------------------
export type {
	BinaryResult,
	TernaryResult,
	ScoreResult,
	RankingResult,
	CondorcetResult,
	MajorityJudgmentResult,
	ReactionResult,
	ApprovalResult,
	TrendingResult,
	SupportResultData,
	SupportFeature,
	VotingEngine,
	Phase,
	VotingConfiguration,
	VotingOptions,
	SupportData,
	SupportValue,
	SupportTemplate,
} from './votingType'

export {
	ENGINE_DEFINITIONS,
	getAvailableEngines,
	initializeEngineConfig,
	isValidSupportFeature,
	isValidPhase,
} from './votingType'

// ---------------------------------------------------------------------------
// Experience types
// ---------------------------------------------------------------------------
export * from './experience.types'

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

export function createDefault<T>(): T {
	return {} as T
}

export enum Event {
	TransitionsOff = 'agora:transitions:off',
	TransitionsOn = 'agora:transitions:on',
	UpdateInquiry = 'agora:inquiry:update',
	LoadInquiry = 'agora:inquiry:load',
	SidebarChangeTab = 'agora:sidebar:changeTab',
	SidebarToggle = 'agora:sidebar:toggle',
	ChangeShares = 'agora:change:shares',
	UpdateOptions = 'agora:options:update',
	AddDate = 'agora:options:add-date',
	UpdateComments = 'agora:comments:update',
	UpdateSupports = 'agora:supports:update',
	UpdateActivity = 'agora:activity:update',
	ShowSettings = 'agora:settings:show',
}
