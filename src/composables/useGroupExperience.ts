/**
 * SPDX-FileCopyrightText: 2026 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { computed, type Ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { EXPERIENCE_DEFINITIONS } from './useExperience'
import type {
  ExperienceKey,
  DisplayType,
  ToolKey,
  LayoutTypeValue,
  DisplayZone,
} from '../Types/experience.types'
import type { InquiryGroup, InquiryGroupUIConfig } from '../Types/inquiryGroups.types'
import { getExperienceArchitecture } from './experienceArchitecture'

// Landing-page only — never offered as a group experience.
const NON_GROUP_EXPERIENCES: ExperienceKey[] = ['home']

// Experiences that should always be reachable, regardless of group type
const ALWAYS_AVAILABLE: ExperienceKey[] = ['classic', 'navigation', 'kanban', 'timeline']

export function useGroupExperience(group: Ref<InquiryGroup | null>) {
  const route = useRoute()
  const router = useRouter()

  // ----------------------------------------------------------
  // UI CONFIG – reactive, with fallback to group-type template
  //
  // Normalises the legacy `string[]` shape (plain list of feature keys)
  // to the modern `InquiryGroupUIConfig` object so every downstream
  // access to `.experience`, `.layout`, `.displayArchitecture`, etc. is
  // fully typed.  Runtime behaviour is unchanged for existing
  // `InquiryGroupUIConfig` values; legacy arrays now correctly surface
  // their feature list instead of being passed through as-is.
  // ----------------------------------------------------------
  const uiConfig = computed<InquiryGroupUIConfig | null>(() => {
    const own = group.value?.configuration?.ui
    if (own && !Array.isArray(own)) {
      return own as InquiryGroupUIConfig
    }

    const templateUi = group.value?.inquiryGroupType?.ui

    if (Array.isArray(templateUi)) {
      // legacy shape: array of feature keys
      return { features: templateUi } as InquiryGroupUIConfig
    }

    if (templateUi && typeof templateUi === 'object') {
      return templateUi as InquiryGroupUIConfig
    }

    return null
  })

function resolveDefaultExperience(ui: InquiryGroupUIConfig | null): ExperienceKey {
	  const candidate =
		  (ui?.defaultExperience as ExperienceKey | undefined) ??
		  (ui?.experience as ExperienceKey | undefined)

	  if (candidate && EXPERIENCE_DEFINITIONS[candidate]) return candidate
		  return 'dashboard'
  }

  // ----------------------------------------------------------
  // EXPERIENCE
  // ----------------------------------------------------------
const experience = computed<ExperienceKey>({
  get: () => {
    const urlExp = route.query.experience as ExperienceKey | undefined
    if (urlExp && EXPERIENCE_DEFINITIONS[urlExp]) return urlExp
    return resolveDefaultExperience(uiConfig.value)
  },
  set: (val) => {
    const query: Record<string, string> = {
      ...Object.fromEntries(
        Object.entries(route.query).filter(([, v]) => typeof v === 'string') as [string, string][]
      ),
      experience: val,
    }
    router.push({ query })
  },
})

const defaultExperience = computed<ExperienceKey>(() =>
  resolveDefaultExperience(uiConfig.value)
)

  // ----------------------------------------------------------
  // DISPLAY MODE
  // ----------------------------------------------------------
  const displayMode = computed<DisplayType>({
	  get: () => {
		  const urlDisplay = route.query.display as DisplayType | undefined
		  if (urlDisplay) return urlDisplay

			  const def = EXPERIENCE_DEFINITIONS[experience.value]
			  return def?.defaultDisplay ?? 'cards'
	  },
	  set: (val) => {
		  const query: Record<string, string> = {
			  ...Object.fromEntries(
				  Object.entries(route.query).filter(([, v]) => typeof v === 'string') as [string, string][]
			  ),
			  display: val,
		  }
		  router.push({ query })
	  },
  })

  // ----------------------------------------------------------
  // ARCHITECTURE
  // ----------------------------------------------------------
  const hasCustomArchitecture = computed(
	  () =>
	  !!uiConfig.value?.displayArchitecture &&
		  Object.keys(uiConfig.value.displayArchitecture).length > 0
  )

  const displayArchitecture = computed<Record<string, DisplayZone> | null>(
	  () => uiConfig.value?.displayArchitecture ?? null
  )

  const layoutConfig = computed<{
	  type: LayoutTypeValue
	  columns?: number
	  rows?: number
	  responsive: boolean
  }>(() => {
	  // 1. Group-specific override always wins
	  const ui = uiConfig.value
	  if (ui?.layout) {
		  return {
			  type: (ui.layout.type ?? 'full') as LayoutTypeValue,
			  columns: ui.layout.columns,
			  rows: ui.layout.rows,
			  responsive: ui.layout.responsive !== false,
		  }
	  }

   // 2. The experience's architecture is the source of truth for the
     //    concrete layout (type + grid dimensions). EXPERIENCE_DEFINITIONS
     //    only carries a coarse `layout` fallback for the rare case where
     //    an experience has no architecture — it is no longer consulted
     //    when one exists.
     const archLayout = getExperienceArchitecture(experience.value)?.layout
     if (archLayout) {
         return {
             type: archLayout.type,
             columns: archLayout.columns,
             rows: archLayout.rows,
             responsive: archLayout.responsive !== false,
         }
     }

     // 3. Last resort — keep the contract total even though all shipped
     //    experiences declare an architecture.
     const def = EXPERIENCE_DEFINITIONS[experience.value]
     return {
         type: (def?.layout ?? 'full') as LayoutTypeValue,
         responsive: true,
     }

  
  })

  const contextConfig = computed(
	  () => uiConfig.value?.context ?? { type: 'group', selection: 'selected' }
  )

  const features = computed<string[]>(() => uiConfig.value?.features ?? [])

  // ----------------------------------------------------------
  // TOOLS
  // ----------------------------------------------------------
  const allowedTools = computed<ToolKey[]>(() => {
	  const architecture = uiConfig.value?.displayArchitecture
	  if (!architecture) return []

		  const seen = new Set<ToolKey>()
		  for (const zone of Object.values(architecture)) {
			  if (zone.display?.type === 'tool' && zone.display.tool) {
				  seen.add(zone.display.tool)
			  }
		  }
		  return [...seen]
  })

  // ----------------------------------------------------------
  // EXPERIENCE AVAILABILITY
  // ----------------------------------------------------------

  const availableExperiences = computed<ExperienceKey[]>(() => {
	  const groupType = group.value?.type
	  const allKeys = (Object.keys(EXPERIENCE_DEFINITIONS) as ExperienceKey[]).filter(
		  (key) => !NON_GROUP_EXPERIENCES.includes(key)
	  )

	  // No group context yet → show everything (except home)
	  if (!groupType) return allKeys

		  const matched = allKeys.filter((key) => {
			  const def = EXPERIENCE_DEFINITIONS[key]
			  if (!def.supportedGroupTypes?.length) return false
				  return def.supportedGroupTypes.some((t) => t.toLowerCase() === groupType.toLowerCase())
		  })

		  // Always keep the escape hatches
		  for (const key of ALWAYS_AVAILABLE) {
			  if (!matched.includes(key)) matched.push(key)
		  }

	  // If the group type matched nothing meaningful (only escape hatches),
	  // fall back to showing every experience. Better a superset than a dead end.
	  const meaningful = matched.filter((k) => !ALWAYS_AVAILABLE.includes(k))
	  return meaningful.length > 0 ? matched : allKeys
  })

  const defaultDisplay = computed<DisplayType>(() => {
	  const def = EXPERIENCE_DEFINITIONS[experience.value]
	  return def?.defaultDisplay ?? 'cards'
  })

  // ----------------------------------------------------------
  // ZONE HELPERS
  // ----------------------------------------------------------
  function getZonesByContent(contentType: string): Array<{ key: string; zone: DisplayZone }> {
	  const architecture = displayArchitecture.value
	  if (!architecture) return []

		  return Object.entries(architecture)
		  .filter(([, zone]) => zone.content === contentType)
		  .map(([key, zone]) => ({ key, zone }))
  }

  function getZone(zoneKey: string): DisplayZone | null {
	  return displayArchitecture.value?.[zoneKey] ?? null
  }

  function hasFeature(featureName: string): boolean {
	  return features.value.includes(featureName)
  }

  const definition = computed(
	  () => EXPERIENCE_DEFINITIONS[experience.value] || EXPERIENCE_DEFINITIONS.dashboard
  )

  // ----------------------------------------------------------
  // ACTIONS
  // ----------------------------------------------------------
  function buildQuery(extra: Record<string, string>): Record<string, string> {
	  return {
		  ...Object.fromEntries(
			  Object.entries(route.query).filter(([, v]) => typeof v === 'string') as [string, string][]
		  ),
		  ...extra,
	  }
  }

  function switchExperience(key: ExperienceKey) {
	  experience.value = key
	  const def = EXPERIENCE_DEFINITIONS[key]
	  const extra: Record<string, string> = { experience: key }
	  if (def) extra.display = def.defaultDisplay
		  router.push({ query: buildQuery(extra) })
  }

  function switchDisplay(mode: DisplayType) {
	  displayMode.value = mode
	  router.push({ query: buildQuery({ display: mode }) })
  }

  // ----------------------------------------------------------
  // COMPUTED COLLECTIONS
  // ----------------------------------------------------------
  const allZones = computed(() => {
	  const architecture = displayArchitecture.value
	  if (!architecture) return []
		  return Object.entries(architecture).map(([key, zone]) => ({
			  key,
			  ...zone,
		  }))
  })

  function getZonesByPosition(
	  row: number,
	  column: number
  ): Array<{ key: string; zone: DisplayZone }> {
	  const architecture = displayArchitecture.value
	  if (!architecture) return []

		  return Object.entries(architecture)
		  .filter(([, zone]) => zone.position?.row === row && zone.position?.column === column)
		  .map(([key, zone]) => ({ key, zone }))
  }

  // ----------------------------------------------------------
  // WATCHERS
  // ----------------------------------------------------------
  watch(
	  () => group.value?.type,
		  (newType) => {
		  if (!newType) return

			  const available = availableExperiences.value
			  if (available.includes(experience.value)) return

				  const fallback = defaultExperience.value
				  const next = fallback && available.includes(fallback) ? fallback : available[0]

				  if (next && next !== experience.value) switchExperience(next)
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

	  // Helpers
	  getZonesByContent,
	  getZone,
	  getZonesByPosition,
	  hasFeature,
  }
}
