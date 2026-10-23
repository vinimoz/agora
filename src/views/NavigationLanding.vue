<!--
  SPDX-FileCopyrightText: 2026 Nextcloud contributors
  SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter, type RouteLocationRaw } from 'vue-router'
import { t } from '@nextcloud/l10n'
import { generateUrl } from '@nextcloud/router'
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

const route = useRoute()
const router = useRouter()
const groupsStore = useInquiryGroupsStore()
const inquiriesStore = useInquiriesStore()
const sessionStore = useSessionStore()

/* ------------------------------------------------------------------ */
/* BRANDING — driven by homeDefaults.hero                              */
/* ------------------------------------------------------------------ */
const cityName = computed(() => HOME_DEFAULTS.hero?.cityName || 'Agora')
const tagline = computed(() => HOME_DEFAULTS.hero?.tagline || '')

/* ------------------------------------------------------------------ */
/* USER ROLES                                                          */
/* ------------------------------------------------------------------ */
const isAdmin = computed(() => sessionStore.currentUser?.isAdmin === true)
const isManager = computed(() => isAdmin.value || sessionStore.currentUser?.isGroupEditor === true)

/* ------------------------------------------------------------------ */
/* NAV TYPES                                                           */
/* ------------------------------------------------------------------ */
type NavTarget = RouteLocationRaw

interface NavChild {
  key: string
  label: string
  icon?: unknown
  to: NavTarget
  visible?: () => boolean
}

interface NavItem {
  key: string
  label: string
  icon: unknown
  to: NavTarget
  children?: NavChild[]
  visible?: () => boolean
}

