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
import { InquiryGeneralIcons } from '../utils/icons'
import { useInquiryGroupsStore } from '../stores/inquiryGroups'
import { useSessionStore } from '../stores/session'
import type { InquiryGroup } from '../stores/inquiryGroups.types'

const route = useRoute()
const router = useRouter()
const groupsStore = useInquiryGroupsStore()
const sessionStore = useSessionStore()

/* ------------------------------------------------------------------ */
/*  ICON RESOLVER — never return undefined                             */
/* ------------------------------------------------------------------ */
const FALLBACK_ICON = InquiryGeneralIcons.FolderMultiple

function pickIcon(...names: string[]): any {
  for (const name of names) {
    const icon = (InquiryGeneralIcons as Record<string, any>)[name]
    if (icon) return icon
  }
  return FALLBACK_ICON
}

/* ------------------------------------------------------------------ */
/*  PRIMARY NAV                                                        */
/* ------------------------------------------------------------------ */
interface NavItem {
  key: string
  label: string
  icon: any
  to: { name: string; query?: Record<string, string> }
  children?: { key: string; label: string }[]
}

const primaryNav: NavItem[] = [
  {
    key: 'landing',
    label: t('agora', 'Home'),
    icon: pickIcon('Home'),
    to: { name: 'home' },
  },
  {
    key: 'news',
    label: t('agora', 'News'),
    icon: pickIcon('Megaphone', 'Flash'),
    to: { name: 'home', query: { section: 'news' } },
  },
  {
    key: 'participate',
    label: t('agora', 'Participate'),
    icon: pickIcon('MessageSquare', 'Comment'),
    to: { name: 'list', query: { experience: 'social' } },
    children: [
      { key: 'debates',       label: t('agora', 'Debates') },
      { key: 'consultations', label: t('agora', 'Consultations') },
      { key: 'petitions',     label: t('agora', 'Petitions') },
    ],
  },
  {
    key: 'marketplace',
    label: t('agora', 'Marketplace'),
    // Storefront isn't in InquiryGeneralIcons → Compass → Apps fallback
    icon: pickIcon('Storefront', 'Compass', 'Apps'),
    to: { name: 'list', query: { experience: 'marketplace' } },
  },
  {
    key: 'trade',
    label: t('agora', 'Trade'),
    // SwapHorizontal isn't in InquiryGeneralIcons → Compare → Compass fallback
    icon: pickIcon('SwapHorizontal', 'Compare', 'Compass'),
    to: { name: 'list', query: { experience: 'marketplace', kind: 'trade' } },
  },
  {
    key: 'social',
    label: t('agora', 'Social'),
    icon: pickIcon('Users'),
    to: { name: 'list', query: { experience: 'social' } },
  },
  {
    key: 'wiki',
    label: t('agora', 'Wiki'),
    icon: pickIcon('Book', 'Document'),
    to: { name: 'list', query: { experience: 'wiki' } },
  },
  {
    key: 'services',
    label: t('agora', 'Services'),
    icon: pickIcon('Apps', 'Lightbulb'),
    to: { name: 'home', query: { section: 'services' } },
    children: [
      { key: 'request', label: t('agora', 'Service requests') },
      { key: 'report',  label: t('agora', 'Reports') },
      { key: 'booking', label: t('agora', 'Bookings') },
    ],
  },
  {
    key: 'agenda',
    label: t('agora', 'Agenda'),
    icon: pickIcon('Calendar'),
    to: { name: 'home', query: { section: 'events' } },
  },
  {
    key: 'archives',
    label: t('agora', 'Archives'),
    // Archive isn't in InquiryGeneralIcons → FolderMultiple fallback
    icon: pickIcon('Archive', 'FolderMultiple'),
    to: { name: 'list', query: { experience: 'classic', filter: 'archived' } },
  },
]

/* ------------------------------------------------------------------ */
/*  MY SPACES                                                          */
/* ------------------------------------------------------------------ */

/** true if the id is empty in any of the shapes your store uses */
function isEmptyParentId(id: unknown): boolean {
  return id === null || id === undefined || id === 0 || id === '0'
}

/** normalise `session.currentUser.groups` (array | Record | undefined) */
function getUserGroupIds(): string[] {
  const g: unknown = sessionStore.currentUser?.groups
  if (!g) return []
  if (Array.isArray(g)) return g
  if (typeof g === 'object') return Object.keys(g as Record<string, unknown>)
  return []
}

