import { computed } from 'vue'
import { useSessionStore } from '../stores/session'
import { HOME_DEFAULTS } from './homeDefaults'
import type { HomeConfig } from '../Types/appSettings.types.ts'

export function useHomeConfig() {
  const session = useSessionStore()

  const config = computed<HomeConfig>(() => {
    const override = session.appSettings?.home
    if (!override) return HOME_DEFAULTS

    return {
      sections: override.sections ?? HOME_DEFAULTS.sections,

      // ── Deep merge: hero ─────────────────────────────────────────────
      hero: {
        ...HOME_DEFAULTS.hero,
        ...override.hero,
        actions: override.hero?.actions ?? HOME_DEFAULTS.hero.actions,
      },

      // ── Deep merge: promo ────────────────────────────────────────────
      // Every field is optional in the override; any missing key falls
      // back to HOME_DEFAULTS.promo. This previously did not exist, so a
      // server-provided promo was always ignored.
      promo: {
        ...HOME_DEFAULTS.promo,
        ...override.promo,
      },

      services: override.services ?? HOME_DEFAULTS.services,

      relevance: {
        ...HOME_DEFAULTS.relevance,
        ...override.relevance,
        // Preserve nested defaults if the override supplies only one half
        tiers:   override.relevance?.tiers   ?? HOME_DEFAULTS.relevance.tiers,
        weights: {
          ...HOME_DEFAULTS.relevance.weights,
          ...override.relevance?.weights,
        },
      },
    }
  })

  return { config }
}
