<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { t } from '@nextcloud/l10n'
import NcAppNavigation from '@nextcloud/vue/components/NcAppNavigation'
import NcAppNavigationList from '@nextcloud/vue/components/NcAppNavigationList'
import NcAppNavigationItem from '@nextcloud/vue/components/NcAppNavigationItem'
import NcAppNavigationSpacer from '@nextcloud/vue/components/NcAppNavigationSpacer'
import NcCounterBubble from '@nextcloud/vue/components/NcCounterBubble'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import InquiryGroupCreateDlg from '../components/Create/InquiryGroupCreateDlg.vue'
import { NavigationIcons } from '../utils/icons.ts'
import { useSessionStore } from '../stores/session.ts'
import { useInquiriesStore } from '../stores/inquiries.ts'
import { useInquiryGroupsStore } from '../stores/inquiryGroups.ts'
import type { InquiryGroupType, InquiryGroup } from '../Types/inquiryGroups.types.ts'
import { getInquiryGroupTypeData } from '../helpers/modules/InquiryHelper.ts'
import { createInquiryGroupContext, canEdit } from '../utils/permissions.ts'

const props = defineProps<{
  slug?: string
}>()

const route = useRoute()
const router = useRouter()
const sessionStore = useSessionStore()
const inquiriesStore = useInquiriesStore()
const inquiryGroupsStore = useInquiryGroupsStore()

// -----------------------------------------------------------
// Dialog state
// -----------------------------------------------------------
const createGroupDlgToggle = ref(false)
const selectedInquiryGroupTypeForCreation = ref<InquiryGroupType | null>(null)
const selectedParentId = ref<number | null>(null)

// -----------------------------------------------------------
// Current space (resolved from prop or route)
// -----------------------------------------------------------
function isEmptySlug(s: unknown): boolean {
  return !s || s === '' || s === 'undefined' || s === 'null' || s === '0'
}

const currentGroup = computed<InquiryGroup | null>(() => {
  const slug = props.slug ?? (route.params.slug as string)
  if (isEmptySlug(slug)) return null
  return inquiryGroupsStore.bySlug(slug) || null
})

const activeFamily = computed<string | null>(() => (route.query.family as string) || null)

const familyLabel = computed(() => {
  const fam = activeFamily.value
  if (!fam) return t('agora', 'Spaces')
  const family = (sessionStore.appSettings?.inquiryFamilyTab || []).find(
    (f: { family_type?: string; type?: string }) => (f.family_type || f.type) === fam
  )
  return family?.label ? t('agora', family.label) : fam
})

// -----------------------------------------------------------
// Family root types (used when browsing a family without slug)
// -----------------------------------------------------------
const familyRootTypes = computed<InquiryGroupType[]>(() => {
  const fam = activeFamily.value
  if (!fam) return []
  return (sessionStore.appSettings?.inquiryGroupTypeTab || [])
    .filter(
      (gt: InquiryGroupType & { family?: string; family_type?: string }) =>
        gt.is_root === true && (gt.family === fam || gt.family_type === fam)
    )
    .sort((a: InquiryGroupType, b: InquiryGroupType) => (a.sort_order || 0) - (b.sort_order || 0))
})

// -----------------------------------------------------------
// Subgroups of the current space
// -----------------------------------------------------------
const subgroups = computed<InquiryGroup[]>(() => {
  if (!currentGroup.value) return []
  return inquiryGroupsStore.inquiryGroups
    .filter((g) => g.parentId === currentGroup.value!.id && g.status?.groupStatus !== 'archived')
    .sort((a, b) => a.title.localeCompare(b.title))
})

// -----------------------------------------------------------
// Inquiries belonging to the current space
// -----------------------------------------------------------
const groupInquiries = computed(() => {
  if (!currentGroup.value?.inquiryIds) return []
  return currentGroup.value.inquiryIds
    .map((id) => inquiriesStore.inquiries.find((i) => i.id === id))
    .filter(Boolean)
})

// -----------------------------------------------------------
// Archived subgroups (space archives)
// -----------------------------------------------------------
const archivedSubgroups = computed<InquiryGroup[]>(() => {
  if (!currentGroup.value) return []
  return inquiryGroupsStore.inquiryGroups.filter(
    (g) => g.parentId === currentGroup.value!.id && g.status?.groupStatus === 'archived'
  )
})

