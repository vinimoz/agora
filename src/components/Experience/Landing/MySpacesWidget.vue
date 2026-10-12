<template>
  <section v-if="familiesWithTypes.length > 0" class="my-spaces">
    <header class="my-spaces__header">
      <div class="my-spaces__header-left">
        <component :is="Icons.Users" :size="20" class="my-spaces__icon" />
        <h2>{{ resolvedTitle }}</h2>
      </div>
    </header>
    <p v-if="resolvedSubtitle" class="my-spaces__subtitle">{{ resolvedSubtitle }}</p>

    <!-- ============================================================
         CHIPS — icon + label + description + group count
         ============================================================ -->
    <div v-if="variant === 'chips'" class="my-spaces__chips">
      <button
        v-for="family in familiesWithTypes"
        :key="family.family_type"
        type="button"
        class="family-chip"
        @click="emit('selectFamily', family.family_type)"
      >
        <span class="family-chip__icon-badge">
          <component :is="familyIcon(family)" :size="20" />
        </span>

        <span class="family-chip__body">
          <span class="family-chip__label">{{ familyLabel(family) }}</span>
          <span
            v-if="familyDescription(family)"
            class="family-chip__description"
          >
            {{ familyDescription(family) }}
          </span>
        </span>

        <span
          v-if="groupCount(family.family_type) > 0"
          class="family-chip__count"
          :title="t('agora', '{n} groups', { n: groupCount(family.family_type) })"
        >
          {{ groupCount(family.family_type) }}
        </span>
      </button>
    </div>

    <!-- STACKED and COMPACT unchanged -->
    <div
      v-else-if="variant === 'stacked'"
      class="my-spaces__grid my-spaces__grid--stacked"
      :style="{ gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}px, 1fr))` }"
    >
      <FamilyGroupTypesWidget
        v-for="family in familiesWithTypes"
        :key="family.family_type"
        :family="family.family_type"
        layout="card"
        :limit="limitPerFamily"
        :show-cta="showCtaPerFamily"
        @select="(key) => emit('select', { family: family.family_type, key })"
        @all="() => emit('all', { family: family.family_type })"
      />
    </div>
    <div v-else class="my-spaces__grid my-spaces__grid--compact">
      <FamilyGroupTypesWidget
        v-for="family in familiesWithTypes"
        :key="family.family_type"
        :family="family.family_type"
        layout="inline"
        :limit="limitPerFamily"
        @select="(key) => emit('select', { family: family.family_type, key })"
        @all="() => emit('all', { family: family.family_type })"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { t } from '@nextcloud/l10n'
import { InquiryGeneralIcons as Icons } from '../../../utils/icons'
import { useSessionStore } from '../../../stores/session.ts'
import { useInquiryGroupsStore } from '../../../stores/inquiryGroups.ts'
import FamilyGroupTypesWidget from './FamilyGroupTypesWidget.vue'

const props = withDefaults(
  defineProps<{
    variant?: 'chips' | 'stacked' | 'compact'
    families?: string[]
    limitPerFamily?: number
    showCtaPerFamily?: boolean
    minColumnWidth?: number
    title?: string
    subtitle?: string
  }>(),
  {
    variant: 'stacked',
    families: () => [],
    limitPerFamily: 0,
    showCtaPerFamily: false,
    minColumnWidth: 320,
    title: '',
    subtitle: '',
  },
)

const emit = defineEmits<{
  select: [payload: { family: string; key: string }]
  all: [payload: { family: string }]
  selectFamily: [family: string]
}>()

const sessionStore = useSessionStore()
const groupsStore = useInquiryGroupsStore()

const resolvedTitle = computed(() => props.title || t('agora', 'My spaces'))
const resolvedSubtitle = computed(() => props.subtitle || '')

const familiesWithTypes = computed(() => {
  const allFamilies = sessionStore.appSettings?.inquiryFamilyTab || []
  const allTypes = sessionStore.appSettings?.inquiryGroupTypeTab || []

  const familiesWithRootTypes = new Set(
    allTypes
      .filter((t: any) => t.is_root === true)
      .map((t: any) => t.family),
  )

  return allFamilies.filter((f: any) => {
    if (props.families.length > 0 && !props.families.includes(f.family_type)) {
      return false
    }
    return familiesWithRootTypes.has(f.family_type)
  })
})

