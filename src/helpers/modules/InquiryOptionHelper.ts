/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { InquiryGeneralIcons, InquiryOptionIcons , StatusIcons } from '../../utils/icons.ts'
import { toRaw } from 'vue'
import type { InquiryStatus, InquiryType, OptionType } from '../../Types/index.ts'
import { useAppSettingsStore } from '../../stores/appSettings.ts'
import { t } from '@nextcloud/l10n'

/**
 * Get option item data
 * @param item
 * @param fallbackLabel
 */
export function getOptionItemData(item: OptionType | null, fallbackLabel: string = '') {
  if (!item) {
    return {
      icon: InquiryGeneralIcons.File,
      label: fallbackLabel,
      description: ''
    }
  }

  // Get icon component directly from InquiryGeneralIcons
  const iconName = item?.icon || 'File'
  
  return {
    icon: InquiryOptionIcons[iconName] || InquiryGeneralIcons.Activity,
    label: item.label || fallbackLabel,
    description: item.description || ''
  }
}

/**
 * Generate a consistent random color for a family key
 * Uses a hash of the string to always return the same color for the same family
 */
export function getRandomColorForFamily(familyKey: string): string {
    // Predefined nice colors that work well in UI
    const niceColors = [
        '#4A86E8', // Blue
        '#6AA84F', // Green
        '#F1C232', // Yellow
        '#CC0000', // Red
        '#E69138', // Orange
        '#A64D79', // Purple
        '#45818E', // Teal
        '#674EA7', // Violet
        '#3D85C6', // Sky Blue
        '#5B9B46', // Forest Green
        '#B45F06', // Brown
        '#AA00FF', // Magenta
    ]
    
    // Simple hash function to get consistent index
    let hash = 0
    for (let i = 0; i < familyKey.length; i++) {
        hash = familyKey.charCodeAt(i) + ((hash << 5) - hash)
    }
    
    // Get index from hash
    const index = Math.abs(hash) % niceColors.length
    return niceColors[index]
}

/**
 * Get family color - tries to get from config, falls back to random
 */
export function getFamilyColor(familyKey: string): string {
    // First check if we have a predefined color for common families
    const predefinedColors: Record<string, string> = {
        'debate': '#4A86E8',      // Blue
        'structure': '#3D85C6',   // Sky Blue
        'consensus': '#6AA84F',   // Green
        'decision': '#CC0000',    // Red
        'proposal': '#E69138',    // Orange
        'question': '#5B9B46',    // Forest Green
        'default': '#999999',     // Gray
    }
    
    // Check predefined first
    if (predefinedColors[familyKey]) {
        return predefinedColors[familyKey]
    }
    
    // Fallback to random but consistent color
    return getRandomColorForFamily(familyKey)
}

/**
 * Get allowed option types for an inquiry type
 * @param inquiryTypeConfig - The inquiry type configuration object
 * @param optionTypes - All available option types
 */
