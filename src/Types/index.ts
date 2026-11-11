/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

// ─── Domain types ────────────────────────────────────────────
export * from "./user.types";
export * from "./inquiry.types";
export * from "./option.types";
export * from "./support.types";
export * from "./appSettings.types";
export * from "./comments.types";
export * from "./activity.types";
export * from "./share.types";

// ─── Group types ─────────────────────────────────────────────
export type {
  InquiryGroup,
  InquiryGroupType,
  InquiryGroupConfiguration,
  InquiryGroupStatus,
  InquiryGroupWorkflowStatus,
  InquiryGroupUIConfig,
  InquiryGroupPermissions,
  CurrentUserInquiryGroupStatus,
  VisibilityInquiryGroupType,
} from "./inquiryGroups.types";

// ─── Voting / engine types ───────────────────────────────────
export type {
  // Result shapes
  BinaryResult,
  TernaryResult,
  ScoreResult,
  StarResult,
  RankingResult,
  CondorcetResult,
  MajorityJudgmentResult,
  ReactionResult,
  ApprovalResult,
  ApprovalDelibResult,
  TrendingResult,
  BordaResult,
  QuadraticResult,
  TokenWeightedResult,
  PhasedVotingResult,
  SupportResultData,

  // Support primitives
  SupportFeature,
  SupportValue,
  SupportData,
  SupportTemplate,
  VotingEngine,
  VotingConfiguration,
  VotingOptions,
  Phase,

  // Engine metadata
  EngineDefinition,
  EngineInfo,
  ConfigSchemaField,
} from "./votingType";

export {
  ENGINE_DEFINITIONS,
  getAvailableEngines,
  initializeEngineConfig,
  isValidSupportFeature,
  isValidPhase,
} from "./votingType";

// ─── Experience types ────────────────────────────────────────
export * from "./experience.types";

// ─── Utilities ───────────────────────────────────────────────
export function createDefault<T>(): T {
  return {} as T;
}

// ============================================================================

export type KanbanStatusField =
  | "publicationStatus"
  | "moderationStatus"
  | "inquiryStatus"
  | "optionStatus"
  | "workflowStatus";

export type KanbanMode = "organization" | "status";

export type KanbanColumn = {
  value: string;
  label: string;
  color?: string;
};

export type KanbanPermissions = {
  /** Can the user see the board at all */
  view: boolean;
  /** Can the user drag cards */
  move: boolean;
  /** Can the user change the underlying status (vs. visual only) */
  changeStatus: boolean;
};

export type KanbanFilters = {
  types?: string[];
  families?: string[];
};

export type KanbanDefinition = {
  /** Which status field drives the columns (belongs to the board, not the family) */
  statusField: KanbanStatusField;
  /** Explicit column override; when omitted, derived from the status field */
  columns?: KanbanColumn[];
  /** organization = visual only, status = drag updates the status */
  mode: KanbanMode;
  permissions?: Partial<KanbanPermissions>;
  filters?: KanbanFilters;
};

/** A status entry as stored on a family (InquiryFamily / OptionFamily) */
export type FamilyStatus = {
  value: string;
  label: string;
  color?: string;
};

export type MiscUpdateMap = Record<string, unknown>;

export enum Event {
  TransitionsOff = "agora:transitions:off",
  TransitionsOn = "agora:transitions:on",
  UpdateInquiry = "agora:inquiry:update",
  LoadInquiry = "agora:inquiry:load",
  SidebarChangeTab = "agora:sidebar:changeTab",
  SidebarToggle = "agora:sidebar:toggle",
  ChangeShares = "agora:change:shares",
  UpdateOptions = "agora:options:update",
  AddDate = "agora:options:add-date",
  UpdateComments = "agora:comments:update",
  UpdateSupports = "agora:supports:update",
  UpdateActivity = "agora:activity:update",
  ShowSettings = "agora:settings:show",
}
