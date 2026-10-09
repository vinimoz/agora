<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <section class="service-family-widget">
    <header class="section-header">
      <div class="header-left">
        <component :is="headerIcon" :size="20" class="header-icon" />
        <div>
          <h2>{{ resolvedTitle }}</h2>
          <p v-if="resolvedSubtitle" class="section-subtitle">{{ resolvedSubtitle }}</p>
        </div>
      </div>
    </header>

    <div v-if="displayTypes.length > 0" class="services-grid">
      <button
        v-for="entry in displayTypes"
        :key="entry.key"
        type="button"
        class="service-tile"
        @click="emit('service', entry.key)"
      >
        <span class="service-icon">
          <component :is="entry.icon" :size="22" />
        </span>
        <span class="service-label">{{ entry.label }}</span>
        <span v-if="entry.count > 0" class="service-count">
          {{ t('agora', '{n} groups', { n: entry.count }) }}
        </span>
      </button>
    </div>

    <div v-else class="services-empty">
      <component :is="headerIcon" :size="28" />
      <p>{{ t('agora', 'No services available yet') }}</p>
    </div>

    <button
      v-if="displayTypes.length > 0"
      type="button"
      class="services-cta"
      @click="emit('all')"
    >
      {{ resolvedCta }} →
    </button>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../../utils/icons'
import { getInquiryGroupTypeData } from '../../../helpers/modules/InquiryHelper.ts'
import { useSessionStore } from '../../../stores/session.ts'
import { useInquiryGroupsStore } from '../../../stores/inquiryGroups.ts'

/**
 * ServiceFamilyWidget
 * -------------------
 * Landing widget that lists the root group types of a given inquiry family
 * (default: `service`), showing only those with at least one live group.
 * Emits `service` on tile click and `all` on the CTA so the parent renderer
 * can translate them into routes.
 *
 * The widget is family-agnostic: pass `family="official"` or
 * `family="oversight"` to reuse it for other families without duplication.
 */
const props = withDefaults(
  defineProps<{
    /** Inquiry family key (e.g. 'service', 'official', 'oversight'). */
    family?: string
    /** Maximum number of group types to display. */
    limit?: number
    /** Optional title override. */
    title?: string
    /** Optional subtitle override. */
    subtitle?: string
    /** Optional CTA label override. */
    ctaLabel?: string
  }>(),
  {
    family: 'service',
    limit: 4,
    title: '',
    subtitle: '',
    ctaLabel: '',
  },
)

const emit = defineEmits<{
  service: [key: string]
  all: []
}>()

const sessionStore = useSessionStore()
const groupsStore = useInquiryGroupsStore()

// ---------------------------------------------------------------------------
// Header presentation
// ---------------------------------------------------------------------------

const headerIcon = computed(() => {
  const families: any[] = sessionStore.appSettings?.inquiryFamilyTab || []
  const family = families.find((f) => f.family_type === props.family)
  const iconName = family?.icon as string | undefined
  if (iconName && (Icons as any)[iconName]) {
    return (Icons as any)[iconName]
  }
  return Icons.Apps
})

const resolvedTitle = computed(() => {
  if (props.title) return props.title
  const families: any[] = sessionStore.appSettings?.inquiryFamilyTab || []
  const family = families.find((f) => f.family_type === props.family)
  return family?.label
    ? t('agora', family.label)
    : t('agora', 'Your online services')
})

const resolvedSubtitle = computed(() => {
  if (props.subtitle) return props.subtitle
  return t('agora', 'Requests, reports, appointments…')
})

const resolvedCta = computed(() => {
  if (props.ctaLabel) return props.ctaLabel
  const families: any[] = sessionStore.appSettings?.inquiryFamilyTab || []
  const family = families.find((f) => f.family_type === props.family)
  return family?.label
    ? t('agora', 'Access all {family}', { family: family.label.toLowerCase() })
    : t('agora', 'Access all services')
})

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

/**
 * Root group types belonging to the configured family.
 * Child types are excluded: they are only reachable from their parent group.
 */
const familyRootTypes = computed(() => {
  const allTypes = sessionStore.appSettings?.inquiryGroupTypeTab || []
  return allTypes.filter(
    (ty) => ty.family === props.family && ty.is_root === true,
  )
})

/**
 * Count the live root groups that belong to a given group type.
 * A "live" group is a root (parentId null) group that is not archived.
 */
function countGroupsForType(typeKey: string): number {
  return groupsStore.inquiryGroups.filter(
    (g) =>
      g.type === typeKey &&
      (g.parentId === null ||
        g.parentId === 0 ||
        g.parentId === undefined) &&
      g.status?.groupStatus !== 'archived',
  ).length
}

/**
 * Display list: root types of the family that own at least one live group,
 * sorted by descending group count, capped to `limit`.
 */
const displayTypes = computed(() => {
  const allTypes = sessionStore.appSettings?.inquiryGroupTypeTab || []
  return familyRootTypes.value
    .map((ty) => {
      const key = ty.group_type
      const count = countGroupsForType(key)
      const data = getInquiryGroupTypeData(key, allTypes)
      return {
        key,
        label: data.label || key,
        icon: data.icon,
        count,
      }
    })
    .filter((entry) => entry.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, props.limit)
})
</script>

<style lang="scss" scoped>
.service-family-widget {
  background: var(--color-main-background);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 16px;

  .section-header {
    .header-left {
      display: flex;
      align-items: center;
      gap: 8px;

      .header-icon {
        color: var(--color-primary-element);
      }

      h2 {
        margin: 0;
        font-size: 15px;
        font-weight: 700;
        color: var(--color-main-text);
      }
    }
  }

  .section-subtitle {
    margin: 4px 0 14px 0;
    font-size: 12px;
    color: var(--color-text-lighter);
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    gap: 8px;
    margin-bottom: 12px;
  }

  .service-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 12px 6px;
    background: var(--color-background-dark);
    border: 1px solid transparent;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      border-color: var(--color-primary-element);
      background: var(--color-primary-light);
      transform: translateY(-2px);
    }

    .service-icon {
      color: var(--color-primary-element);
    }

    .service-label {
      font-size: 11px;
      font-weight: 600;
      text-align: center;
      line-height: 1.2;
      color: var(--color-main-text);
    }

    .service-count {
      font-size: 10px;
      font-weight: 500;
      color: var(--color-text-lighter);
    }
  }

  .services-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 24px 12px;
    color: var(--color-text-lighter);
    font-size: 12px;
    text-align: center;

    p {
      margin: 0;
    }
  }

  .services-cta {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background: var(--color-primary-element);
    color: white;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
      background: var(--color-primary-element-hover);
    }
  }
}
</style>
