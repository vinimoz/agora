<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { t } from '@nextcloud/l10n'
import NcAppNavigation from '@nextcloud/vue/components/NcAppNavigation'
import NcAppNavigationList from '@nextcloud/vue/components/NcAppNavigationList'
import NcAppNavigationItem from '@nextcloud/vue/components/NcAppNavigationItem'
import NcAppNavigationCaption from '@nextcloud/vue/components/NcAppNavigationCaption'

import islandIllustration from '../assets/img/island-illustration.png'
import { AgoraAppIcon } from '../components/AppIcons'
import { InquiryGeneralIcons, NavigationIcons } from '../utils/icons'
import { HOME_DEFAULTS } from '../composables/homeDefaults'
import { useInquiryGroupsStore } from '../stores/inquiryGroups'
import { useInquiriesStore } from '../stores/inquiries'
import { useSessionStore } from '../stores/session'
import type { InquiryGroup } from '../stores/inquiryGroups.types'

const route = useRoute()
const router = useRouter()
const groupsStore = useInquiryGroupsStore()
const inquiriesStore = useInquiriesStore()
const sessionStore = useSessionStore()

/* ------------------------------------------------------------------ */
/* BRANDING — driven by homeDefaults.hero                             */
/* ------------------------------------------------------------------ */
const cityName = computed(() => HOME_DEFAULTS.hero?.cityName || 'Agora')
const tagline = computed(() => HOME_DEFAULTS.hero?.tagline || '')

/* ------------------------------------------------------------------ */
/* PRIMARY NAV                                                        */
/* ------------------------------------------------------------------ */
interface NavChild {
  key: string
  label: string
  to: { name: string; params?: Record<string, any>; query?: Record<string, any> }
}

interface NavItem {
  key: string
  label: string
  icon: any
  to: { name: string; params?: Record<string, any>; query?: Record<string, any> }
  children?: NavChild[]
}

const primaryNav: NavItem[] = [
  {
    key: 'landing',
    label: t('agora', 'Home'),
    icon: InquiryGeneralIcons.Home,
    to: { name: 'home' },
  },
  {
    key: 'participate',
    label: t('agora', 'Participate'),
    icon: InquiryGeneralIcons.MessageSquare,
    to: { name: 'explore', params: { type: 'relevant' } },
    children: [
      {
        key: 'for_you',
        label: t('agora', 'For you'),
        to: { name: 'explore', params: { type: 'relevant' }, query: { filter: 'for_you' } },
      },
      {
        key: 'my_participations',
        label: t('agora', 'My participations'),
        to: { name: 'list', params: { type: 'participated' } },
      },
      {
        key: 'my_spaces',
        label: t('agora', 'My spaces'),
        to: { name: 'explore-spaces' },
      },
    ],
  },
  {
    key: 'explore',
    label: t('agora', 'Explore'),
    icon: InquiryGeneralIcons.Compass,
    to: { name: 'menu' },
    children: [], // filled dynamically below from inquiryFamilyTab
  },
  {
    key: 'news',
    label: t('agora', 'News'),
    icon: InquiryGeneralIcons.Megaphone,
    to: { name: 'explore', params: { type: 'relevant' }, query: { family: 'collective', display: 'feed' } },
  },
  {
    key: 'services',
    label: t('agora', 'Services'),
    icon: InquiryGeneralIcons.Apps,
    to: { name: 'menu', params: { family: 'service' } },
  },
  {
    key: 'agenda',
    label: t('agora', 'Agenda'),
    icon: InquiryGeneralIcons.Calendar,
    to: { name: 'explore', params: { type: 'relevant' }, query: { display: 'timeline' } },
  },
  {
    key: 'archives',
    label: t('agora', 'Archives'),
    icon: InquiryGeneralIcons.Archive,
    to: { name: 'group-archived' },
  },
]