// ---------------------------------------------------------------------------
// Chip presentation helpers
// ---------------------------------------------------------------------------
function familyIcon(family: any) {
  const name = family?.icon as string | undefined
  return (name && (Icons as any)[name]) || Icons.FolderMultiple
}

function familyLabel(family: any): string {
  return family?.label || family?.family_type || ''
}

function familyDescription(family: any): string {
  return family?.description || ''
}

// ---------------------------------------------------------------------------
// Live non-archived group counts per family
// ---------------------------------------------------------------------------
const typeToFamily = computed<Record<string, string>>(() => {
  const allTypes = sessionStore.appSettings?.inquiryGroupTypeTab || []
  const map: Record<string, string> = {}
  for (const ty of allTypes) {
    const key = ty.group_type || ty.type
    if (key && ty.family) map[key] = ty.family
  }
  return map
})

const groupCountsByFamily = computed<Record<string, number>>(() => {
  const counts: Record<string, number> = {}
  for (const g of groupsStore.inquiryGroups || []) {
    if (g.status?.groupStatus === 'archived') continue
    const fam = typeToFamily.value[g.type]
    if (fam) counts[fam] = (counts[fam] || 0) + 1
  }
  return counts
})

function groupCount(familyKey: string): number {
  return groupCountsByFamily.value[familyKey] || 0
}
</script>

<style lang="scss" scoped>
.my-spaces {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .my-spaces__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .my-spaces__header-left {
      display: flex;
      align-items: center;
      gap: 10px;

      .my-spaces__icon { color: var(--color-primary-element); }

      h2 {
        margin: 0;
        font-size: 20px;
        font-weight: 700;
        color: var(--color-main-text);
      }
    }
  }

  .my-spaces__subtitle {
    margin: -6px 0 2px 0;
    font-size: 13px;
    color: var(--color-text-lighter);
  }
}

/* ============================================================
   CHIPS — richer family cards with description + count
   ============================================================ */
.my-spaces__chips {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 10px;

  .family-chip {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
    background:    var(--color-main-background);
    border:        1px solid var(--color-border);
    border-radius: 12px;
    color:         var(--color-main-text);
    text-align:    left;
    cursor:        pointer;
    transition:    all 0.15s ease;
    min-height:    64px;

    .family-chip__icon-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width:  36px;
      height: 36px;
      flex-shrink: 0;
      border-radius: 10px;
      background: var(--color-primary-light);
      color: var(--color-primary-element);
    }

    .family-chip__body {
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      min-width: 0;
    }

    .family-chip__label {
      font-size: 13px;
      font-weight: 700;
      line-height: 1.2;
      color: var(--color-main-text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .family-chip__description {
      font-size: 11px;
      font-weight: 400;
      line-height: 1.3;
      color: var(--color-text-lighter);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .family-chip__count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 24px;
      height: 24px;
      padding: 0 8px;
      border-radius: 999px;
      background: var(--color-primary-element);
      color: white;
      font-size: 11px;
      font-weight: 700;
      line-height: 1;
      flex-shrink: 0;
    }

    &:hover {
      border-color: var(--color-primary-element);
      background:   var(--color-primary-light);
      transform:    translateY(-1px);

      .family-chip__count {
        background: var(--color-primary-element-hover);
      }
    }

    &:active {
      transform: translateY(0);
    }
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

/* ============================================================
   STACKED — grid of family cards
   ============================================================ */
.my-spaces__grid--stacked {
  display: grid;
  gap: 16px;
  align-items: start;
}

/* ============================================================
   COMPACT — one container, hairline rows
   ============================================================ */
.my-spaces__grid--compact {
  background:    var(--color-main-background);
  border:        1px solid var(--color-border);
  border-radius: 14px;
  overflow:      hidden;

  :deep(.fgt--inline + .fgt--inline) {
    border-top: 1px solid var(--color-border);
  }
}
</style>
