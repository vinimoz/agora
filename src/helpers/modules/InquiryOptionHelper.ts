/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { InquiryGeneralIcons } from '../../utils/icons.ts'
import type { InquiryType, OptionType } from '../../Types/index.ts'

/**
 * Get option item data
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
  const iconComponent = InquiryGeneralIcons[iconName] || InquiryGeneralIcons.File
  
  return {
    icon: iconComponent,
    label: item.label || fallbackLabel,
    description: item.description || ''
  }
}

/**
 * Get option type data from type string
 */
export function getOptionTypeData(optionTypeKey: string, optionTypes: OptionType[], fallbackLabel: string = '') {
  const typeInfo = optionTypes.find(t => t.option_type === optionTypeKey)
  return getOptionItemData(typeInfo, fallbackLabel || optionTypeKey)
}

/**
 * Get allowed option types for an inquiry type
 */
export function getAllowedOptionTypes(
  inquiryTypeKey: string,
  inquiryTypes: InquiryType[],
  optionTypes: OptionType[]
): OptionType[] {
  // First find the inquiry type configuration
  const inquiryTypeConfig = inquiryTypes.find(t => t.inquiry_type === inquiryTypeKey)

  if (!inquiryTypeConfig?.allowed_option_type) {
    return []
  }

  // Parse allowed_option_type if it's a string (JSON)
  let allowedOptionTypeKeys: string[] = []
  if (typeof inquiryTypeConfig.allowed_option_type === 'string') {
    try {
      allowedOptionTypeKeys = JSON.parse(inquiryTypeConfig.allowed_option_type)
    } catch {
      allowedOptionTypeKeys = []
    }
  } else if (Array.isArray(inquiryTypeConfig.allowed_option_type)) {
    allowedOptionTypeKeys = inquiryTypeConfig.allowed_option_type
  }

  // Map keys to OptionType objects
  const result: OptionType[] = []

  for (const key of allowedOptionTypeKeys) {
    // Try to find the option type - check multiple possible fields
    const optionType = optionTypes.find(opt =>
      opt.option_type === key || // Try option_type
      opt.optionType === key     // Try optionType (from your data)
    )

    if (optionType) {
      // Ensure option_type field is set
      const optionWithType = {
        ...optionType,
        option_type: optionType.option_type || optionType.optionType || key
      }
      result.push(optionWithType)
    } else {
      console.warn(`Option type "${key}" not found in inquiryOptionTypeTab`)
    }
  }

  return result
}

/**
 * Group option types by their family
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
 * Get families with their option types
 */
export function getFamiliesWithOptionTypes(
  inquiryTypeKey: string,
  inquiryTypes: InquiryType[],
  optionTypes: OptionType[]
): Array<{
  key: string;
  name: string;
  label: string;
  description: string;
  icon: string;
  optionTypes: OptionType[];
}> {
  // Get allowed option types
  const allowedOptionTypes = getAllowedOptionTypes(inquiryTypeKey, inquiryTypes, optionTypes)
  
  // Group by family
  const groupedByFamily = groupOptionTypesByFamily(allowedOptionTypes)
  
  // Convert to array format
  return Object.entries(groupedByFamily).map(([familyKey, familyOptionTypes]) => {
    // Get family data
    const fallbackData = getFamilyFallbackData()
    const fallback = fallbackData[familyKey] || {}
    
    // Try to get icon from first option type in this family
    const firstOptionType = familyOptionTypes[0]
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
    'deliberative': {
      name: 'Deliberative',
      label: 'Deliberative',
      description: 'Suggestion to solve or refine an objection or debate argument.',
      icon: 'Lightbulb'
    },
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
    'reactive': {
      name: 'Reactive',
      label: 'Reactive',
      description: 'Reactive suggestions and responses',
      icon: 'Bolt'
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
 * Get family icon component
 */
export function getFamilyIconComponent(familyKey: string): any {
  const familyIcons: Record<string, any> = {
    'deliberative': InquiryGeneralIcons.Lightbulb,
    'debate': InquiryGeneralIcons.Discussion,
    'structure': InquiryGeneralIcons.Settings,
    'consensus': InquiryGeneralIcons.ThumbUp,
    'decision': InquiryGeneralIcons.Checkmark,
    'proposal': InquiryGeneralIcons.Lightbulb,
    'reactive': InquiryGeneralIcons.Bolt,
    'default': InquiryGeneralIcons.File
  }
  
  return familyIcons[familyKey] || familyIcons.default
}

/**
 * Get family color
 */
export function getFamilyColor(familyKey: string): string {
  const familyColors: Record<string, string> = {
    'deliberative': '#4a86e8',
    'debate': '#6aa84f',
    'structure': '#3c8dbc',
    'consensus': '#f1c232',
    'decision': '#cc0000',
    'proposal': '#e69138',
    'reactive': '#674ea7',
    'default': '#999999'
  }
  
  return familyColors[familyKey] || familyColors.default
}

/**
 * Get option types for specific family
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
 */
export function getOptionTypeOptions(optionTypes: OptionType[]) {
  return optionTypes.map(type => ({
    value: type.option_type,
    label: type.label,
    description: type.description,
    icon: type.icon
  }))
}