/* ------------------------------------------------------------------ */
/* MY ACTIVITY — personal views of inquiries.                         */
/* These routes target /list/:type (admin sidebar). Clicking them     */
/* swaps the left navigation from NavigationLanding to Navigation.    */
/* ------------------------------------------------------------------ */
const myActivityNav = [
  {
    key: 'my',
    label: t('agora', 'My inquiries'),
    icon: NavigationIcons.MyInquiries,
    to: { name: 'list', params: { type: 'my' } },
  },
  {
    key: 'shared',
    label: t('agora', 'Shared with me'),
    icon: NavigationIcons.Share,
    to: { name: 'list', params: { type: 'shared' } },
  },
  {
    key: 'participated',
    label: t('agora', 'My participations'),
    icon: NavigationIcons.Participated,
    to: { name: 'list', params: { type: 'participated' } },
  },
  {
    key: 'group',
    label: t('agora', 'My groups'),
    icon: NavigationIcons.Group,
    to: { name: 'list', params: { type: 'group' } },
  },
  {
    key: 'private',
    label: t('agora', 'Private'),
    icon: NavigationIcons.Private,
    to: { name: 'list', params: { type: 'private' } },
  },
  {
    key: 'archived',
    label: t('agora', 'Archived'),
    icon: NavigationIcons.Archive,
    to: { name: 'list', params: { type: 'archived' } },
  },
]

/* ------------------------------------------------------------------ */
/* EXPLORE — dynamic families from appSettings.inquiryFamilyTab       */
/* ------------------------------------------------------------------ */
const explorerFamilies = computed(() => {
  const tab = sessionStore.appSettings?.inquiryFamilyTab || []
  return tab
    .filter((f: any) => f.is_root !== false)
    .map((f: any) => ({
      key: f.family_type || f.type,
      label: f.label || f.family_type,
      icon: InquiryGeneralIcons[f.icon] || InquiryGeneralIcons.FolderMultiple,
    }))
})

/* ------------------------------------------------------------------ */
/* MY SPACES — InquiryGroups the user belongs to                      */
/* ------------------------------------------------------------------ */
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
  if (group.owner?.id === uid) return true
  if (sessionStore.currentUser?.isAdmin) return true

  const cfg = group.configuration
  if (!cfg) return false

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

const mySpaces = computed<InquiryGroup[]>(() => {
  const uid = sessionStore.currentUser?.id
  if (!uid) return []
  return groupsStore.inquiryGroupsSorted
    .filter((g) => isEmptyParentId(g.parentId))
    .filter((g) => belongsToSpace(g, uid))
    .slice(0, 6)
})

/* ------------------------------------------------------------------ */
/* ACTIVE STATE                                                       */
/* ------------------------------------------------------------------ */
function isActive(item: NavItem): boolean {
  if (item.key === 'landing') {
    return route.name === 'home'
  }
  if (item.key === 'news' && route.query.family === 'collective' && route.query.display === 'feed') return true
  if (item.key === 'services' && route.name === 'menu' && route.params.family === 'service') return true
  if (item.key === 'agenda' && route.query.display === 'timeline') return true
  if (item.key === 'archives' && route.name === 'group-archived') return true
  if (item.key === 'explore' && route.name === 'menu' && route.params.family === undefined) return true
  if (route.query.family === item.key) return true
  return false
}

/* ------------------------------------------------------------------ */
/* NAVIGATION HELPERS                                                 */
/* ------------------------------------------------------------------ */
function goTo(item: NavItem) {
  router.push(item.to)
}

function goToChild(child: NavChild) {
  router.push(child.to)
}

function goToFamily(key: string) {
  inquiriesStore.setFamilyType(key)
  router.push({
    name: 'list',
    params: { type: 'relevant' },
    query: { family: key, viewMode: 'view' },
  })
}

function goToGroup(group: InquiryGroup) {
  if (group.slug) {
    router.push({ name: 'group-list', params: { slug: group.slug } })
  } else if (group.id) {
    router.push({ name: 'group', params: { id: String(group.id) } })
  }
}

function goToMenu() {
  router.push({ name: 'menu' })
}

function getGroupIcon(type: string) {
  const map: Record<string, any> = {
    commune: InquiryGeneralIcons.Home,
    environment: InquiryGeneralIcons.Leaf,
    neighborhood: InquiryGeneralIcons.MapMarker,
    association: InquiryGeneralIcons.Users,
    council: InquiryGeneralIcons.Gavel,
  }
  return map[type] || InquiryGeneralIcons.FolderMultiple
}

/* ------------------------------------------------------------------ */
/* LIFECYCLE                                                          */
/* ------------------------------------------------------------------ */
onMounted(() => {
  if (typeof groupsStore.fetchAllGroups === 'function') {
    groupsStore.fetchAllGroups()
  }
})
</script>

