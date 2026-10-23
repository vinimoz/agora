<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <section
    v-if="rootTypes.length > 0"
    class="family-group-types"
  >
    <header
      v-if="showHeader"
      class="section-header"
    >
      <div class="header-left">
        <component
          :is="headerIcon"
          :size="20"
          class="header-icon"
        />
        <h2>{{ resolvedTitle }}</h2>
      </div>
    </header>
    <p
      v-if="showHeader && resolvedSubtitle"
      class="section-subtitle"
    >
      {{ resolvedSubtitle }}
    </p>

    <div class="types-grid">
      <button
        v-for="type in rootTypes"
        :key="type.group_type"
        type="button"
        class="type-tile"
        @click="emit('select', type.group_type)"
      >
        <span class="type-icon">
          <component
            :is="type.icon"
            :size="22"
          />
        </span>
        <span class="type-label">{{ type.label }}</span>
      </button>
    </div>

    <button
      v-if="showCta"
      type="button"
      class="types-cta"
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

/**
 * FamilyGroupTypesWidget
 * ----------------------
 * Renders the root group-type templates of a single inquiry family as tiles.
 * Purely config-driven: all labels/icons come from `inquiryGroupTypeTab` and
 * `inquiryFamilyTab`. No family-specific strings, no group-instance logic.
 *
 * Renders nothing when the family has no root templates.
 */
const props = withDefaults(
  defineProps<{
    /** Inquiry family key. Required. */
    family: string
    /** Max number of tiles. 0 = no limit. */
    limit?: number
    /** Show the family header (icon + label). */
    showHeader?: boolean
    /** Show the "Access all …" CTA. */
    showCta?: boolean
    /** Optional overrides — leave empty to use family config. */
    title?: string
    subtitle?: string
    ctaLabel?: string
  }>(),
  {
    limit: 0,
    showHeader: true,
    showCta: true,
    title: '',
    subtitle: '',
    ctaLabel: '',
  }
)

const emit = defineEmits<{
  select: [groupType: string]
  all: []
}>()

const sessionStore = useSessionStore()

// ---------------------------------------------------------------------------
// Family config — source of all labels/icons
// ---------------------------------------------------------------------------
const familyConfig = computed(
  () =>
    (sessionStore.appSettings?.inquiryFamilyTab || []).find(
      (f: any) => f.family_type === props.family
    ) ?? null
)

const headerIcon = computed(() => {
  const name = familyConfig.value?.icon as string | undefined
  return (name && (Icons as any)[name]) || Icons.FolderMultiple
})

const resolvedTitle = computed(() => props.title || familyConfig.value?.label || props.family)

const resolvedSubtitle = computed(() => props.subtitle || familyConfig.value?.description || '')

const resolvedCta = computed(() => {
  if (props.ctaLabel) return props.ctaLabel
  const label = familyConfig.value?.label || props.family
  return t('agora', 'Access all {family}', { family: label.toLowerCase() })
})

// ---------------------------------------------------------------------------
// Root templates for this family
// ---------------------------------------------------------------------------
const rootTypes = computed(() => {
  const allTypes = sessionStore.appSettings?.inquiryGroupTypeTab || []
  const list = allTypes
    .filter((ty: any) => ty.family === props.family && ty.is_root === true)
    .map((ty: any) => {
      const data = getInquiryGroupTypeData(ty.group_type, allTypes)
      return {
        group_type: ty.group_type,
        label: data.label || ty.group_type,
        icon: data.icon,
      }
    })
  return props.limit > 0 ? list.slice(0, props.limit) : list
})
</script>

<style lang="scss" scoped>
.family-group-types {
  background: var(--color-main-background);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  padding: 16px;

  .section-header .header-left {
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

  .section-subtitle {
    margin: 4px 0 14px 0;
    font-size: 12px;
    color: var(--color-text-lighter);
  }

  .types-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 8px;
  }

  .type-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
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

    .type-icon {
      color: var(--color-primary-element);
    }

    .type-label {
      font-size: 10px;
      font-weight: 600;
      text-align: center;
      line-height: 1.2;
      color: var(--color-main-text);
    }
  }

  .types-cta {
    width: 100%;
    margin-top: 12px;
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