// -----------------------------------------------------------
// Portal view (no slug, no family query): all root spaces
// -----------------------------------------------------------
const rootGroups = computed<InquiryGroup[]>(() => {
  const sorted = inquiryGroupsStore.inquiryGroupsSorted || []
  const isRoot = (g: InquiryGroup) =>
    g.parentId === null || g.parentId === 0 || g.parentId === undefined
  const isLive = (g: InquiryGroup) => g.status?.groupStatus !== 'archived'
  return sorted.filter((g) => isRoot(g) && isLive(g))
})

// -----------------------------------------------------------
// Groups of a given type (used in family browser nav)
// -----------------------------------------------------------
function groupsOfType(typeKey: string): InquiryGroup[] {
  return inquiryGroupsStore.inquiryGroups
    .filter(
      (g) =>
        g.type === typeKey &&
        (g.parentId === null || g.parentId === 0 || (g.parentId as unknown) === undefined) &&
        g.status?.groupStatus !== 'archived'
    )
    .sort((a, b) => a.title.localeCompare(b.title))
}

// -----------------------------------------------------------
// Permissions on the current space
// -----------------------------------------------------------
const canEditCurrent = computed<boolean>(() => {
  if (!currentGroup.value) return !!sessionStore.currentUser.isAdmin
  if (sessionStore.currentUser.isAdmin || sessionStore.currentUser.isGroupEditor) {
    return true
  }
  const ctx = createInquiryGroupContext(currentGroup.value)
  return ctx ? canEdit(ctx) : false
})

const canCreateSubgroup = computed(() => canEditCurrent.value)
const hasArchivedSubgroups = computed(() => archivedSubgroups.value.length > 0)

// -----------------------------------------------------------
// Icon helpers
// -----------------------------------------------------------
function getGroupTypeIcon(type: string) {
  const typeData = getInquiryGroupTypeData(type, sessionStore.appSettings.inquiryGroupTypeTab)
  return typeData?.icon || 'Folder'
}

const currentGroupIcon = computed(() => {
  if (!currentGroup.value) return NavigationIcons.Home
  return getGroupTypeIcon(currentGroup.value.type)
})

function findTypeDescriptor(typeKey: string): InquiryGroupType | null {
  const types = sessionStore.appSettings?.inquiryGroupTypeTab || []
  return types.find((tt: InquiryGroupType) => (tt.type || tt.group_type) === typeKey) || null
}

// -----------------------------------------------------------
// Navigation
// -----------------------------------------------------------
function goToGroup(group: InquiryGroup) {
  if (group.slug) {
    router.push({ name: 'group-list', params: { slug: group.slug } })
  } else if (group.id) {
    router.push({ name: 'group', params: { id: String(group.id) } })
  }
}

function goToType(type: InquiryGroupType) {
  const key = type.type || type.group_type || ''
  const existing = groupsOfType(key)
  if (existing.length > 0) {
    goToGroup(existing[0])
  } else {
    openCreateType(type)
  }
}

function openSettings() {
  if (currentGroup.value) {
    router.push({ name: 'group', params: { id: String(currentGroup.value.id) } })
  }
}

// -----------------------------------------------------------
// Create actions
// -----------------------------------------------------------
function openCreateInquiry() {
  createGroupDlgToggle.value = true
  selectedParentId.value = currentGroup.value?.id ?? null
  selectedInquiryGroupTypeForCreation.value = null
}

function openCreateSubgroup() {
  if (!currentGroup.value) return
  createGroupDlgToggle.value = true
  selectedParentId.value = currentGroup.value.id
  selectedInquiryGroupTypeForCreation.value = findTypeDescriptor(currentGroup.value.type)
}

function openCreateRootSpace() {
  createGroupDlgToggle.value = true
  selectedParentId.value = null
  selectedInquiryGroupTypeForCreation.value = null
}

function openCreateType(type: InquiryGroupType) {
  createGroupDlgToggle.value = true
  selectedParentId.value = null
  selectedInquiryGroupTypeForCreation.value = type
}

function handleCloseDialog() {
  createGroupDlgToggle.value = false
  selectedInquiryGroupTypeForCreation.value = null
  selectedParentId.value = null
}

function inquiryGroupAdded(payload: { id: number; slug?: string }) {
  createGroupDlgToggle.value = false
  selectedInquiryGroupTypeForCreation.value = null
  selectedParentId.value = null
  if (payload.slug) {
    router.push({ name: 'group-list', params: { slug: payload.slug } })
  } else {
    router.push({ name: 'group', params: { id: String(payload.id) } })
  }
}