/* ------------------------------------------------------------------ */
/* MY ACTIVITY — personal shortcuts                                    */
/* ------------------------------------------------------------------ */
const myActivityNav: NavChild[] = [
  {
    key: 'participated',
    label: t('agora', 'My participations'),
    icon: NavigationIcons.Participated,
    to: { name: 'list', params: { type: 'participated' } },
  },
  {
    key: 'shared_activity',
    label: t('agora', 'Shared with me'),
    icon: NavigationIcons.Share,
    to: { name: 'list', params: { type: 'shared' } },
  },
]
/* ------------------------------------------------------------------ */
/* PRIMARY NAVIGATION                                                  */
/* ------------------------------------------------------------------ */
const primaryNav = computed<NavItem[]>(() => [
  {
    key: 'landing',
    label: t('agora', 'Home'),
    icon: InquiryGeneralIcons.Home,
    to: { name: 'home' },
  },

  /* Participate — discovery of inquiries to contribute to. */
  {
    key: 'participate',
    label: t('agora', 'Participate'),
    icon: InquiryGeneralIcons.MessageSquare,
    to: {
      name: 'explore',
      params: { type: 'relevant' },
      query: { filter: 'for_you' },
    },
    children: [
      {
        key: 'for_you',
        label: t('agora', 'For you'),
        icon: NavigationIcons.Relevant,
        to: {
          name: 'explore',
          params: { type: 'relevant' },
          query: { filter: 'for_you' },
        },
      },
      {
        key: 'to_vote',
        label: t('agora', 'To vote'),
        icon: NavigationIcons.Open,
        to: {
          name: 'explore',
          params: { type: 'relevant' },
          query: { filter: 'to_vote' },
        },
      },
      {
        key: 'debates',
        label: t('agora', 'Debates'),
        icon: NavigationIcons.Participated,
        to: {
          name: 'explore',
          params: { type: 'relevant' },
          query: { filter: 'debates' },
        },
      },
    ],
  },

  /* Personal — ownership-oriented views. */
  {
    key: 'personal',
    label: t('agora', 'Personal'),
    icon: NavigationIcons.MyInquiries,
    to: { name: 'list', params: { type: 'my' } },
    children: [
      {
        key: 'my_inquiries',
        label: t('agora', 'My inquiries'),
        icon: NavigationIcons.MyInquiries,
        to: { name: 'list', params: { type: 'my' } },
      },
      {
        key: 'private',
        label: t('agora', 'Private'),
        icon: NavigationIcons.Private,
        to: { name: 'list', params: { type: 'private' } },
      },
      {
        key: 'shared',
        label: t('agora', 'Shared with me'),
        icon: NavigationIcons.Share,
        to: { name: 'list', params: { type: 'shared' } },
      },
      {
        key: 'my_groups',
        label: t('agora', 'My groups'),
        icon: NavigationIcons.Group,
        to: { name: 'list', params: { type: 'group' } },
      },
      {
        key: 'rejected',
        label: t('agora', 'Rejected'),
        icon: NavigationIcons.ShieldAlert,
        to: { name: 'list', params: { type: 'reject' } },
        visible: () => sessionStore.appPermissions.inquiryCreation,
      },
    ],
  },

  /* Management — moderator / admin views. */
  {
    key: 'management',
    label: t('agora', 'Management'),
    icon: NavigationIcons.Administration,
    to: { name: 'list', params: { type: 'moderate' } },
    visible: () => isManager.value,
    children: [
      {
        key: 'moderate',
        label: t('agora', 'To moderate'),
        icon: NavigationIcons.Moderate,
        to: { name: 'list', params: { type: 'moderate' } },
      },
      {
        key: 'administration',
        label: t('agora', 'Administration'),
        icon: NavigationIcons.Administration,
        to: { name: 'list', params: { type: 'admin' } },
        visible: () => isAdmin.value,
      },
      {
        key: 'all',
        label: t('agora', 'All inquiries'),
        icon: NavigationIcons.All,
        to: { name: 'list', params: { type: 'all' } },
      },
      {
        key: 'open',
        label: t('agora', 'Open'),
        icon: NavigationIcons.Open,
        to: { name: 'list', params: { type: 'open' } },
      },
      {
        key: 'closed',
        label: t('agora', 'Closed'),
        icon: NavigationIcons.Closed,
        to: { name: 'list', params: { type: 'closed' } },
      },
    ],
  },

  /* Explore — dynamic families from inquiryFamilyTab. */
  {
    key: 'explore',
    label: t('agora', 'Explore'),
    icon: InquiryGeneralIcons.Compass,
    to: { name: 'explore', params: { type: 'relevant' } },
    children: [],
  },

  /* My spaces — dynamic families that own at least one root group type.
     Rendered like Explore: click expands children inline. */
  {
    key: 'my_spaces',
    label: t('agora', 'My spaces'),
    icon: InquiryGeneralIcons.FolderMultiple,
    to: { name: 'explore-spaces' },
    children: [],
  },

  /* My activity — personal shortcuts, rendered inline like Explore. */
  {
    key: 'my_activity',
    label: t('agora', 'My activity'),
    icon: NavigationIcons.Participated,
    to: { name: 'list', params: { type: 'participated' } },
    children: myActivityNav,
  },

  /* News — cross-cutting feed of published, accessible inquiries. */
  {
    key: 'news',
    label: t('agora', 'News'),
    icon: InquiryGeneralIcons.Megaphone,
    to: {
      name: 'explore',
      params: { type: 'relevant' },
      query: { family: 'collective', display: 'feed' },
    },
  },

  /* Services — spaces of the "service" family. */
  {
    key: 'services',
    label: t('agora', 'Services'),
    icon: InquiryGeneralIcons.Apps,
    to: {
      name: 'group-list',
      params: { slug: '' },
      query: { family: 'service', viewMode: 'group' },
    },
  },

  /* Agenda — dated consultations and deadlines. */
  {
    key: 'agenda',
    label: t('agora', 'Agenda'),
    icon: InquiryGeneralIcons.Calendar,
    to: {
      name: 'explore',
      params: { type: 'relevant' },
      query: { display: 'timeline' },
    },
  },

  /* Archives — archived / expired inquiries, no groups. */
  {
    key: 'archives',
    label: t('agora', 'Archives'),
    icon: InquiryGeneralIcons.Archive,
    to: { name: 'list', params: { type: 'archived' } },
  },
])

const visiblePrimaryNav = computed(() =>
  primaryNav.value.filter((item) => !item.visible || item.visible())
)

function hasChildren(item: NavItem): boolean {
  if (item.key === 'explore') return true
  if (item.key === 'my_spaces') return true
  return Array.isArray(item.children) && item.children.length > 0
}

function visibleChildren(item: NavItem): NavChild[] {
  return (item.children || []).filter((c) => !c.visible || c.visible())
}

/* ------------------------------------------------------------------ */
/* EXPLORE — dynamic families from appSettings.inquiryFamilyTab        */
/* ------------------------------------------------------------------ */
interface FamilyEntry {
  key: string
  label: string
  icon: unknown
}

