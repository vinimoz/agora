<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
  <NcAppContent class="inquiry-group-list-view">
    <div class="content-area">
      <header class="view-header">
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>
      </header>

      <InquiryGroupCatalog :groups="groups" />
    </div>
  </NcAppContent>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { t } from '@nextcloud/l10n'
import NcAppContent from '@nextcloud/vue/components/NcAppContent'
import InquiryGroupCatalog from '../components/InquiryGroup/InquiryGroupCatalog.vue'
import { useInquiryGroupsStore } from '../stores/inquiryGroups.ts'
import { useSessionStore } from '../stores/session.ts'
import type { InquiryGroup } from '../stores/inquiryGroups.types.ts'

const route = useRoute()
const groupsStore = useInquiryGroupsStore()
const sessionStore = useSessionStore()

/**
 * Scope selector:
 *   - 'mine' (default) → only the spaces the current user belongs to
 *   - 'all'            → every root group the user can see
 */
const scope = computed<'mine' | 'all'>(() => {
  const q = route.query.scope
  return q === 'all' ? 'all' : 'mine'
})

const title = computed(() =>
  scope.value === 'mine'
    ? t('agora', 'My spaces')
    : t('agora', 'All spaces'),
)

const description = computed(() =>
  scope.value === 'mine'
    ? t('agora', 'The spaces you belong to or follow')
    : t('agora', 'Every space available to you'),
)

// ---------------------------------------------------------------------------
// Membership helpers — kept in sync with NavigationLanding.vue
// ---------------------------------------------------------------------------

function isEmptyParentId(id: unknown): boolean {
  return id === null || id === undefined || id === 0 || id === '0'
}

function getUserGroupIds(): string[] {
  const g: unknown = sessionStore.currentUser?.groups
  if (!g) return []
  if (Array.isArray(g)) return g
  if (typeof g === 'object') return Object.keys(g as Record<string, unknown>)
  return []
}

function belongsToSpace(group: InquiryGroup, uid: string): boolean {
  // Owner always belongs
  if (group.owner?.id === uid) return true
  // Admins see every space
  if (sessionStore.currentUser?.isAdmin) return true

  const cfg = group.configuration
  if (!cfg) return false

  // Publicly visible space
  if (cfg.visibility === 'everyone') return true

  const userGroups = getUserGroupIds()

  if (
    (cfg.visibility === 'groups' || cfg.visibility === 'group') &&
    Array.isArray(cfg.visibilityGroups) &&
    cfg.visibilityGroups.some((vg) => userGroups.includes(vg))
  ) {
    return true
  }

  if (
    cfg.visibility === 'users' &&
    Array.isArray(cfg.visibilityUsers) &&
    cfg.visibilityUsers.includes(uid)
  ) {
    return true
  }

  return false
}

// ---------------------------------------------------------------------------
// Group selection
// ---------------------------------------------------------------------------

const groups = computed<InquiryGroup[]>(() => {
  const all = groupsStore.inquiryGroupsSorted.filter(
    (g) => isEmptyParentId(g.parentId) && g.status?.groupStatus !== 'archived',
  )

  if (scope.value === 'all') return all

  const uid = sessionStore.currentUser?.id
  if (!uid) return []
  return all.filter((g) => belongsToSpace(g, uid))
})

// ---------------------------------------------------------------------------
// Lifecycle
// ---------------------------------------------------------------------------

onMounted(() => {
  if (groupsStore.inquiryGroups.length === 0) {
    groupsStore.fetchAllGroups?.()
  }
})
</script>

<style lang="scss" scoped>
.inquiry-group-list-view {
  width: 100%;
  min-height: 100vh;

  .content-area {
    max-width: 1600px;
    margin: 0 auto;
    padding: 24px 20px 40px;
  }

  .view-header {
    margin-bottom: 24px;

    h1 {
      margin: 0 0 6px 0;
      font-size: 26px;
      font-weight: 700;
      color: var(--color-main-text);
      line-height: 1.2;
    }

    p {
      margin: 0;
      font-size: 15px;
      color: var(--color-text-lighter);
    }
  }
}
</style>
