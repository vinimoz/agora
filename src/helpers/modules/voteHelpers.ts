/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { EngineConfig, VotingConfiguration, VotingEngine, SupportFeature } from '../Types/index'

export function createEngineConfig(engineType: string, customConfig?: Partial<EngineConfig>): EngineConfig {
  const defaultConfigs: Record<string, EngineConfig> = {
    binary: {},
    ternary: {},
    reaction: { allowed_reactions: ['👍', '👎', '❤️', '😂', '😢'] },
    score: { min: 0, max: 10 },
    approval: { min_choices: 1, max_choices: null },
    ranked: { max_rank: null },
    majority_judgment: { grades: ['Reject', 'Poor', 'Fair', 'Good', 'Excellent'] },
    quadratic: { credits_per_user: 100 },
    token_weighted: { normalization: 'none', weight_source: null }
  }
  
  return { ...defaultConfigs[engineType], ...customConfig }
}

export function createVotingConfiguration(
  supportFeature: SupportFeature,
  engineType: string | null,
  options?: VotingConfiguration['options']
): VotingConfiguration {
  return {
    supportFeature,
    votingEngine: engineType as VotingEngine,
    mode: 'voting',
    options
  }
}

export function isValidEngineConfig(config: unknown): config is EngineConfig {
  if (!config || typeof config !== 'object') return false
  const cfg = config as Record<string, unknown>
  
  // Check for valid properties based on engine type
  const validProps = ['min_choices', 'max_choices', 'max_rank', 'min', 'max', 'grades', 'allowed_reactions', 'method', 'credits_per_user', 'weight_source', 'normalization']
  
  return Object.keys(cfg).every(key => validProps.includes(key))
}