// -----------------------------------------------------------
// Dialog: available groups for visibility picker
// -----------------------------------------------------------
const availableGroups = computed(() => {
  const groups = sessionStore.currentUser.groups || {}
  if (typeof groups === 'object' && !Array.isArray(groups)) {
    return Object.keys(groups)
  }
  return groups
})

onMounted(() => {
  if (!inquiryGroupsStore.inquiryGroups?.length) {
    inquiryGroupsStore.fetchAllGroups?.()
  }
})
</script>

<template>
  <NcAppNavigation
    class="agora-navigation"
    :aria-label="t('agora', 'Agora navigation')"
  >
    <template #list>
      <!-- ============================================================= -->
      <!-- CASE 1 — Inside a specific space                                -->
      <!-- ============================================================= -->
      <template v-if="currentGroup">
        <div class="current-space">
          <div class="space-badge">
            <component
              :is="currentGroupIcon"
              class="space-icon"
            />
          </div>
          <div class="space-info">
            <h3 class="space-title">
              {{ currentGroup.title }}
            </h3>
            <p
              v-if="currentGroup.titleExt"
              class="space-subtitle"
            >
              {{ currentGroup.titleExt }}
            </p>
          </div>
        </div>

        <NcAppNavigationList>
          <h3 class="navigation-caption">
            {{ t('agora', 'Navigation') }}
          </h3>

          <NcAppNavigationItem
            :name="t('agora', 'Overview')"
            :to="{ name: 'group-list', params: { slug: currentGroup.slug } }"
            :exact="true"
            class="navigation-item"
          >
            <template #icon>
              <component
                :is="NavigationIcons.Home"
                class="navigation-icon"
              />
            </template>
          </NcAppNavigationItem>

          <NcAppNavigationItem
            v-if="subgroups.length > 0"
            :name="t('agora', 'Subgroups')"
            allow-collapse
            :open="false"
            class="navigation-item"
          >
            <template #icon>
              <component
                :is="NavigationIcons.Folder"
                class="navigation-icon"
              />
            </template>
            <template #counter>
              <NcCounterBubble
                :count="subgroups.length"
                class="navigation-counter"
              />
            </template>
            <ul class="navigation-sublist">
              <NcAppNavigationItem
                v-for="sub in subgroups"
                :key="sub.id"
                :name="sub.title"
                :to="{ name: 'group-list', params: { slug: sub.slug } }"
                class="navigation-subitem"
              >
                <template #icon>
                  <component
                    :is="getGroupTypeIcon(sub.type)"
                    class="navigation-icon sub-icon"
                  />
                </template>
              </NcAppNavigationItem>
            </ul>
          </NcAppNavigationItem>

          <NcAppNavigationItem
            v-if="groupInquiries.length > 0"
            :name="t('agora', 'Inquiries')"
            allow-collapse
            :open="false"
            class="navigation-item"
          >
            <template #icon>
              <component
                :is="NavigationIcons.View"
                class="navigation-icon"
              />
            </template>
            <template #counter>
              <NcCounterBubble
                :count="groupInquiries.length"
                class="navigation-counter"
              />
            </template>
            <ul class="navigation-sublist">
              <NcAppNavigationItem
                v-for="inq in groupInquiries"
                :key="inq.id"
                :name="inq.title"
                :to="{ name: 'inquiry', params: { id: String(inq.id) } }"
                class="navigation-subitem"
              />
            </ul>
          </NcAppNavigationItem>

          <NcAppNavigationItem
            v-if="hasArchivedSubgroups"
            :name="t('agora', 'Space archives')"
            :to="{ name: 'group-archived' }"
            class="navigation-item"
          >
            <template #icon>
              <component
                :is="NavigationIcons.Archive"
                class="navigation-icon"
              />
            </template>
            <template #counter>
              <NcCounterBubble
                :count="archivedSubgroups.length"
                class="navigation-counter"
              />
            </template>
          </NcAppNavigationItem>
        </NcAppNavigationList>

        <NcAppNavigationSpacer />

        <NcAppNavigationList v-if="canEditCurrent">
          <h3 class="navigation-caption">
            {{ t('agora', 'Actions') }}
          </h3>

          <NcAppNavigationItem
            :name="t('agora', 'Create')"
            class="navigation-item"
          >
            <template #icon>
              <component
                :is="NavigationIcons.Plus"
                class="navigation-icon"
              />
            </template>
            <template #actions>
              <NcActionButton @click="openCreateInquiry">
                <template #icon>
                  <component :is="NavigationIcons.Plus" />
                </template>
                {{ t('agora', 'New inquiry') }}
              </NcActionButton>
              <NcActionButton
                v-if="canCreateSubgroup"
                @click="openCreateSubgroup"
              >
                <template #icon>
                  <component :is="NavigationIcons.Folder" />
                </template>
                {{ t('agora', 'New subgroup') }}
              </NcActionButton>
            </template>
          </NcAppNavigationItem>

          <NcAppNavigationItem
            :name="t('agora', 'Space settings')"
            class="navigation-item"
            @click="openSettings"
          >
            <template #icon>
              <component
                :is="NavigationIcons.Settings"
                class="navigation-icon"
              />
            </template>
          </NcAppNavigationItem>
        </NcAppNavigationList>

        <NcAppNavigationSpacer />

        <NcAppNavigationList>
          <NcAppNavigationItem
            :name="t('agora', 'All spaces')"
            :to="{ name: 'home' }"
            class="navigation-item"
          >
            <template #icon>
              <component
                :is="NavigationIcons.Home"
                class="navigation-icon"
              />
            </template>
          </NcAppNavigationItem>
        </NcAppNavigationList>
      </template>

      <!-- ============================================================= -->
      <!-- CASE 2 — Family browser (no slug + family in query)            -->
      <!-- Sidebar shows TYPES of the family, not every group instance.   -->
      <!-- ============================================================= -->
      <template v-else-if="activeFamily">
        <div class="family-header">
          <h3 class="family-title">
            {{ familyLabel }}
          </h3>
        </div>

        <NcAppNavigationList>
          <h3 class="navigation-caption">
            {{ t('agora', 'Group types') }}
          </h3>

          <NcAppNavigationItem
            v-for="type in familyRootTypes"
            :key="type.type || type.group_type"
            :name="t('agora', type.label)"
            :allow-collapse="groupsOfType(type.type || type.group_type || '').length > 0"
            :open="false"
            class="navigation-item"
            @click="goToType(type)"
          >
            <template #icon>
              <component
                :is="getGroupTypeIcon(type.type || type.group_type || '')"
                class="navigation-icon"
              />
            </template>
            <template
              v-if="groupsOfType(type.type || type.group_type || '').length > 0"
              #counter
            >
              <NcCounterBubble
                :count="groupsOfType(type.type || type.group_type || '').length"
                class="navigation-counter"
              />
            </template>

            <ul
              v-if="groupsOfType(type.type || type.group_type || '').length > 0"
              class="navigation-sublist"
            >
              <NcAppNavigationItem
                v-for="grp in groupsOfType(type.type || type.group_type || '')"
                :key="grp.id"
                :name="grp.title"
                :to="{ name: 'group-list', params: { slug: grp.slug } }"
                class="navigation-subitem"
              />
            </ul>
          </NcAppNavigationItem>
        </NcAppNavigationList>

        <NcAppNavigationSpacer />

        <NcAppNavigationList>
          <NcAppNavigationItem
            :name="t('agora', 'All spaces')"
            :to="{ name: 'home' }"
            class="navigation-item"
          >
            <template #icon>
              <component
                :is="NavigationIcons.Home"
                class="navigation-icon"
              />
            </template>
          </NcAppNavigationItem>

          <NcAppNavigationItem
            :name="t('agora', 'Archived groups')"
            :to="{ name: 'group-archived' }"
            class="navigation-item"
          >
            <template #icon>
              <component
                :is="NavigationIcons.Archive"
                class="navigation-icon"
              />
            </template>
          </NcAppNavigationItem>
        </NcAppNavigationList>
      </template>

      <!-- ============================================================= -->
      <!-- CASE 3 — Portal / "My spaces" (no slug, no family)             -->
      <!-- ============================================================= -->
      <template v-else>
        <NcAppNavigationList>
          <h3 class="navigation-caption">
            {{ t('agora', 'My spaces') }}
          </h3>

          <NcAppNavigationItem
            v-for="group in rootGroups"
            :key="group.id"
            :name="group.title"
            :title="group.titleExt || ''"
            :to="{ name: 'group-list', params: { slug: group.slug } }"
            class="navigation-item"
          >
            <template #icon>
              <component
                :is="getGroupTypeIcon(group.type)"
                class="navigation-icon"
              />
            </template>
          </NcAppNavigationItem>

          <NcAppNavigationItem
            v-if="rootGroups.length === 0"
            :name="t('agora', 'No spaces available')"
            :disabled="true"
            class="navigation-empty"
          />
        </NcAppNavigationList>

        <NcAppNavigationSpacer />

        <NcAppNavigationList>
          <h3 class="navigation-caption">
            {{ t('agora', 'Actions') }}
          </h3>

          <NcAppNavigationItem
            :name="t('agora', 'Create space')"
            class="navigation-item"
            @click="openCreateRootSpace"
          >
            <template #icon>
              <component
                :is="NavigationIcons.Plus"
                class="navigation-icon"
              />
            </template>
          </NcAppNavigationItem>
        </NcAppNavigationList>

        <NcAppNavigationSpacer />

        <NcAppNavigationList>
          <NcAppNavigationItem
            :name="t('agora', 'Archived groups')"
            :to="{ name: 'group-archived' }"
            class="navigation-item"
          >
            <template #icon>
              <component
                :is="NavigationIcons.Archive"
                class="navigation-icon"
              />
            </template>
          </NcAppNavigationItem>

          <NcAppNavigationItem
            :name="t('agora', 'Home')"
            :to="{ name: 'home' }"
            class="navigation-item"
          >
            <template #icon>
              <component
                :is="NavigationIcons.Home"
                class="navigation-icon"
              />
            </template>
          </NcAppNavigationItem>
        </NcAppNavigationList>
      </template>
    </template>
  </NcAppNavigation>

  <InquiryGroupCreateDlg
    v-if="createGroupDlgToggle"
    :inquiry-group-type="selectedInquiryGroupTypeForCreation"
    :parent-group-id="selectedParentId"
    :available-groups="availableGroups"
    @close="handleCloseDialog"
    @added="inquiryGroupAdded"
  />
