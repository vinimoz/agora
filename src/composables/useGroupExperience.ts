/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { computed, ref, type Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { 
  useExperience, 
  EXPERIENCE_DEFINITIONS, 
  type ExperienceKey, 
  type DisplayMode,
  type ToolKey
} from './useExperience'
import type { InquiryGroup } from '../stores/inquiryGroups.types'

export function useGroupExperience(group: Ref<InquiryGroup | null>) {
  const route = useRoute()
  const router = useRouter()

  const experience = computed<ExperienceKey>({
	  get: () => {
		  const urlExp = route.query.experience as ExperienceKey
		  if (urlExp && EXPERIENCE_DEFINITIONS[urlExp]) {
			  return urlExp
		  }
		  return group.value?.ui?.default_experience || 'dashboard'
	  },
	  set: (val) => {
		  router.push({
			  query: { ...route.query, experience: val }
		  })
	  }
  })

  const displayMode = computed<DisplayMode>({
	  get: () => {
		  const urlDisplay = route.query.display as DisplayMode
		  if (urlDisplay) return urlDisplay
			  return group.value?.ui?.default_display || 'cards'
	  },
	  set: (val) => {
		  router.push({
			  query: { ...route.query, display: val }
		  })
	  }
  })


  // Get the full UI configuration from the group
  const uiConfig = computed(() => group.value?.ui || null)

  // Check if group has custom display architecture
  const hasCustomArchitecture = computed(() => 
					 uiConfig.value?.display_architecture && 
						 Object.keys(uiConfig.value.display_architecture).length > 0
					)

					// Get the display architecture from the group's UI config
					const displayArchitecture = computed(() => 
									     uiConfig.value?.display_architecture || null
									    )

									    // Get layout config from the group's UI config (root level)
									    const layoutConfig = computed(() => {
										    const ui = uiConfig.value
										    if (!ui?.layout) {
											    return { type: 'full', columns: 2, rows: 2, responsive: true }
										    }

										    return {
											    type: ui.layout.type || 'full',
											    columns: ui.layout.columns || 2,
											    rows: ui.layout.rows || 2,
											    responsive: ui.layout.responsive !== false
										    }
									    })

									    // Get context from the group's UI config
									    const contextConfig = computed(() => 
													   uiConfig.value?.context || { type: 'group', selection: 'selected' }
													  )

													  // Get features from the group's UI config
													  const features = computed(() => 
																    uiConfig.value?.features || []
																   )

																   // Get allowed tools from the group's UI config
																   const allowedTools = computed((): ToolKey[] => {
																	   const ui = uiConfig.value
																	   if (!ui?.display_architecture) return []

																		   const tools: ToolKey[] = []
																		   for (const zone of Object.values(ui.display_architecture)) {
																			   if (zone.display?.type === 'tool' && zone.display?.tool) {
																				   if (!tools.includes(zone.display.tool as ToolKey)) {
																					   tools.push(zone.display.tool as ToolKey)
																				   }
																			   }
																		   }
																		   return tools
																   })

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
																				      uiConfig,
																				      displayArchitecture,
																				      layoutConfig,
																				      contextConfig,
																				      features,
																				      definition,
																				      allowedTools,

																				      // Computed
																				      hasCustomArchitecture,
																				      availableExperiences,

																				      // Actions
																				      switchExperience,
																				      switchDisplay
																			      }
}
