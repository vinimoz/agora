/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { computed, type Ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  EXPERIENCE_DEFINITIONS, 
  type ExperienceKey, 
  type DisplayType,
  type ToolKey
} from './useExperience'
import type { InquiryGroup } from '../stores/inquiryGroups.types'

export function useGroupExperience(group: Ref<InquiryGroup | null>) {
  const route = useRoute()
  const router = useRouter()

  // Get the full UI configuration from the group (stored in configuration.ui)
  const uiConfig = computed(() => group.value?.configuration?.ui || null)
  console.log(" USE GROUP EXPEREIECEN ",uiConfig.value)
  /**
   * Experience is determined by:
   * 1. URL query parameter (?experience=xxx)
   * 2. Group's UI config (.experience field from ExperienceArchitecture)
   * 3. Default 'dashboard'
   */
  const experience = computed<ExperienceKey>({
    get: () => {
      const urlExp = route.query.experience as ExperienceKey
      if (urlExp && EXPERIENCE_DEFINITIONS[urlExp]) {
        return urlExp
      }
      // Use 'experience' field from ExperienceArchitecture (not 'defaultExperience')
      return uiConfig.value?.experience || 'dashboard'
    },
    set: (val) => {
      router.push({
        query: { ...route.query, experience: val }
      })
    }
  })

  /**
   * Display mode is determined by:
   * 1. URL query parameter (?display=xxx)
   * 2. Default display from the experience definition
   * 3. Fallback to 'cards'
   */
  const displayMode = computed<DisplayType>({
    get: () => {
      const urlDisplay = route.query.display as DisplayType
      if (urlDisplay) return urlDisplay
      
      // Get defaultDisplay from experience definition
      const def = EXPERIENCE_DEFINITIONS[experience.value]
      return def?.defaultDisplay || 'cards'
    },
    set: (val) => {
      router.push({
        query: { ...route.query, display: val }
      })
    }
  })

  /**
   * Check if group has custom display architecture
   * Uses displayArchitecture from ExperienceArchitecture
   */
  const hasCustomArchitecture = computed(() => 
    uiConfig.value?.displayArchitecture && 
    Object.keys(uiConfig.value.displayArchitecture).length > 0
  )

  /**
   * Get the display architecture from the group's UI config
   * Uses displayArchitecture from ExperienceArchitecture
   */
  const displayArchitecture = computed(() => 
    uiConfig.value?.displayArchitecture || null
  )

  /**
   * Get layout config from the group's UI config
   * Falls back to experience default if not specified
   */
  const layoutConfig = computed(() => {
    const ui = uiConfig.value
    if (!ui?.layout) {
      // Fallback based on experience definition
      const def = EXPERIENCE_DEFINITIONS[experience.value]
      if (def?.layout === 'grid') {
        return { type: 'grid', columns: 2, rows: 2, responsive: true }
      }
      return { type: 'full', responsive: true }
    }
    return {
      type: ui.layout.type || 'full',
      columns: ui.layout.columns || 2,
      rows: ui.layout.rows || 2,
      responsive: ui.layout.responsive !== false
    }
  })

  /**
   * Get context from the group's UI config
   * Uses context from ExperienceArchitecture
   */
  const contextConfig = computed(() => 
    uiConfig.value?.context || { type: 'group', selection: 'selected' }
  )

  /**
   * Get features from the group's UI config
   * Uses features from ExperienceArchitecture
   */
  const features = computed(() => 
    uiConfig.value?.features || []
  )

  /**
   * Get allowed tools from the display architecture
   * Extracts tools from zones where display.type === 'tool'
   */
  const allowedTools = computed((): ToolKey[] => {
    const ui = uiConfig.value
    if (!ui?.displayArchitecture) return []

    const tools: ToolKey[] = []
    for (const zone of Object.values(ui.displayArchitecture)) {
      if (zone.display?.type === 'tool' && zone.display?.tool) {
        const tool = zone.display.tool as ToolKey
        if (!tools.includes(tool)) {
          tools.push(tool)
        }
      }
    }
    return tools
  })

  /**
   * Get available experiences for this group type
   * Filters experiences by supportedGroupTypes
   * IMPORTANT: Also includes experiences that don't have supportedGroupTypes defined (available to all)
   */
  const availableExperiences = computed(() => {
    const groupType = group.value?.type
    
    // If no group type, return all experiences
    if (!groupType) {
      return Object.keys(EXPERIENCE_DEFINITIONS) as ExperienceKey[]
    }

    const allKeys = Object.keys(EXPERIENCE_DEFINITIONS) as ExperienceKey[]
    return allKeys.filter(key => {
      const def = EXPERIENCE_DEFINITIONS[key]
      // If no supportedGroupTypes defined, experience is available to all
      if (!def.supportedGroupTypes || def.supportedGroupTypes.length === 0) {
        return true
      }
      // Check if group type is in supportedGroupTypes (case insensitive)
      return def.supportedGroupTypes.some(
        supportedType => supportedType.toLowerCase() === groupType.toLowerCase()
      )
    })
  })

  /**
   * Get the default experience for this group type
   * First checks if the group's type has a default, otherwise returns 'dashboard'
   */
  const defaultExperience = computed((): ExperienceKey => {
    // Check if group type has a default experience from UI config
    if (uiConfig.value?.defaultExperience) {
      return uiConfig.value.defaultExperience as ExperienceKey
    }
    // Check if the experience is defined in the UI config
    if (uiConfig.value?.experience) {
      return uiConfig.value.experience as ExperienceKey
    }
    return 'dashboard'
  })

  /**
   * Get the default display mode for the current experience
   */
  const defaultDisplay = computed((): DisplayType => {
    const def = EXPERIENCE_DEFINITIONS[experience.value]
    return def?.defaultDisplay || 'cards'
  })

  /**
   * Get zones for a specific content type
   * @param contentType - The content type to filter zones by
   */
  function getZonesByContent(contentType: string): Array<{ key: string; zone: any }> {
    const architecture = displayArchitecture.value
    if (!architecture) return []

    return Object.entries(architecture)
      .filter(([, zone]) => zone.content === contentType)
      .map(([key, zone]) => ({ key, zone }))
  }

  /**
   * Get a specific zone by key
   * @param zoneKey - The zone key to retrieve
   */
  function getZone(zoneKey: string): any {
    return displayArchitecture.value?.[zoneKey] || null
  }

  /**
   * Check if a specific feature is enabled
   * @param featureName - The feature to check
   */
  function hasFeature(featureName: string): boolean {
    return features.value.includes(featureName)
  }

  /**
   * Get the experience definition for the current experience
   */
  const definition = computed(() => 
    EXPERIENCE_DEFINITIONS[experience.value] || EXPERIENCE_DEFINITIONS.dashboard
  )

  /**
   * Switch experience and update URL
   * @param key - The experience key to switch to
   */
  function switchExperience(key: ExperienceKey) {
    experience.value = key
    const query = { ...route.query, experience: key }
    // Reset display to default when switching experience
    const def = EXPERIENCE_DEFINITIONS[key]
    if (def) {
      query.display = def.defaultDisplay
    }
    router.push({ query })
  }

  /**
   * Switch display mode and update URL
   * @param mode - The display mode to switch to
   */
  function switchDisplay(mode: DisplayType) {
    displayMode.value = mode
    const query = { ...route.query, display: mode }
    router.push({ query })
  }

  /**
   * Get all zones in the display architecture
   */
  const allZones = computed(() => {
    const architecture = displayArchitecture.value
    if (!architecture) return []
    return Object.entries(architecture).map(([key, zone]) => ({
      key,
      ...zone
    }))
  })

  /**
   * Get zones for a specific position
   * @param row - The row to filter by
   * @param column - The column to filter by
   */
  function getZonesByPosition(row: number, column: number): any[] {
    const architecture = displayArchitecture.value
    if (!architecture) return []

    return Object.entries(architecture)
      .filter(([, zone]) => 
        zone.position?.row === row && zone.position?.column === column
      )
      .map(([key, zone]) => ({ key, ...zone }))
  }

  // Watch for group changes to update experience if needed
  watch(
    () => group.value?.type,
    (newType) => {
      if (!newType) return
      
      // If current experience is not available for this group type, switch to default
      const available = availableExperiences.value
      const currentExp = experience.value
      
      if (!available.includes(currentExp)) {
        const defaultExp = defaultExperience.value
        if (defaultExp && available.includes(defaultExp)) {
          switchExperience(defaultExp)
        } else if (available.length > 0) {
          switchExperience(available[0])
        }
      }
    },
    { immediate: true }
  )

  return {
    // State
    experience,
    displayMode,
    uiConfig,
    displayArchitecture,
    layoutConfig,
    contextConfig,
    features,
    definition,
    allowedTools,
    defaultExperience,
    defaultDisplay,

    // Computed
    hasCustomArchitecture,
    availableExperiences,
    allZones,

    // Actions
    switchExperience,
    switchDisplay,
    
    // Helper methods
    getZonesByContent,
    getZone,
    getZonesByPosition,
    hasFeature,
  }
}