export function getAllowedOptionTypes(
  inquiryTypeConfig: InquiryType | undefined,
  optionTypes: OptionType[]
): OptionType[] {
  
  // Return empty array if inquiryTypeConfig is undefined
  if (!inquiryTypeConfig) {
    return []
  }

  // Convert Proxy Vue en "raw" pour éviter les problèmes avec Array.isArray
  const rawAllowed = toRaw(inquiryTypeConfig.allowed_option_type)

  let allowedOptionTypeKeys: string[] = []

  if (typeof rawAllowed === 'string') {
    try {
      const parsed = JSON.parse(rawAllowed)
      if (Array.isArray(parsed)) {
        allowedOptionTypeKeys = parsed.filter((v) => typeof v === 'string')
      }
    } catch (e) {
      console.error('Failed to parse allowed_option_type JSON:', e)
    }
  } else if (Array.isArray(rawAllowed)) {
    allowedOptionTypeKeys = rawAllowed.filter((v) => typeof v === 'string')
  }

  // Ensure we have a proper array of option types
  const rawOptionTypes = toRaw(optionTypes)
  
  let allOptionTypes: OptionType[] = []
  
  if (Array.isArray(rawOptionTypes)) {
    allOptionTypes = rawOptionTypes
  } else if (rawOptionTypes && typeof rawOptionTypes === 'object') {
    allOptionTypes = Object.values(rawOptionTypes)
  }

    // Debug to see what we're working with
  console.log('Allowed keys:', allowedOptionTypeKeys)
  console.log('Available option types full:', allOptionTypes)

  // Filtrer selon allowedOptionTypeKeys - check BOTH property names!
  const result = allOptionTypes.filter((opt) => {
    if (!opt) return false
    
    // Get the option type value - could be in option_type or optionType
    const optionTypeValue = opt.optionType
    
    return typeof optionTypeValue === 'string' && 
           allowedOptionTypeKeys.includes(optionTypeValue)
  })

  console.log('RESULT WE GET :', result)

  return result
}

/**
 * Group option types by their family
 * @param optionTypes
 */
export function groupOptionTypesByFamily(optionTypes: OptionType[]): Record<string, OptionType[]> {
  const grouped: Record<string, OptionType[]> = {}
  
  optionTypes.forEach(optionType => {
    const family = optionType.family || 'default'
    
    if (!grouped[family]) {
      grouped[family] = []
    }
    
    grouped[family].push(optionType)
  })
  
  return grouped
}


/**
 * Get the icon name for a family from appSettings
 * @param familyKey - The family key (e.g., 'debate', 'structure', etc.)
 * @returns Icon name as string
 */
export function getFamilyIconName(familyKey: string): string {
  try {
    // Try to get the store - this only works in setup context
    const appSettingsStore = useAppSettingsStore()
    return appSettingsStore?.settings?.optionFamilyTab?.[familyKey]?.icon || 'File'
  } catch (e) {
    // Store not available (called outside setup), return default
    return 'File'
  }
}

/**
 * Get the icon name for a family from appSettings
 * @param familyKey - The family key (e.g., 'debate', 'structure', etc.)
 * @returns Icon name as string
 */
export function getFamilyIconComponent(familyKey: string): any {
  const iconName = getFamilyIconName(familyKey)
  return InquiryOptionIcons[iconName] || InquiryGeneralIcons[iconName] || InquiryGeneralIcons.File
}


/**
 * Get families with their option types
 * @param inquiryTypeKey
 * @param inquiryTypes
 * @param optionTypes
 */
export function getFamiliesWithOptionTypes(
  inquiryTypeKey: string,
  inquiryTypes: InquiryType[] | Record<string, InquiryType>,
  optionTypes: OptionType[]
): Array<{
  key: string;
  name: string;
  label: string;
  description: string;
  icon: string;
  optionTypes: OptionType[];
}> {

  // Get the inquiry type config - handle both array and object
  let inquiryTypeConfig: InquiryType | undefined

  if (Array.isArray(inquiryTypes)) {
    inquiryTypeConfig = inquiryTypes.find(t => t?.inquiry_type === inquiryTypeKey)
  } else {
    inquiryTypeConfig = inquiryTypes[inquiryTypeKey]
  }

  if (!inquiryTypeConfig) {
    console.warn(`No configuration found for inquiry type "${inquiryTypeKey}"`)
    return []
  }

  // Get allowed option types
console.log(" CHHHHHHHHHHHHHHHHHHHHH ",inquiryTypeConfig)
console.log(" CHHHHHHHHHHHHHHHHHHHHH ",optionTypes)
  const allowedOptionTypes = getAllowedOptionTypes(inquiryTypeConfig, optionTypes)

  // Group by family
  const groupedByFamily = groupOptionTypesByFamily(allowedOptionTypes)

  // Convert to array format
  return Object.entries(groupedByFamily).map(([familyKey, familyOptionTypes]) => {
    // Get family data
    const fallbackData = getFamilyFallbackData()
    const fallback = fallbackData[familyKey] || fallbackData['default'] || {}

    // Try to get icon from first option type in this family
    const firstOptionType = familyOptionTypes[0]
    // Check both possible property names for icon
    const iconName = firstOptionType?.icon || fallback.icon || 'File'

    // Format label if not provided
    const formattedLabel = familyKey
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')

    return {
      key: familyKey,
      name: fallback.name || formattedLabel,
      label: fallback.label || formattedLabel,
      description: fallback.description || '',
      icon: iconName,
      optionTypes: familyOptionTypes
    }
  })
}