<template>
  <NcAppNavigation :aria-label="t('agora', 'Agora navigation')">
    <template #list>
      <!-- Brand -->
      <div class="nav-brand">
        <div class="nav-brand__mark">
          <AgoraAppIcon :size="32" />
        </div>
        <div class="nav-brand__text">
          <div class="nav-brand__name">Agora</div>
          <div class="nav-brand__sub">{{ cityName }}</div>
        </div>
      </div>

      <!-- PRIMARY NAVIGATION -->
      <NcAppNavigationList>
        <NcAppNavigationItem
          v-for="item in primaryNav"
          :key="item.key"
          :name="item.label"
          :class="{ 'is-active': isActive(item) }"
          :allow-collapse="item.key === 'participate' || item.key === 'explore'"
          @click="goTo(item)"
        >
          <template #icon>
            <component :is="item.icon" />
          </template>

          <!-- Participate sub-items -->
          <NcAppNavigationList v-if="item.key === 'participate' && item.children" class="nav-children">
            <NcAppNavigationItem
              v-for="child in item.children"
              :key="child.key"
              :name="child.label"
              @click="goToChild(child)"
            />
          </NcAppNavigationList>

          <!-- Explore sub-items — generated from inquiryFamilyTab -->
          <NcAppNavigationList v-if="item.key === 'explore'" class="nav-children">
            <NcAppNavigationItem
              v-for="family in explorerFamilies"
              :key="family.key"
              :name="family.label"
              @click="goToFamily(family.key)"
            >
              <template #icon>
                <component :is="family.icon" />
              </template>
            </NcAppNavigationItem>
            <NcAppNavigationItem
              v-if="explorerFamilies.length === 0"
              :name="t('agora', 'No families configured')"
              :disabled="true"
              class="nav-hint"
            />
          </NcAppNavigationList>
        </NcAppNavigationItem>
      </NcAppNavigationList>

      <!-- MY SPACES -->
      <NcAppNavigationCaption :name="t('agora', 'My spaces')" />

      <NcAppNavigationList>
        <NcAppNavigationItem
          v-for="group in mySpaces"
          :key="group.id"
          :name="group.title"
          @click="goToGroup(group)"
        >
          <template #icon>
            <component :is="getGroupIcon(group.type)" />
          </template>
        </NcAppNavigationItem>

        <NcAppNavigationItem
          v-if="mySpaces.length === 0"
          :name="t('agora', 'No spaces yet')"
          :disabled="true"
          class="nav-hint"
        />

        <NcAppNavigationItem
          :name="t('agora', 'All spaces')"
          @click="goToMenu"
        >
          <template #icon>
            <component :is="InquiryGeneralIcons.FolderMultiple" />
          </template>
        </NcAppNavigationItem>
      </NcAppNavigationList>

      <!-- MY ACTIVITY — personal shortcuts (swaps to admin sidebar) -->
      <NcAppNavigationCaption :name="t('agora', 'My activity')" />

      <NcAppNavigationList>
        <NcAppNavigationItem
          v-for="item in myActivityNav"
          :key="item.key"
          :name="item.label"
          :to="item.to"
        >
          <template #icon>
            <component :is="item.icon" />
          </template>
        </NcAppNavigationItem>
      </NcAppNavigationList>
    </template>

    <!-- Footer -->
    <template #footer>
      <div class="nav-footer">
        <img
          :src="islandIllustration"
          alt=""
          class="nav-footer__illustration"
        />
        <p v-if="tagline" class="nav-footer__tagline">{{ tagline }}</p>
      </div>
    </template>
  </NcAppNavigation>
</template>

<style lang="scss" scoped>
.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px 10px;

  &__mark {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: var(--color-primary-light);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary-element);
  }

  &__name {
    font-size: 16px;
    font-weight: 700;
    color: var(--color-main-text);
    line-height: 1.1;
  }

  &__sub {
    font-size: 11px;
    color: var(--color-text-lighter);
  }
}

:deep(.app-navigation-entry.is-active) {
  background: var(--color-primary-light);
  font-weight: 600;
}

.nav-children {
  margin-left: 12px;
  border-left: 1px solid var(--color-border);
}

.nav-hint {
  opacity: 0.6;
  font-style: italic;
}

:deep(.app-navigation__list) {
  padding-bottom: 180px;
}

.nav-footer {
  position: relative;
  z-index: 1;
  padding: 16px;
  text-align: center;
  border-top: 1px solid var(--color-border);
  background: var(--color-main-background);

  &__illustration {
    width: 100%;
    max-width: 180px;
    display: block;
    margin: 0 auto 8px;
    opacity: 0.9;
  }

  &__tagline {
    margin: 0;
    font-size: 12px;
    font-style: italic;
    color: var(--color-text-lighter);
    line-height: 1.4;
  }
}
</style>
