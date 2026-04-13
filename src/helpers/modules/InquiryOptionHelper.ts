/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { InquiryGeneralIcons, InquiryOptionIcons } from '../../utils/icons.ts'
import { toRaw } from 'vue'
import type { InquiryType, InquiryOptionType, OptionFamily } from '../../Types/index.ts'
import { useAppSettingsStore } from '../../stores/appSettings.ts'
import { t } from '@nextcloud/l10n'
import type { Component } from 'vue'
import type { useOptionsStore } from '@/stores/options'

type OptionsStore = ReturnType<typeof useOptionsStore>


/**
 * Get option item data
 * @param item
 * @param fallbackLabel
 */
export function getOptionItemData(item: InquiryOptionType | null, fallbackLabel: string = '') {
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
 * @param familyKey
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
 * @param familyKey
 */
export function getFamilyColor(familyKey: string): string {
    // First check if we have a predefined color for common families
    const predefinedColors: Record<string, string> = {
        'debate': '#4A86E8',      // Blue
        'structure': '#3D85C6',   // Sky Blue
        'consensus': '#6AA84F',   // Green
        'decision': '#CC0000',    // Red
        'proposal': '#E69138',    // Orange
        'workflow': '#A64D79',    // Purple
        'process': '#45818E',     // Teal
        'vote': '#4A818E',     // Teal
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
  optionTypes: InquiryOptionType[]
): InquiryOptionType[] {
  
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
  
  let allOptionTypes: InquiryOptionType[] = []
  
  if (Array.isArray(rawOptionTypes)) {
    allOptionTypes = rawOptionTypes
  } else if (rawOptionTypes && typeof rawOptionTypes === 'object') {
    allOptionTypes = Object.values(rawOptionTypes)
  }

  // Filtrer selon allowedOptionTypeKeys - check BOTH property names!
  const result = allOptionTypes.filter((opt) => {
    if (!opt) return false
    
    // Get the option type value - could be in option_type or optionType
    const optionTypeValue = opt.option_type
    
    return typeof optionTypeValue === 'string' && 
           allowedOptionTypeKeys.includes(optionTypeValue)
  })

  return result
}

/**
 * Group option types by their family
 * @param optionTypes
 */
export function groupOptionTypesByFamily(optionTypes: InquiryOptionType[]): Record<string, InquiryOptionType[]> {
  const grouped: Record<string, InquiryOptionType[]> = {}
  
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
 * @return Icon name as string
 */
export function getFamilyIconName(familyKey: string): string {
  try {
    // Try to get the store - this only works in setup context
    const appSettingsStore = useAppSettingsStore()
        
    // Check if optionFamilyTab exists and is an array
    if (appSettingsStore?.optionFamilyTab && Array.isArray(appSettingsStore.optionFamilyTab)) {
      // Find the family config by family_type
      const familyConfig = appSettingsStore.optionFamilyTab.find(
    (item: FamilyConfig) => item?.family_type === familyKey  
    )
      if (familyConfig?.icon) {
        return familyConfig.icon
      }
    }
      
    // If not found in appSettings, try fallback data
    const fallbackData = getFamilyFallbackData()
    const fallback = fallbackData[familyKey] || fallbackData.default
    if (fallback?.icon) {
      return fallback.icon
    }
    
    return 'File'
  } catch (error) {
    // Store not available (called outside setup), return default
    console.error('Error getting family icon:', error)
    return 'File'
  }
}


/**
 * Get the icon component for a family
 * @param familyKey - The family key
 */
export function getFamilyIconComponent(familyKey: string): Component {
  const iconName = getFamilyIconName(familyKey)
  
  return InquiryOptionIcons[iconName] || InquiryGeneralIcons[iconName] || InquiryGeneralIcons.File
}


/**
 * Get family UI configuration
 * @param familyKey
 * @param familyData
 */
export function getFamilyUIConfig(
  familyKey: string,
  familyData?: OptionFamily
): Record<string, unknown> {
  const defaultUIConfig: Record<string, unknown> = {
    layout: getLayoutForFamily(familyKey)
  }

  // Try to get from familyData first
  if (familyData?.ui) {
    return { ...defaultUIConfig, ...familyData.ui }
  }

  // Try to get from appSettings
  try {
    const appSettingsStore = useAppSettingsStore()
    const storedUI = appSettingsStore?.optionFamilyTab?.[familyKey]?.ui
    if (storedUI) {
      return { ...defaultUIConfig, ...storedUI }
    }
  } catch {
    // Store not available
  }

  return defaultUIConfig
}

/**
 * Get family rules
 * @param familyKey
 * @param familyData
 */
export function getFamilyRules(
  familyKey: string,
  familyData?: OptionFamily
): Record<string, unknown> {
  if (familyData?.rules) {
    return familyData.rules
  }

  try {
    const appSettingsStore = useAppSettingsStore()
    const storedRules = appSettingsStore?.optionFamilyTab?.[familyKey]?.rules
    if (storedRules) {
      return storedRules
    }
  } catch {
    // Store not available
  }

  return {}
}

/**
 * Get family features (global capabilities)
 * @param familyKey
 * @param familyData
 */
export function getFamilyFeatures(
  familyKey: string,
  familyData?: OptionFamily
): string[] {
  if (familyData?.features) {
    return familyData.features
  }

  try {
    const appSettingsStore = useAppSettingsStore()
    const storedFeatures = appSettingsStore?.optionFamilyTab?.[familyKey]?.features
    if (storedFeatures) {
      return storedFeatures
    }
  } catch {
    // Store not available
  }

  return []
}

/**
 * Get family actions (UI buttons/operations available at family level)
 * @param familyKey
 * @param familyData
 */
export function getFamilyActions(
  familyKey: string,
  familyData?: OptionFamily
): Array<{ key: string; label: string; icon?: string }> {
  if (familyData?.actions) {
    return familyData.actions
  }

  try {
    const appSettingsStore = useAppSettingsStore()
    const storedActions = appSettingsStore?.optionFamilyTab?.[familyKey]?.actions
    if (storedActions) {
      return storedActions
    }
  } catch {
    // Store not available
  }

  return []
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
  optionTypes: InquiryOptionType[]
): Array<{
  key: string;
  name: string;
  label: string;
  description: string;
  icon: string;
  ui: Record<string, unknown>;
  rules: Record<string, unknown>;
  features: string[];
  actions: Array<{ key: string; label: string; icon?: string }>;
  optionTypes: InquiryOptionType[];
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
  const allowedOptionTypes = getAllowedOptionTypes(inquiryTypeConfig, optionTypes)

  // Group by family
  const groupedByFamily = groupOptionTypesByFamily(allowedOptionTypes)

  // Get app settings store (try-catch in case called outside setup)
  let appSettingsStore: unknown = null
  try {
    appSettingsStore = useAppSettingsStore()
  } catch {
    // Store not available
  }

  // Get fallback data as backup
  const fallbackData = getFamilyFallbackData()

  // Convert to array format
  return Object.entries(groupedByFamily).map(([familyKey, familyOptionTypes]) => {
    
    // PRIORITY 1: Get from appSettings.optionFamilyTab if available
    let familyConfig = null
    if (appSettingsStore?.optionFamilyTab) {
      // Find the family config by family_type
      familyConfig = appSettingsStore.optionFamilyTab.find(
        (item: unknown) => item.family_type === familyKey
      )
    }
    
    // PRIORITY 2: Get from fallback data
    const fallback = fallbackData[familyKey] || fallbackData.default || {}

    // Try to get icon from first option type in this family (lowest priority)
    const firstOptionType = familyOptionTypes[0]
    
    // Determine icon in priority order:
    // 1. From app settings config
    // 2. From fallback data
    // 3. From first option type
    // 4. Default 'File'
    const iconName = familyConfig?.icon || fallback.icon || firstOptionType?.icon || 'File'

    // Format label if not provided
    const formattedLabel = familyKey
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')

    // Build family data with priority: appSettings > fallback > defaults
    const familyData: OptionFamily = {
      key: familyKey,
      name: familyConfig?.label || fallback.name || formattedLabel,
      label: familyConfig?.label || fallback.label || formattedLabel,
      description: familyConfig?.description || fallback.description || '',
      icon: iconName,
      // Use app settings data if available, otherwise fallback
      ui: familyConfig?.ui || fallback.ui,
      rules: familyConfig?.rules || fallback.rules,
      features: familyConfig?.features || fallback.features,
      actions: familyConfig?.actions || fallback.actions
    }

    return {
      key: familyKey,
      name: familyData.name,
      label: familyData.label,
      description: familyData.description,
      icon: iconName,
      // Use the dedicated getter functions (they already check appSettings)
      ui: getFamilyUIConfig(familyKey, familyData),
      rules: getFamilyRules(familyKey, familyData),
      features: getFamilyFeatures(familyKey, familyData),
      actions: getFamilyActions(familyKey, familyData),
      optionTypes: familyOptionTypes
    }
  })
}



/**
 * Get fallback data for families
 */
export function getFamilyFallbackData(): Record<string, OptionFamily> {
  return {
    'debate': {
      name: 'Debate',
      label: 'Debate',
      description: 'Debate positions, arguments, and alternatives',
      icon: 'Discussion',
      ui: {
        layout: 'paired',
        show_metrics: true,
        thread_visualization: 'tree'
      },
      rules: {
        require_initial_position: true,
        max_thread_depth: 10
      },
      features: ['argument_rating', 'thread_collapsing', 'consensus_indicators'],
      actions: [
        { key: 'export_thread', label: 'Export Debate Thread', icon: 'Download' },
        { key: 'generate_summary', label: 'Generate Summary', icon: 'Summarize' },
        { key: 'visualize_network', label: 'View Argument Network', icon: 'Graph' }
      ]
    },
    'structure': {
      name: 'Structure',
      label: 'Structure',
      description: 'Structured documents with chapters and articles',
      icon: 'Settings',
      ui: {
        layout: 'tree',
        show_toc: true,
        collapsible_sections: true,
        breadcrumb_navigation: true
      },
      rules: {
        max_depth: 5,
        require_numeric_notation: true,
        allow_cross_references: true
      },
      features: ['version_control', 'change_tracking', 'commentary'],
      actions: [
        { key: 'import_document', label: 'Import Document', icon: 'Upload' },
        { key: 'export_pdf', label: 'Export as PDF', icon: 'FilePdf' },
        { key: 'export_markdown', label: 'Export as Markdown', icon: 'Markdown' },
        { key: 'print_view', label: 'Print View', icon: 'Printer' },
        { key: 'compare_versions', label: 'Compare Versions', icon: 'Diff' }
      ]
    },
    'consensus': {
      name: 'Consensus',
      label: 'Consensus',
      description: 'Consultation questions and consensus building',
      icon: 'ThumbUp',
      ui: {
        layout: 'consensus_flow',
        show_consensus_meter: true,
        highlight_objections: true,
        visualize_progress: true
      },
      rules: {
        consensus_threshold: 0.8,
        require_objection_response: true
      },
      features: ['consensus_tracking', 'objection_management', 'poll_integration'],
      actions: [
        { key: 'export_consensus_report', label: 'Export Consensus Report', icon: 'Report' },
        { key: 'generate_minutes', label: 'Generate Minutes', icon: 'Minutes' },
        { key: 'visualize_consensus', label: 'View Consensus Map', icon: 'Map' },
        { key: 'schedule_facilitation', label: 'Schedule Facilitation', icon: 'Calendar' }
      ]
    },
    'decision': {
      name: 'Decision',
      label: 'Decision',
      description: 'Official decisions and results',
      icon: 'Checkmark',
      ui: {
        layout: 'cards',
        show_metadata: true,
        highlight_authority: true,
        timeline_view: true
      },
      rules: {
        require_official_endorsement: true,
        min_approval_count: 1
      },
      features: ['legal_binding', 'appeal_mechanism', 'implementation_tracking'],
      actions: [
        { key: 'generate_legal_document', label: 'Generate Legal Document', icon: 'Gavel' },
        { key: 'export_decision', label: 'Export Decision', icon: 'FileExport' },
        { key: 'notify_stakeholders', label: 'Notify Stakeholders', icon: 'Bell' },
        { key: 'track_implementation', label: 'Track Implementation', icon: 'ProgressCheck' }
      ]
    },
    'proposal': {
      name: 'Proposal',
      label: 'Proposal',
      description: 'Initial proposals and suggestions',
      icon: 'Lightbulb',
      ui: {
        layout: 'cards',
        show_support_meter: true,
        highlight_impact: true,
        proposal_template: 'standard'
      },
      rules: {
        requires_impact_assessment: true,
        min_support_threshold: 5
      },
      features: ['budget_estimation', 'impact_analysis', 'community_feedback'],
      actions: [
        { key: 'duplicate_proposal', label: 'Duplicate Proposal', icon: 'ContentCopy' },
        { key: 'merge_proposals', label: 'Merge with Similar', icon: 'CallMerge' },
        { key: 'export_proposal', label: 'Export Proposal', icon: 'FileExport' },
        { key: 'request_review', label: 'Request Expert Review', icon: 'AccountReview' }
      ]
    },
    'workflow': {
      name: 'Workflow',
      label: 'Workflow',
      description: 'Project and decision workflow management',
      icon: 'BarChart2',
      ui: {
        layout: 'kanban',
        show_swimlanes: true,
        wip_limits: true,
        cycle_time_visualization: true
      },
      rules: {
        require_status_transitions: true,
        enforce_wip_limits: true
      },
      features: ['automated_transitions', 'blocker_detection', 'sla_tracking'],
      actions: [
        { key: 'export_board', label: 'Export Board', icon: 'FileExport' },
        { key: 'generate_flow_report', label: 'Flow Report', icon: 'ChartLine' },
        { key: 'configure_workflow', label: 'Configure Workflow', icon: 'Cog' },
        { key: 'bulk_transition', label: 'Bulk Transition', icon: 'ArrowRightBold' }
      ]
    },
    'process': {
      name: 'Process',
      label: 'Process',
      description: 'Timeline and procedural events',
      icon: 'Timeline',
      ui: {
        layout: 'timeline',
        show_gantt: true,
        milestone_highlight: true,
        dependency_lines: true
      },
      rules: {
        chronological_order: true,
        require_dates: true
      },
      features: ['gantt_chart', 'critical_path', 'resource_allocation'],
      actions: [
        { key: 'export_gantt', label: 'Export Gantt', icon: 'FileExport' },
        { key: 'print_timeline', label: 'Print Timeline', icon: 'Printer' },
        { key: 'adjust_schedule', label: 'Adjust Schedule', icon: 'CalendarClock' },
        { key: 'identify_bottlenecks', label: 'Identify Bottlenecks', icon: 'AlertCircle' }
      ]
    },
    'default': {
      name: 'Options',
      label: 'Options',
      description: 'Various option types',
      icon: 'File',
      ui: {
        layout: 'cards'
      },
      rules: {},
      features: [],
      actions: []
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
  allowedOptionTypes: InquiryOptionType[]
): InquiryOptionType[] {
  return allowedOptionTypes.filter(optionType => 
    optionType.family === familyKey
  )
}

/**
 * Get option type options for radio/select components
 * @param optionTypes
 */
export function getOptionTypeOptions(optionTypes: InquiryOptionType[]) {
  return optionTypes.map(type => ({
    value: type.option_type,
    label: type.label,
    description: type.description,
    icon: type.icon
  }))
}

/**
 * Get option type from list by type string
 * @param optionType
 * @param optionTypes
 */
export function findOptionType(
  optionType: string | null | undefined,
  optionTypes: InquiryOptionType[]
): InquiryOptionType | null {
  if (!optionType || !optionTypes?.length) return null

  return optionTypes.find(opt =>
    opt.option_type === optionType || opt.optionType === optionType
  ) || null
}

/**
 * Get option type label safely
 * @param optionType
 * @param optionTypes
 * @param fallback
 */
export function getOptionTypeLabel(
  optionType: string | null | undefined,
  optionTypes: InquiryOptionType[],
  fallback: string = 'Option'
): string {
  if (!optionType) return fallback
  const found = findOptionType(optionType, optionTypes)
  return found?.label || optionType || fallback
}

/**
 * Get option type icon component safely
 * @param optionType
 * @param optionTypes
 */
export function getOptionTypeIconComponent(
  optionType: string | null | undefined,
  optionTypes: InquiryOptionType[]
): Component  {
  if (!optionType) return InquiryOptionIcons.File

  const found = findOptionType(optionType, optionTypes)
  const iconName = found?.icon || 'File'

  return InquiryOptionIcons[iconName] || InquiryOptionIcons.File
}


/**
 * Get option type icon name as string
 * @param optionType
 * @param optionTypes
 */
export function getOptionTypeIconName(
  optionType: string | null | undefined,
  optionTypes: InquiryOptionType[]
): string {
  if (!optionType) return 'File'
  const found = findOptionType(optionType, optionTypes)
  return found?.icon || 'File'
}

/**
 * Get option type description safely
 * @param optionType
 * @param optionTypes
 */
export function getOptionTypeDescription(
  optionType: string | null | undefined,
  optionTypes: InquiryOptionType[]
): string {
  if (!optionType) return ''
  const found = findOptionType(optionType, optionTypes)
  return found?.description || found?.text || ''
}

/**
 * Get option type family safely
 * @param optionType
 * @param optionTypes
 */
export function getOptionTypeFamily(
  optionType: string | null | undefined,
  optionTypes: InquiryOptionType[]
): string {
  if (!optionType) return 'default'
  const found = findOptionType(optionType, optionTypes)
  return found?.family || 'default'
}

/**
 * Get option type color based on family
 * @param optionType
 * @param optionTypes
 */
export function getOptionTypeColor(
  optionType: string | null | undefined,
  optionTypes: InquiryOptionType[]
): string {
  const family = getOptionTypeFamily(optionType, optionTypes)
  return getFamilyColor(family)
}

/**
 * Get allowed responses for an option type
 * @param optionType
 * @param optionTypes
 */
export function getAllowedResponses(
  optionType: string | null | undefined,
  optionTypes: InquiryOptionType[]
): string[] {
  if (!optionType) return []

  const found = findOptionType(optionType, optionTypes)
  if (!found) return []
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
 * @param optionType
 * @param allOptionTypes
 */
export function getAvailableResponseTypes(
  optionType: string | null | undefined,
  allOptionTypes: InquiryOptionType[]
): Array<{
  option_type: string
  label: string
  icon: string
  description?: string
}> {
  const allowedKeys = getAllowedResponses(optionType, allOptionTypes)
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
 * @param optionType
 * @param optionTypes
 */
export function getOptionTypeFields(
  optionType: string | null | undefined,
  optionTypes: InquiryOptionType[]
): unknown[] {
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
 * @param optionType
 * @param optionTypes
 */
export function hasSupportFeature(
  optionType: string | null | undefined,
  optionTypes: InquiryOptionType[]
): boolean {
  if (!optionType) return false
  const found = findOptionType(optionType, optionTypes)
  const feature = found?.support_feature
  return feature && feature !== 'none'
}

/**
 * Get support feature label
 * @param optionType
 * @param optionTypes
 */
export function getSupportFeatureLabel(
  optionType: string | null | undefined,
  optionTypes: InquiryOptionType[]
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
 * @param optionType
 * @param optionTypes
 */
export function allowsComments(
  optionType: string | null | undefined,
  optionTypes: InquiryOptionType[]
): boolean {
  if (!optionType) return false
  const found = findOptionType(optionType, optionTypes)
  return found?.allow_comment || false
}

/**
 * Check if option type uses title
 * @param optionType
 * @param optionTypes
 */
export function usesTitle(
  optionType: string | null | undefined,
  optionTypes: InquiryOptionType[]
): boolean {
  if (!optionType) return true
  const found = findOptionType(optionType, optionTypes)
  return found?.use_title !== false
}

// Add these functions to InquiryOptionHelper.ts

/**
 * Get allowed layouts for an option type from its family configuration
 * @param optionType - The option type
 * @param optionTypes - All option types
 * @param familyKey - Optional family key (will be derived if not provided)
 */
export function getAllowedLayouts(
  optionType: string | null | undefined,
  optionTypes: InquiryOptionType[],
  familyKey?: string
): string[] {
  if (!optionType) return ['cards'] // Default fallback

  // Get family if not provided
  const family = familyKey || getOptionTypeFamily(optionType, optionTypes)
  
  // Get family UI config
  const uiConfig = getFamilyUIConfig(family)
  
  // Check if family has allowed_layouts in its UI config
  if (uiConfig?.allowed_layouts && Array.isArray(uiConfig.allowed_layouts)) {
    return uiConfig.allowed_layouts
  }
  
  // Fallback to default layouts based on family
  const defaultLayouts: Record<string, string[]> = {
    'debate': ['paired', 'cards', 'list'],
    'structure': ['tree', 'cards', 'list'],
    'consensus': ['consensus_flow', 'cards', 'list'],
    'decision': ['cards', 'list', 'results'],
    'proposal': ['cards', 'list', 'results'],
    'workflow': ['kanban', 'cards', 'list', 'timeline'],
    'process': ['timeline', 'cards', 'list', 'kanban'],
    'vote': ['timeline', 'cards', 'list', 'kanban'],
    'default': ['cards', 'list']
  }
  
  return defaultLayouts[family] || defaultLayouts.default
}

/**
 * Get default layout for an option type
 * @param optionType - The option type
 * @param optionTypes - All option types
 * @param familyKey - Optional family key
 */
export function getDefaultLayout(
  optionType: string | null | undefined,
  optionTypes: InquiryOptionType[],
  familyKey?: string
): string {
  if (!optionType) return 'cards'

  const family = familyKey || getOptionTypeFamily(optionType, optionTypes)
  const uiConfig = getFamilyUIConfig(family)
  
  // Check if family has default_layout in its UI config
  if (uiConfig?.default_layout) {
    return uiConfig.default_layout
  }
  
  // Fallback to family-based default
  const defaultLayoutMap: Record<string, string> = {
    'debate': 'paired',
    'structure': 'tree',
    'consensus': 'consensus_flow',
    'decision': 'cards',
    'proposal': 'cards',
    'workflow': 'kanban',
    'process': 'timeline',
    'vote': 'vote'
  }
  
  return defaultLayoutMap[family] || 'cards'
}

/**
 * Check if an option should be displayed in a specific layout
 * @param option - The option to check
 * @param layout - The layout to check against
 * @param optionTypes - All option types
 */
export function shouldShowInLayout(
  option: Option,
  layout: string,
  optionTypes: InquiryOptionType[]
): boolean {
  // First check if option has force_layouts in miscFields
  if (option.miscFields?.force_layouts && Array.isArray(option.miscFields.force_layouts)) {
    return option.miscFields.force_layouts.includes(layout)
  }
  
  // Otherwise check based on option type's family allowed layouts
  const allowedLayouts = getAllowedLayouts(option.type, optionTypes)
  return allowedLayouts.includes(layout)
}


/**
 * Get layout for family
 * @param familyKey
 */
export const getLayoutForFamily = (familyKey: string): string => {
  const layoutMap: Record<string, string> = {
    debate: 'paired',
    structure: 'tree',
    consensus: 'consensus_flow',
    decision: 'cards',
    proposal: 'cards',
    workflow: 'kanban',
    process: 'timeline',
    vote: 'vote'
  }

  return layoutMap[familyKey] || 'cards'
}

/**
 * Check if an option type belongs to a specific family
 * @param optionType
 * @param familyKey
 * @param optionTypes
 */
export function isOptionTypeInFamily(
  optionType: string | null | undefined,
  familyKey: string,
  optionTypes: InquiryOptionType[]
): boolean {
  if (!optionType) return false
  const typeFamily = getOptionTypeFamily(optionType, optionTypes)
  return typeFamily === familyKey
}

/**
 * Get allowed layouts for an option type (from its family configuration)
 * @param optionType
 * @param optionTypes
 */
export function getAllowedLayoutsForType(
  optionType: string | null | undefined,
  optionTypes: InquiryOptionType[]
): string[] {
  if (!optionType) return ['cards']

  const family = getOptionTypeFamily(optionType, optionTypes)
  const uiConfig = getFamilyUIConfig(family)

  // Check if family has allowed_layouts in its UI config
  if (uiConfig?.allowed_layouts && Array.isArray(uiConfig.allowed_layouts)) {
    return uiConfig.allowed_layouts
  }

  // Fallback to default layouts based on family
  const defaultLayouts: Record<string, string[]> = {
    'debate': ['paired', 'cards', 'list'],
    'structure': ['tree', 'cards', 'list'],
    'consensus': ['consensus_flow', 'cards', 'list'],
    'decision': ['cards', 'list', 'results'],
    'proposal': ['cards', 'list', 'results'],
    'workflow': ['kanban', 'cards', 'list', 'timeline'],
    'process': ['timeline', 'cards', 'list', 'kanban'],
    'default': ['cards', 'list']
  }

  return defaultLayouts[family] || defaultLayouts.default
}


/**
 * Get available foreign options that can be added to a layout
 * These are options that don't belong to the family but can be force-shown
 * @param allOptions
 * @param layout
 * @param familyKey
 * @param optionTypes
 */
export function getAvailableForeignOptionsForLayout(
  allOptions: Option[],
  layout: string,
  familyKey: string | undefined,
  optionTypes: InquiryOptionType[]
): Option[] {
  return allOptions.filter(option => {
    // Skip options that already belong to this family (if familyKey is provided)
    if (familyKey) {
      const optionFamily = getOptionTypeFamily(option.type, optionTypes)
      if (optionFamily === familyKey) {
        return false
      }
    }

    // Check if they can be shown in this layout
    return canShowInLayout(option, layout, optionTypes)
  })
}


/**
 * Check if an option should be displayed in timeline layout
 * Options can be displayed in timeline if:
 * 1. They belong to the process family, OR
 * 2. They have timeline dates set
 * @param option - The option to check
 * @param optionTypes - All option types
 * @param targetFamily - Optional family to filter by
 */
export function shouldShowInTimeline(
  option: Option,
  optionTypes: InquiryOptionType[],
  targetFamily?: string
): boolean {
  // Get the option's family
  const optionFamily = getOptionTypeFamily(option.type, optionTypes)
  
  // If target family is specified and option belongs to it, include it
  if (targetFamily && optionFamily === targetFamily) {
    return true
  }
  
  // Otherwise check if it has timeline dates
  return hasTimelineDates(option)
}

/**
 * Filter options for timeline layout
 * @param options - All options to filter
 * @param optionTypes - All option types
 * @param targetFamily - Optional family to filter by (e.g., 'process')
 */
export function filterOptionsForTimeline(
  options: Option[],
  optionTypes: InquiryOptionType[],
  targetFamily?: string
): Option[] {
  return options.filter(option => shouldShowInTimeline(option, optionTypes, targetFamily))
}

/// //////////////////////////////////////
/**
 * Get force_layouts from option's miscFields
 * @param option - The option
 */
export function getForceLayouts(option: Option): string[] {
  const miscFields = option.miscFields || {}
  
  if (!miscFields.force_layouts) {
    return []
  }
  
  // Handle both string and array formats
  if (typeof miscFields.force_layouts === 'string') {
    try {
      const parsed = JSON.parse(miscFields.force_layouts)
      if (Array.isArray(parsed)) {
        return parsed
      } if (typeof parsed === 'string') {
        return [parsed]
      } 
        return []
      
    } catch {
      // If parsing fails, treat as a single layout string
      if (miscFields.force_layouts) {
        return [miscFields.force_layouts]
      }
      return []
    }
  } else if (Array.isArray(miscFields.force_layouts)) {
    return miscFields.force_layouts
  }
  
  return []
}

/**
 * Add a layout to an option's force_layouts
 * @param option - The option
 * @param layout - The layout to add
 */
export function addLayoutToOption(option: Option, layout: string): Option {
  const miscFields = { ...(option.miscFields || {}) }
  const currentLayouts = getForceLayouts(option)
  
  if (!currentLayouts.includes(layout)) {
    currentLayouts.push(layout)
    // Store as JSON string for consistency
    miscFields.force_layouts = JSON.stringify(currentLayouts)
  }
  
  return {
    ...option,
    miscFields
  }
}

/**
 * Remove a layout from an option's force_layouts
 * @param option - The option
 * @param layout - The layout to remove
 */
export function removeLayoutFromOption(option: Option, layout: string): Option {
  const miscFields = { ...(option.miscFields || {}) }
  const currentLayouts = getForceLayouts(option)
  const updatedLayouts = currentLayouts.filter(l => l !== layout)
  
  if (updatedLayouts.length === 0) {
    delete miscFields.force_layouts
  } else {
    miscFields.force_layouts = JSON.stringify(updatedLayouts)
  }
  
  return {
    ...option,
    miscFields
  }
}

/**
 * Remove an option from timeline (removes timeline from force_layouts)
 * @param option - The option to remove
 * @param optionsStore - The options store instance
 */
export async function removeFromTimeline(
  option: Option,
  optionsStore: OptionsStore
): Promise<void> {
  try {
    // Remove 'timeline' from force_layouts
    const updatedOption = removeLayoutFromOption(option, 'timeline')
    
    // Update the option
    await optionsStore.updateOption({ option: updatedOption })
    
  } catch (error) {
    console.error('Failed to remove option from timeline:', error)
    throw error
  }
}


/**
 * Get default layout for a family
 * @param familyKey - The family key
 */
export function getDefaultLayoutForFamily(familyKey: string): string {
  const layoutMap: Record<string, string> = {
    debate: 'paired',
    structure: 'tree',
    consensus: 'consensus_flow',
    decision: 'cards',
    proposal: 'cards',
    workflow: 'kanban',
    process: 'timeline',
    vote: 'cards'
  }
  return layoutMap[familyKey] || 'cards'
}

/**
 * Get allowed layouts for a family
 * @param familyKey - The family key
 */
export function getAllowedLayoutsForFamily(familyKey: string): string[] {
  const layoutsMap: Record<string, string[]> = {
    debate: ['paired', 'cards', 'list'],
    structure: ['tree', 'cards', 'list'],
    consensus: ['consensus_flow', 'cards', 'list'],
    decision: ['cards', 'list', 'results'],
    proposal: ['cards', 'list', 'results'],
    workflow: ['kanban', 'cards', 'list', 'timeline'],
    process: ['timeline', 'cards', 'list', 'kanban'],
    vote: ['cards', 'list', 'results'],
    default: ['cards', 'list']
  }
  return layoutsMap[familyKey] || layoutsMap.default
}

/**
 * Check if an option should be shown in a specific layout
 * This is used for checking if an option can be added to a layout
 * 
 * @param option - The option
 * @param layout - The layout to check
 */
export function canShowInLayout(
  option: Option,
  layout: string
): boolean {
  // Simply check if the layout is in force_layouts
  const forceLayouts = getForceLayouts(option)
  return forceLayouts.includes(layout)
}

/**
 * Filter options by layout
 * Shows options that:
 * 1. Belong to the target family (if specified), OR
 * 2. Have force_layouts containing this layout
 * 
 * @param options - All options
 * @param layout - The layout to filter for (e.g., 'timeline', 'kanban')
 * @param optionTypes - All option types
 * @param targetFamily - Optional family to include all options from (e.g., 'process' for timeline, 'workflow' for kanban)
 */


export function filterOptionsByLayout(
  options: Option[],
  layout: string,
  optionTypes: InquiryOptionType[],
  targetFamily?: string
): Option[] {
  return options.filter(option => {
    const optionFamily = getOptionTypeFamily(option.type, optionTypes)
    const forceLayouts = getForceLayouts(option)
    const hasForceLayout = forceLayouts.includes(layout)

    // Check if option belongs to target family
    const isTargetFamily = targetFamily ? optionFamily === targetFamily : false

    // Include if:
    // 1. It's in the target family, OR
    // 2. It has this layout in force_layouts
    const shouldInclude = isTargetFamily || hasForceLayout

    return shouldInclude
  })
}

/**
 * Format a date to YYYY-MM-DD string
 * @param date - Date object or string
 */
function formatDateToISO(date: Date | string | null): string | null {
  if (!date) return null

  let dateObj: Date

  if (date instanceof Date) {
    dateObj = date
  } else if (typeof date === 'string') {
    dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) return null
  } else {
    return null
  }

  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Set timeline dates on an option
 * @param option - The option to update
 * @param startDate - Start date (Date object or string)
 * @param endDate - End date (Date object or string, optional)
 */
export function setTimelineDates(
  option: Option,
  startDate: Date | string | null,
  endDate?: Date | string | null
): Option {
  const miscFields = { ...(option.miscFields || {}) }
  
  // Set start date
  if (startDate) {
    const formattedStart = formatDateToISO(startDate)
    if (formattedStart) {
      miscFields.start_date = formattedStart
    }
  } else if (startDate === null) {
    // Remove start_date if null is passed
    delete miscFields.start_date
  }
  
  // Set end date (if provided)
  if (endDate !== undefined) {
    if (endDate === null) {
      // Remove end_date if null is passed
      delete miscFields.end_date
    } else {
      const formattedEnd = formatDateToISO(endDate)
      if (formattedEnd) {
        miscFields.end_date = formattedEnd
      }
    }
  }
  
  return {
    ...option,
    miscFields
  }
}

/**
 * Get timeline start date from an option
 * @param option - The option to check
 */
export function getTimelineStartDate(option: Option): Date | null {
  const miscFields = option.miscFields || {}
  
  // Check multiple possible date fields
  const dateStr = miscFields.start_date || 
                  miscFields.voting_start || 
                  miscFields.support_start
  
  if (!dateStr) return null
  
  try {
    // Handle string dates
    if (typeof dateStr === 'string') {
      const date = new Date(dateStr)
      return isNaN(date.getTime()) ? null : date
    }
    
    // Handle timestamp numbers
    if (typeof dateStr === 'number') {
      // Check if it's seconds or milliseconds
      const timestamp = dateStr < 10000000000 ? dateStr * 1000 : dateStr
      const date = new Date(timestamp)
      return isNaN(date.getTime()) ? null : date
    }
    
    // Handle Date objects
    if (dateStr instanceof Date) {
      return isNaN(dateStr.getTime()) ? null : dateStr
    }
    
    return null
  } catch {
    return null
  }
}

/**
 * Get timeline end date from an option
 * @param option - The option to check
 */
export function getTimelineEndDate(option: Option): Date | null {
  const miscFields = option.miscFields || {}
  const dateStr = miscFields.end_date
  
  if (!dateStr) return null
  
  try {
    // Handle string dates
    if (typeof dateStr === 'string') {
      const date = new Date(dateStr)
      return isNaN(date.getTime()) ? null : date
    }
    
    // Handle timestamp numbers
    if (typeof dateStr === 'number') {
      const timestamp = dateStr < 10000000000 ? dateStr * 1000 : dateStr
      const date = new Date(timestamp)
      return isNaN(date.getTime()) ? null : date
    }
    
    // Handle Date objects
    if (dateStr instanceof Date) {
      return isNaN(dateStr.getTime()) ? null : dateStr
    }
    
    return null
  } catch {
    return null
  }
}

/**
 * Check if an option has timeline dates set
 * @param option - The option to check
 */
export function hasTimelineDates(option: Option): boolean {
  return getTimelineStartDate(option) !== null
}

/**
 * Add an option to timeline (sets dates and adds to force_layouts)
 * This is the equivalent of setOptionStatus for Kanban
 * @param option - The option to add
 * @param startDate - Start date
 * @param endDate - End date (optional)
 * @param optionsStore - The options store instance
 */
export async function addToTimeline(
  option: Option,
  startDate: Date | string,
  endDate: Date | string | null | undefined,
  optionsStore: OptionsStore
): Promise<void> {
  try {
    // Step 1: Set the timeline dates
    let updatedOption = setTimelineDates(option, startDate, endDate)
    
    // Step 2: Add 'timeline' to force_layouts
    updatedOption = addLayoutToOption(updatedOption, 'timeline')
    
    // Step 3: Update the option
    await optionsStore.updateOption({ option: updatedOption })
    
  } catch (error) {
    console.error('Failed to add option to timeline:', error)
    throw error
  }
}

/**
 * Update timeline dates for an option (preserves force_layouts)
 * @param option - The option to update
 * @param startDate - New start date
 * @param endDate - New end date (optional)
 * @param optionsStore - The options store instance
 */
export async function updateTimelineDates(
  option: Option,
  startDate: Date | string | null,
  endDate: Date | string | null | undefined,
  optionsStore: OptionsStore
): Promise<void> {
  try {
    // Update dates while preserving existing force_layouts
    const updatedOption = setTimelineDates(option, startDate, endDate)
    
    await optionsStore.updateOption({ option: updatedOption })
    
  } catch (error) {
    console.error('Failed to update timeline dates:', error)
    throw error
  }
}


/**
 * Timeline-specific helper functions for managing dates
 */

/**
 * Set timeline dates for an option
 * @param optionId - The option ID
 * @param startDate - Start date (Date object or string)
 * @param endDate - End date (Date object or string, optional)
 * @param optionsStore - The options store instance
 */
export async function setTimelineDatesForOption(
  optionId: number,
  startDate: Date | string | null,
  endDate: Date | string | null | undefined,
  optionsStore: OptionsStore
): Promise<void> {
  try {
    // First get the current option
    const currentOption = optionsStore.getOptionById(optionId)
    if (!currentOption) {
      throw new Error('Option not found')
    }

    // Update the dates using the helper
    const updatedOption = setTimelineDates(currentOption, startDate, endDate)

    // Also add 'timeline' to force_layouts if not already present
    const finalOption = addLayoutToOption(updatedOption, 'timeline')

    // Update the option
    await optionsStore.updateOption({ option: finalOption })

  } catch (error) {
    console.error('Failed to set timeline dates:', error)
    throw error
  }
}

/**
 * Clear timeline dates from an option (removes start_date and end_date)
 * @param option - The option to clear dates from
 * @param optionsStore - The options store instance
 */
export async function clearTimelineDates(
  option: Option,
  optionsStore: OptionsStore
): Promise<void> {
  try {
    const miscFields = { ...(option.miscFields || {}) }

    // Remove date fields
    delete miscFields.start_date
    delete miscFields.end_date
    delete miscFields.voting_start
    delete miscFields.support_start

    const updatedOption = {
      ...option,
      miscFields
    }

    await optionsStore.updateOption({ option: updatedOption })

  } catch (error) {
    console.error('Failed to clear timeline dates:', error)
    throw error
  }
}