/**
 * Get fallback data for families
 */
export function getFamilyFallbackData(): Record<string, any> {
  return {
    'debate': {
      name: 'Debate',
      label: 'Debate',
      description: 'Debate positions, arguments, and alternatives',
      icon: 'Discussion'
    },
    'structure': {
      name: 'Structure',
      label: 'Structure',
      description: 'Structured documents with chapters and articles',
      icon: 'Settings'
    },
    'consensus': {
      name: 'Consensus',
      label: 'Consensus',
      description: 'Consultation questions and consensus building',
      icon: 'ThumbUp'
    },
    'decision': {
      name: 'Decision',
      label: 'Decision',
      description: 'Official decisions and results',
      icon: 'Checkmark'
    },
    'proposal': {
      name: 'Proposal',
      label: 'Proposal',
      description: 'Initial proposals and suggestions',
      icon: 'Lightbulb'
    },
    'default': {
      name: 'Options',
      label: 'Options',
      description: 'Various option types',
      icon: 'File'
    }
  }
}

/**
 * Get option types for specific family
 * @param familyKey
 * @param allowedOptionTypes
 */
export function getOptionTypesForFamily(
  familyKey: string,
  allowedOptionTypes: OptionType[]
): OptionType[] {
  return allowedOptionTypes.filter(optionType => 
    optionType.family === familyKey
  )
}

/**
 * Get option type options for radio/select components
 * @param optionTypes
 */
export function getOptionTypeOptions(optionTypes: OptionType[]) {
  return optionTypes.map(type => ({
    value: type.option_type,
    label: type.label,
    description: type.description,
    icon: type.icon
  }))
}

/**
 * Get option type from list by type string
 */
export function findOptionType(
  optionType: string | null | undefined,
  optionTypes: any[]
): any | null {
  if (!optionType || !optionTypes?.length) return null

  return optionTypes.find(opt =>
    opt.option_type === optionType || opt.optionType === optionType
  ) || null
}

/**
 * Get option type label safely
 */
export function getOptionTypeLabel(
  optionType: string | null | undefined,
  optionTypes: any[],
  fallback: string = 'Option'
): string {
  if (!optionType) return fallback
  const found = findOptionType(optionType, optionTypes)
  return found?.label || optionType || fallback
}

/**
 * Get option type icon component safely
 */
export function getOptionTypeIconComponent(
  optionType: string | null | undefined,
  optionTypes: any[]
): any {
  if (!optionType) return InquiryOptionIcons.File

  const found = findOptionType(optionType, optionTypes)
  const iconName = found?.icon || 'File'

  return InquiryOptionIcons[iconName] || InquiryOptionIcons.File
}

/**
 * Get option type icon name as string
 */
export function getOptionTypeIconName(
  optionType: string | null | undefined,
  optionTypes: any[]
): string {
  if (!optionType) return 'File'
  const found = findOptionType(optionType, optionTypes)
  return found?.icon || 'File'
}

/**
 * Get option type description safely
 */
export function getOptionTypeDescription(
  optionType: string | null | undefined,
  optionTypes: any[]
): string {
  if (!optionType) return ''
  const found = findOptionType(optionType, optionTypes)
  return found?.description || found?.text || ''
}