function belongsToSpace(group: InquiryGroup, uid: string): boolean {
  // Owner → always
  if (group.owner?.id === uid) return true

  // Admin → sees everything (matches sidebar behaviour elsewhere)
  if (sessionStore.currentUser?.isAdmin) return true

  const cfg = group.configuration
  if (!cfg) return false

  // Public / shared with everyone
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
    .filter((g) => isEmptyParentId(g.parentId))   // ← root groups only
    .filter((g) => belongsToSpace(g, uid))
    .slice(0, 6)
})

/* ------------------------------------------------------------------ */
/*  ACTIVE STATE                                                       */
/* ------------------------------------------------------------------ */
const currentExperience = computed<string>(
  () => (route.query.experience as string) || 'home',
)

function isActive(item: NavItem): boolean {
  if (item.key === 'landing') {
    return (
      route.name === 'home' &&
      !route.query.experience &&
      !route.query.section
    )
  }
  if (route.query.experience === item.key) return true
  // News / Services / Agenda live on /home with a `section` query
  if (item.key === 'news'     && route.query.section === 'news')     return true
  if (item.key === 'services' && route.query.section === 'services') return true
  if (item.key === 'agenda'   && route.query.section === 'events')   return true
  return false
}

/* ------------------------------------------------------------------ */
/*  NAVIGATION HELPERS                                                 */
/* ------------------------------------------------------------------ */
function goTo(item: NavItem) {
  router.push(item.to)
}

function goToGroup(groupId: number) {
  router.push({ name: 'group', params: { id: groupId } })
}

function goToMenu() {
  router.push({ name: 'menu' })
}

function getGroupIcon(type: string) {
  const map: Record<string, any> = {
    commune:      pickIcon('Home'),
    environment:  pickIcon('Leaf', 'Compass'),
    neighborhood: pickIcon('MapMarker'),
    association:  pickIcon('Users'),
    council:      pickIcon('Gavel', 'Scale'),
  }
  return map[type] || FALLBACK_ICON
}

/* ------------------------------------------------------------------ */
/*  LOAD SPACES ON MOUNT (idempotent — HomeView also does it)          */
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
          <div class="nav-brand__sub">Moorea-Maiao</div>
        </div>
      </div>

      <!-- Primary navigation -->
      <NcAppNavigationList>
        <NcAppNavigationItem
          v-for="item in primaryNav"
          :key="item.key"
          :name="item.label"
          :class="{ 'is-active': isActive(item) }"
          :allow-collapse="!!item.children"
          @click="goTo(item)"
        >
          <template #icon>
            <component :is="item.icon" />
          </template>

          <template v-if="item.children" #actions>
            <span class="chevron">›</span>
          </template>

          <NcAppNavigationList v-if="item.children" class="nav-children">
            <NcAppNavigationItem
              v-for="child in item.children"
              :key="child.key"
              :name="child.label"
              @click="router.push({ ...item.to, query: { ...item.to.query, filter: child.key } })"
            />
          </NcAppNavigationList>
        </NcAppNavigationItem>
      </NcAppNavigationList>

      <!-- ------------------------------------------------------------ -->
      <!-- My spaces — always visible, with a link to the legacy menu    -->
      <!-- ------------------------------------------------------------ -->
      <NcAppNavigationCaption :name="t('agora', 'My spaces')" />

      <NcAppNavigationList>
        <NcAppNavigationItem
          v-for="group in mySpaces"
          :key="group.id"
          :name="group.title"
          @click="goToGroup(group.id)"
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

        <!-- Link back to the legacy /menu browser -->
        <NcAppNavigationItem
          :name="t('agora', 'All spaces')"
          @click="goToMenu"
        >
          <template #icon>
            <component :is="InquiryGeneralIcons.FolderMultiple" />
          </template>
        </NcAppNavigationItem>
      </NcAppNavigationList>
    </template>

    <!-- Footer illustration -->
    <template #footer>
      <div class="nav-footer">
        <img
          :src="islandIllustration"
          alt="Island illustration"
          class="nav-footer__illustration"
        />
        <p class="nav-footer__tagline">
          {{ t('agora', 'Together, let’s build tomorrow') }}
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

.nav-children {
  margin-left: 12px;
  border-left: 1px solid var(--color-border);
}

.chevron {
  color: var(--color-text-lighter);
  font-size: 18px;
  padding-right: 8px;
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
