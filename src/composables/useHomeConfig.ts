import { computed } from 'vue'
import { useSessionStore } from '../stores/session'
import { getHomeTemplate } from './homeDefaults'
import { ORGANIZATION_TYPES, type OrganizationType } from '../Types/experience.types'
import type { HomeConfig } from '../Types/appSettings.types.ts'

export function useHomeConfig() {
  const session = useSessionStore()

  /**
   * Active organization type, sourced from session.appSettings.organization.type.
   * Falls back to 'municipality' when the server doesn't provide one (i.e.
   * before the DB-backed home config lands) or when the value is invalid.
   */
  const organizationType = computed<OrganizationType>(() => {
    const candidate = session.appSettings?.organization?.type
    if (candidate && (ORGANIZATION_TYPES as readonly string[]).includes(candidate)) {
      return candidate as OrganizationType
    }
    return 'municipality'
  })

  /** The selected template — useful for admin previews ("what would a university see?") */
  const template = computed<HomeConfig>(() => getHomeTemplate(organizationType.value))

  /**
   * Final merged config, resolution order:
   *
   *   1. session.appSettings.home       (tenant-specific override from the DB)
   *   2. HOME_TEMPLATES[organizationType] (org-type defaults)
   *
   * There is no third level: the org-type template is the last resort. If
   * organizationType itself is unknown, getHomeTemplate() already degrades
   * to the municipality template.
   */
  const config = computed<HomeConfig>(() => {
    const override = session.appSettings?.home
    const tpl = template.value
    if (!override) return tpl

    return {
      sections: override.sections ?? tpl.sections,

      // ── Deep merge: hero ─────────────────────────────────────────────
      hero: {
        ...tpl.hero,
        ...override.hero,
        actions: override.hero?.actions ?? tpl.hero.actions,
      },

      // ── Deep merge: promo ────────────────────────────────────────────
      promo: {
        ...tpl.promo,
        ...override.promo,
      },

      relevance: {
        ...tpl.relevance,
        ...override.relevance,
        tiers: override.relevance?.tiers ?? tpl.relevance.tiers,
        weights: {
          ...tpl.relevance.weights,
          ...override.relevance?.weights,
        },
      },
       sectionLabels: { ...tpl.sectionLabels, ...override.sectionLabels },
    }
  })

  return { config, template, organizationType }
}