/**
 * Get option type family safely
 */
export function getOptionTypeFamily(
  optionType: string | null | undefined,
  optionTypes: any[]
): string {
  if (!optionType) return 'default'
  const found = findOptionType(optionType, optionTypes)
  return found?.family || 'default'
}

/**
 * Get option type color based on family
 */
export function getOptionTypeColor(
  optionType: string | null | undefined,
  optionTypes: any[]
): string {
  const family = getOptionTypeFamily(optionType, optionTypes)
  return getFamilyColor(family)
}

/**
 * Get allowed responses for an option type
 */
export function getAllowedResponses(
  optionType: string | null | undefined,
  optionTypes: any[]
): string[] {
  if (!optionType) return []

  const found = findOptionType(optionType, optionTypes)
  if (!found) return []
  console.log(" FIND OPTOON TYPE ",found)
  let responses: string[] = []

  if (typeof found.allowed_response === 'string') {
    try {
      const parsed = JSON.parse(found.allowed_response)
      if (Array.isArray(parsed)) {
        responses = parsed.filter((v) => typeof v === 'string')
      }
    } catch (e) {
      console.error('Failed to parse allowed_response JSON:', e)
    }
  } else if (Array.isArray(found.allowed_response)) {
    responses = found.allowed_response.filter((v) => typeof v === 'string')
  }

  return responses
}

/**
 * Get available response types with full data
 */
export function getAvailableResponseTypes(
  optionType: string | null | undefined,
  allOptionTypes: any[]
): Array<{
  option_type: string
  label: string
  icon: string
  description?: string
}> {
  const allowedKeys = getAllowedResponses(optionType, allOptionTypes)
  console.log(" RESPONSE KEY ",optionType)
  console.log(" RESPONSE KEY ",allowedKeys)
  return allowedKeys
    .map(key => {
      const found = findOptionType(key, allOptionTypes)
      return {
        option_type: key,
        label: found?.label || key,
        icon: found?.icon || 'File',
        description: found?.description || found?.text || ''
      }
    })
    .sort((a, b) => a.label.localeCompare(b.label))
}

/**
 * Get additional fields for an option type
 */
export function getOptionTypeFields(
  optionType: string | null | undefined,
  optionTypes: any[]
): any[] {
  if (!optionType) return []

  const found = findOptionType(optionType, optionTypes)
  if (!found?.fields) return []

  if (typeof found.fields === 'string') {
    try {
      return JSON.parse(found.fields)
    } catch {
      return []
    }
  }

  return found.fields || []
}

/**
 * Check if option type has support feature
 */
export function hasSupportFeature(
  optionType: string | null | undefined,
  optionTypes: any[]
): boolean {
  if (!optionType) return false
  const found = findOptionType(optionType, optionTypes)
  const feature = found?.support_feature
  return feature && feature !== 'none'
}

/**
 * Get support feature label
 */
export function getSupportFeatureLabel(
  optionType: string | null | undefined,
  optionTypes: any[]
): string {
  if (!optionType) return ''
  const found = findOptionType(optionType, optionTypes)
  const feature = found?.support_feature

  if (feature === 'ternary') return t('agora', 'Ternary support (for/against/neutral)')
  if (feature === 'binary') return t('agora', 'Binary support (like/dislike)')
  if (feature && feature !== 'none') return t('agora', 'Support enabled')
  return ''
}

/**
 * Check if option type allows comments
 */
export function allowsComments(
  optionType: string | null | undefined,
  optionTypes: any[]
): boolean {
  if (!optionType) return false
  const found = findOptionType(optionType, optionTypes)
  return found?.allow_comment || false
}

/**
 * Check if option type uses title
 */
export function usesTitle(
  optionType: string | null | undefined,
  optionTypes: any[]
): boolean {
  if (!optionType) return true
  const found = findOptionType(optionType, optionTypes)
  return found?.use_title !== false
}

