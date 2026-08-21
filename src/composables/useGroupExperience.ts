/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { computed, ref, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useExperience, EXPERIENCE_DEFINITIONS, type ExperienceKey, type DisplayMode } from './useExperience'
import type { InquiryGroup } from '../stores/inquiryGroups.types'

export function useGroupExperience(group: Ref<InquiryGroup | null>) {
  const route = useRoute()
  const router = useRouter()

  // Get experience from URL or default
  const experience = ref<ExperienceKey>(
    (route.query.experience as ExperienceKey) || 
    group.value?.ui?.default_experience || 
    'dashboard'
  )

  const displayMode = ref<DisplayMode>(
    (route.query.display as DisplayMode) || 'cards'
  )

  // Check if group has custom display architecture
  const hasCustomArchitecture = computed(() => group.value?.ui?.display_architecture && 
           Object.keys(group.value.ui.display_architecture).length > 0)

  // Get the display architecture
  const displayArchitecture = computed(() => group.value?.ui?.display_architecture || null)

  // Get available experiences for this group type
  const availableExperiences = computed(() => {
    if (!group.value?.type) return Object.keys(EXPERIENCE_DEFINITIONS) as ExperienceKey[]
    
    const allKeys = Object.keys(EXPERIENCE_DEFINITIONS) as ExperienceKey[]
    return allKeys.filter(key => {
      const def = EXPERIENCE_DEFINITIONS[key]
      if (!def.supportedGroupTypes) return true
      return def.supportedGroupTypes.includes(group.value!.type)
    })
  })

  // Get layout config from architecture
  const layoutConfig = computed(() => {
    const arch = displayArchitecture.value
    if (!arch) return { type: 'full', columns: 2, rows: 2, responsive: true }
    
    return {
      type: arch.layout?.type || 'full',
      columns: arch.layout?.columns || 2,
      rows: arch.layout?.rows || 2,
      responsive: arch.layout?.responsive !== false
    }
  })

  // Get features from architecture
  const features = computed(() => group.value?.ui?.features || [])

  // Switch experience and update URL
  function switchExperience(key: ExperienceKey) {
    experience.value = key
    const query = { ...route.query, experience: key }
    router.push({ query })
  }

  // Switch display mode and update URL
  function switchDisplay(mode: DisplayMode) {
    displayMode.value = mode
    const query = { ...route.query, display: mode }
    router.push({ query })
  }

  // Get experience definition
  const definition = computed(() => 
    EXPERIENCE_DEFINITIONS[experience.value] || EXPERIENCE_DEFINITIONS.dashboard
  )

  return {
    // State
    experience,
    displayMode,
    displayArchitecture,
    layoutConfig,
    features,
    definition,
    
    // Computed
    hasCustomArchitecture,
    availableExperiences,
    
    // Actions
    switchExperience,
    switchDisplay
  }
}