</template>

<style lang="scss">
.agora-navigation {
  padding: 12px 0;

  .current-space {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px 16px;
    margin-bottom: 4px;
    border-bottom: 1px solid var(--color-border);

    .space-badge {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: linear-gradient(135deg, #6c8eb2 0%, #4a6f8f 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(74, 111, 143, 0.25);

      .space-icon {
        width: 22px;
        height: 22px;
        color: white;
      }
    }

    .space-info {
      min-width: 0;
      flex: 1;

      .space-title {
        margin: 0;
        font-size: 15px;
        font-weight: 700;
        color: var(--color-main-text);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .space-subtitle {
        margin: 2px 0 0 0;
        font-size: 12px;
        color: var(--color-text-lighter);
        line-height: 1.3;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  // Family header (family browser mode)
  .family-header {
    padding: 12px 16px 10px;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 6px;

    .family-title {
      margin: 0;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      color: var(--color-text-lighter);
    }
  }
}

.navigation-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;

  &.sub-icon {
    width: 16px;
    height: 16px;
  }
}

.navigation-caption {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-lighter);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 12px 8px 12px;
  padding: 0 0 8px 0;
  border-bottom: 1px solid var(--color-border);
}

.navigation-item {
  margin: 2px 8px;
  border-radius: 8px;

  &:hover {
    background-color: var(--color-background-hover);
  }

  &.active {
    background-color: var(--color-primary-light);

    :deep(.app-navigation-entry__title) {
      font-weight: 600;
    }
  }
}

.navigation-sublist {
  margin-left: 8px;
}

.navigation-subitem {
  margin: 1px 4px;
  border-radius: 6px;

  &:hover {
    background-color: var(--color-background-hover);
  }
}

.navigation-counter {
  background-color: var(--color-background-darker);
  color: var(--color-text-lighter);
}

.navigation-empty {
  opacity: 0.6;
  font-style: italic;
}

:deep(.app-navigation__body) {
  overflow: revert;
}

:deep(.app-navigation-entry-icon),
:deep(.app-navigation-entry__title) {
  transition: opacity 0.2s ease;
}

:deep(.app-navigation-entry.active .app-navigation-entry-icon),
:deep(.app-navigation-entry.active .app-navigation-entry__title) {
  opacity: 1;
}

@media (max-width: 768px) {
  .agora-navigation {
    padding: 8px 0;

    .current-space {
      padding: 10px 12px 12px;
    }
  }
}

.theme--dark {
  .navigation-caption {
    color: var(--color-text-light);
  }
}
</style>