const explorerFamilies = computed<FamilyEntry[]>(() => {
  const tab = sessionStore.appSettings?.inquiryFamilyTab || []
  return tab
    .filter((f: { is_root?: boolean }) => f.is_root !== false)
    .map((f: { family_type?: string; type?: string; label?: string; icon?: string }) => ({
      key: f.family_type || f.type || '',
      label: f.label || f.family_type || '',
      icon:
        (InquiryGeneralIcons as Record<string, unknown>)[f.icon as string] ||
        InquiryGeneralIcons.FolderMultiple,
    }))
})

/* ------------------------------------------------------------------ */
/* MY SPACES — families owning at least one root group type            */
/* ------------------------------------------------------------------ */
interface SpaceFamily extends FamilyEntry {
  rootTypes: Array<{ group_type?: string; type?: string }>
}

function familyKeyOf(f: { family_type?: string; type?: string }): string {
  return f.family_type || f.type || ''
}

const mySpaceFamilies = computed<SpaceFamily[]>(() => {
  const families = sessionStore.appSettings?.inquiryFamilyTab || []
  const groupTypes = sessionStore.appSettings?.inquiryGroupTypeTab || []

  return families
    .filter((f: { is_root?: boolean }) => f.is_root !== false)
    .map((family: { family_type?: string; type?: string; label?: string; icon?: string }) => {
      const key = familyKeyOf(family)
      const rootTypes = groupTypes.filter(
        (gt: { family?: string; family_type?: string; is_root?: boolean }) =>
          gt.is_root === true && (gt.family === key || gt.family_type === key)
      )
      return {
        key,
        label: family.label || key,
        icon:
          (InquiryGeneralIcons as Record<string, unknown>)[family.icon as string] ||
          InquiryGeneralIcons.FolderMultiple,
        rootTypes,
      }
    })
    .filter((f) => f.rootTypes.length > 0 && f.key !== '')
})

/* ------------------------------------------------------------------ */
/* ACTIVE STATE                                                        */
/* ------------------------------------------------------------------ */
function isChildActive(child: NavChild): boolean {
  const target = child.to as {
    name?: string
    params?: Record<string, unknown>
    query?: Record<string, unknown>
  }

  if (route.name !== target.name) return false

  if (target.params) {
    for (const [key, value] of Object.entries(target.params)) {
      if (route.params[key] !== value) return false
    }
  }
  if (target.query) {
    for (const [key, value] of Object.entries(target.query)) {
      if (route.query[key] !== value) return false
    }
  }
  return true
}

function isSpaceFamilyActive(key: string): boolean {
  return route.name === 'group-list' && route.query.family === key
}

function isActive(item: NavItem): boolean {
  if (item.key === 'landing') {
    return route.name === 'home'
  }

  if (item.key === 'my_spaces') {
    if (route.name === 'explore-spaces') return true
    return mySpaceFamilies.value.some((f) => isSpaceFamilyActive(f.key))
  }

  if (item.children?.some((child) => isChildActive(child))) {
    return true
  }

  if (route.query.family === item.key) return true
  if (
    item.key === 'news' &&
    route.query.family === 'collective' &&
    route.query.display === 'feed'
  ) {
    return true
  }
  if (item.key === 'services' && route.query.family === 'service') return true
  if (item.key === 'agenda' && route.query.display === 'timeline') return true
  if (item.key === 'archives' && route.name === 'list' && route.params.type === 'archived') {
    return true
  }
  if (
    item.key === 'explore' &&
    route.name === 'explore' &&
    !route.query.family &&
    !route.query.display &&
    !route.query.filter
  ) {
    return true
  }
  return false
}

/* ------------------------------------------------------------------ */
/* NAVIGATION HELPERS                                                  */
/* ------------------------------------------------------------------ */
function goTo(item: NavItem) {
  router.push(item.to)
}

function goToChild(child: NavChild) {
  router.push(child.to)
}

/**
 * Explore → family. Stays in the landing experience so the user keeps the
 * discovery sidebar while browsing a family's content.
 */
function goToFamily(key: string) {
  inquiriesStore.setFamilyType(key)
  router.push({
    name: 'explore',
    params: { type: 'relevant' },
    query: { family: key, viewMode: 'view' },
  })
}

/**
 * My spaces → family. Hands over to the group view where NavigationGroup
 * takes over the sidebar. Mirrors NavigationMenu.navigateToFamilyInquiries.
 */
function goToFamilySpaces(key: string) {
  inquiriesStore.setFamilyType(key)
  router.push({
    name: 'group-list',
    params: { slug: '' },
    query: { family: key, viewMode: 'group' },
  })
}

