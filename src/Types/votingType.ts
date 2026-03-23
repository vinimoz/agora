// types/VotingTypes.ts
// SPDX-FileCopyrightText: 2018-2025 Nextcloud contributors
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * 🟢 INFORMAL SUPPORT FEATURES
 * Used for perception, engagement, feedback (deliberation phase)
 */
export type SupportFeature =
  | 'binary'           // 👍 Yes / No – Simple binary choice
  | 'ternary'          // ⚖️ For / Abstain / Against – More nuanced
  | 'reaction'         // ❤️ Emotional reactions (👍, 😡, 😂, 😢, ❤️, …)
  | 'star'             // ⭐ Rating 1–5 stars – Perceived quality
  | 'score'            // 🔢 Free score 0–10 – More precise than stars
  | 'majority_judgment' // 🧠 Grades (Reject → Excellent) – Powerful even informally
  | 'approval'         // ✅ Multi‑select – Simple exploration
  | 'ranking'          // 📊 Top 3 / Top 5 – Quick prioritisation
  | 'trending'         // 🔥 Popularity (votes + activity) – Reddit‑style
  | 'none'             // ⛔ No support – Pure discussion

/**
 * 🔵 FORMAL VOTING ENGINES (to be implemented later)
 */
export type VotingEngine =
  | 'binary_voting'
  | 'ternary_voting'
  | 'star_voting'
  | 'majority_judgment'
  | 'approval_voting'
  | 'score_voting'
  | 'ranked_choice'
  | 'borda_count'
  | 'condorcet'
  | 'nauru'
  | 'schulze'
  | 'copeland'
  | 'quadratic'
  | 'token_weighted'
  | 'phased_voting'

/**
 * 🟣 INQUIRY MODES
 */
export type InquiryMode =
  | 'deliberative'    // 🔁 Discussion / support only
  | 'voting'          // 🗳 Formal voting only
  | 'hybrid'          // 💥 Deliberation → Vote
  | 'filtration'      // 📊 Top selection → final vote
  | 'progressive'     // 🧠 Iterative consensus
  | 'liquid'          // 🏛 Liquid democracy

/**
 * 🎯 VOTING CONFIGURATION (embedded in Inquiry / Option)
 */
export interface VotingConfiguration {
  /** Informal feature used during deliberation */
  supportFeature: SupportFeature
  /** Formal engine used during voting (null if not applicable) */
  votingEngine: VotingEngine | null
  /** Current mode of the inquiry */
  mode: InquiryMode
  /** Feature‑specific options */
  options?: VotingOptions
}

/**
 * ⚙️ FEATURE‑SPECIFIC OPTIONS
 */
export interface VotingOptions {
  // For scales (star, score, majority judgment, etc.)
  scale?: {
    min: number
    max: number
    labels?: Record<number, string> // e.g. {0: "Reject", 5: "Excellent"}
  }
  // For majority judgment grades
  grades?: {
    values: number[]
    labels: string[]  // ["Reject", "Poor", "Acceptable", "Good", "Very Good", "Excellent"]
  }
  // For reaction support
  reactions?: {
    available: string[]      // e.g. ["👍", "❤️", "😡", "😂", "😢"]
    maxPerUser?: number      // null = unlimited
  }
  // For ranking / prioritisation
  ranking?: {
    maxChoices: number       // e.g. 3 for Top 3
    allowTies: boolean
  }
  // For approval
  approval?: {
    maxChoices: number | null // null = unlimited
  }
  // For quadratic voting (future)
  quadratic?: {
    creditsPerUser: number
    costFunction: 'square' | 'custom'
  }
  // For token‑weighted voting (future)
  tokenWeighted?: {
    tokenType: string
    minBalance: number
    weightFormula: 'linear' | 'sqrt' | 'log'
  }
  // For phased voting (future)
  phased?: {
    rounds: number
    eliminationRule: 'bottom' | 'threshold'
    threshold?: number
  }
  // Quorum requirements
  quorum?: {
    type: 'count' | 'percentage' | 'token'
    value: number
    scope: 'global' | 'group'
  }
}

/**
 * 📊 SUPPORT DATA STRUCTURE (matches existing `Support` type in store)
 */
export interface SupportData {
  id?: number
  inquiryId: number
  optionId?: number // 0 or undefined = inquiry support
  groupId: number
  userId: string
  value: number | string | string[] | null // interpretable value
  created: number
  metadata?: {
    reaction?: string
    weight?: number
    delegation?: string
  }
}

/**
 * 📈 VOTING RESULTS (for display)
 */
export interface VotingResults {
  raw: any
  aggregates: {
    total: number
    participation: number
    quorumReached: boolean
  }
  specifics: {
    counts?: Record<string | number, number>
    percentages?: Record<string | number, number>
    average?: number
    median?: number
    distribution?: Record<number, number>
    rankings?: Array<{ optionId: string; score: number; rank: number }>
    pairwiseMatrix?: Record<string, Record<string, number>>
    condorcetWinner?: string | null
    medianGrade?: number
    gradesDistribution?: Record<number, number>
    totalCreditsSpent?: number
    costPerOption?: Record<string, number>
  }
}

// Type guard
export function isValidSupportFeature(feature: string): feature is SupportFeature {
  return ['binary', 'ternary', 'reaction', 'star', 'score', 'majority_judgment', 'approval', 'ranking', 'trending', 'none'].includes(feature)
}
