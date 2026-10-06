import { computed } from 'vue'
import { useSessionStore } from '../stores/session'
import { HOME_DEFAULTS } from './homeDefaults'
import type { HomeConfig } from '../stores/appSettings'

export function useHomeConfig() {
  const session = useSessionStore()

  const config = computed<HomeConfig>(() => {
    const override = session.appSettings?.home
    if (!override) return HOME_DEFAULTS

    // Shallow merge at the top, but merge hero/relevance deeply
    return {
      sections: override.sections ?? HOME_DEFAULTS.sections,
      hero: {
        ...HOME_DEFAULTS.hero,
        ...override.hero,
        actions: override.hero?.actions ?? HOME_DEFAULTS.hero.actions,
      },
      services: override.services ?? HOME_DEFAULTS.services,
      relevance: {
        ...HOME_DEFAULTS.relevance,
        ...override.relevance,
      },
    }
  })

  return { config }
}
