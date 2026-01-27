/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { InquiryGeneralIcons } from '../utils/icons.ts'

export interface OptionFamily {
  key: string
  name: string
  label: string
  description: string
  icon: string
  color: string
  iconComponent: any
}

// Unified family definitions
export const OPTION_FAMILIES: Record<string, OptionFamily> = {
  'debate': {
    key: 'debate',
    name: 'Debate',
    label: 'Debate',
    description: 'Debate positions, arguments, and alternatives',
    icon: 'Discussion',
    color: '#6aa84f',
    iconComponent: InquiryGeneralIcons.Discussion
  },
  'structure': {
    key: 'structure',
    name: 'Structure',
    label: 'Structure',
    description: 'Structured documents with chapters and articles',
    icon: 'Settings',
    color: '#3c8dbc',
    iconComponent: InquiryGeneralIcons.Settings
  },
  'consensus': {
    key: 'consensus',
    name: 'Consensus',
    label: 'Consensus',
    description: 'Consultation questions and consensus building',
    icon: 'ThumbUp',
    color: '#f1c232',
    iconComponent: InquiryGeneralIcons.ThumbUp
  },
  'decision': {
    key: 'decision',
    name: 'Decision',
    label: 'Decision',
    description: 'Official decisions and results',
    icon: 'Checkmark',
    color: '#cc0000',
    iconComponent: InquiryGeneralIcons.Checkmark
  },
  'proposal': {
    key: 'proposal',
    name: 'Proposal',
    label: 'Proposal',
    description: 'Initial proposals and suggestions',
    icon: 'Lightbulb',
    color: '#e69138',
    iconComponent: InquiryGeneralIcons.Lightbulb
  },
  'question': {
    key: 'question',
    name: 'Question',
    label: 'Question',
    description: 'Questions and polls',
    icon: 'Question',
    color: '#6aa84f',
    iconComponent: InquiryGeneralIcons.Question
  },
}

// Default family for fallback
export const DEFAULT_FAMILY: OptionFamily = {
  key: 'default',
  name: 'Options',
  label: 'Options',
  description: 'Various option types',
  icon: 'File',
  color: '#999999',
  iconComponent: InquiryGeneralIcons.File
}

/**
 * Get family by key
 */
export function getFamily(key: string): OptionFamily {
  return OPTION_FAMILIES[key] || DEFAULT_FAMILY
}

/**
 * Get all families as array
 */
export function getAllFamilies(): OptionFamily[] {
  return Object.values(OPTION_FAMILIES)
}

/**
 * Get family keys
 */
export function getFamilyKeys(): string[] {
  return Object.keys(OPTION_FAMILIES)
}

/**
 * Check if family exists
 */
export function hasFamily(key: string): boolean {
  return key in OPTION_FAMILIES
}