function goToAllSpaces() {
  router.push({ name: 'explore-spaces' })
}

/* Preferences — until a dedicated route exists we link to the user's
   Nextcloud settings page. */
const preferencesUrl = generateUrl('/settings/user')

/* ------------------------------------------------------------------ */
/* LIFECYCLE                                                           */
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
          <div class="nav-brand__name">
            Agora
          </div>
          <div class="nav-brand__sub">
            {{ cityName }}
          </div>
        </div>
      </div>

      <!-- ============================================================ -->
      <!-- PRIMARY NAVIGATION — all expandable items live here          -->
      <!-- ============================================================ -->
      <NcAppNavigationList>
        <NcAppNavigationItem
          v-for="item in visiblePrimaryNav"
          :key="item.key"
          :name="item.label"
          :class="{ 'is-active': isActive(item) }"
          :allow-collapse="hasChildren(item)"
          @click="goTo(item)"
        >
          <template #icon>
            <component :is="item.icon" />
          </template>

          <NcAppNavigationList
            v-if="hasChildren(item)"
            class="nav-children"
          >
            <!-- Explore — dynamic families from inquiryFamilyTab -->
            <template v-if="item.key === 'explore'">
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
            </template>

            <!-- My spaces — dynamic space families + All spaces -->
            <template v-else-if="item.key === 'my_spaces'">
              <NcAppNavigationItem
                v-for="family in mySpaceFamilies"
                :key="family.key"
                :name="family.label"
                :class="{ 'is-active': isSpaceFamilyActive(family.key) }"
                @click="goToFamilySpaces(family.key)"
              >
                <template #icon>
                  <component :is="family.icon" />
                </template>
              </NcAppNavigationItem>

              <NcAppNavigationItem
                v-if="mySpaceFamilies.length === 0"
                :name="t('agora', 'No spaces yet')"
                :disabled="true"
                class="nav-hint"
              />

              <NcAppNavigationItem
                :name="t('agora', 'All spaces')"
                @click="goToAllSpaces"
              >
                <template #icon>
                  <component :is="InquiryGeneralIcons.FolderMultiple" />
                </template>
              </NcAppNavigationItem>
            </template>

            <!-- Static children (Participate, Personal, Management, My activity) -->
            <template v-else>
              <NcAppNavigationItem
                v-for="child in visibleChildren(item)"
                :key="child.key"
                :name="child.label"
                :class="{ 'is-active': isChildActive(child) }"
                @click="goToChild(child)"
              >
                <template
                  v-if="child.icon"
                  #icon
                >
                  <component :is="child.icon" />
                </template>
              </NcAppNavigationItem>
            </template>
          </NcAppNavigationList>
        </NcAppNavigationItem>
      </NcAppNavigationList>

      <!-- ============================================================ -->
      <!-- SETTINGS                                                      -->
      <!-- ============================================================ -->
      <NcAppNavigationCaption
        :name="t('agora', 'Settings')"
        class="nav-section-caption"
      />

      <NcAppNavigationList>
        <NcAppNavigationItem
          :name="t('agora', 'Preferences')"
          :href="preferencesUrl"
        >
          <template #icon>
            <component :is="NavigationIcons.Settings" />
          </template>
        </NcAppNavigationItem>
      </NcAppNavigationList>

      <!-- Single trailing spacer so the footer illustration never covers
           the last item. Replaces the old blanket padding on every list. -->
      <div
        class="nav-end-spacer"
        aria-hidden="true"
      />
    </template>

    <!-- Footer -->
    <template #footer>
      <div class="nav-footer">
        <img
          :src="islandIllustration"
          alt=""
          class="nav-footer__illustration"
        >
        <p
          v-if="tagline"
          class="nav-footer__tagline"
        >
          {{ tagline }}
        </p>
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

/* Section caption — only used for Settings now, but styled so it reads
   as a proper anchor for the block beneath it. */
:deep(.nav-section-caption) {
  margin-top: 14px;
  padding-top: 10px;
  padding-inline: 16px;
  border-top: 1px solid var(--color-border);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 11px;
  color: var(--color-text-maxcontrast);
}

.nav-children {
  margin-left: 12px;
  border-left: 1px solid var(--color-border);
}

.nav-hint {
  opacity: 0.6;
  font-style: italic;
}

/* A single spacer at the very end replaces the old blanket
   padding-bottom: 180px that was pushing the last sections behind
   the footer. */
.nav-end-spacer {
  height: 170px;
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
    max-width: 160px;
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
