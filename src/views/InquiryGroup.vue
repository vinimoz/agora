<!--
- SPDX-FileCopyrightText: 2025 Nextcloud contributors
- SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
  <NcAppContent class="inquiry-group-page">
    <div class="inquiry-group-page">
      <!-- Breadcrumb -->
      <div class="breadcrumb-bar theme-dark">
        <div class="breadcrumb-container">
          <!-- Home -->
          <NcButton
            type="tertiary"
            :aria-label="t('agora', 'Home')"
            class="breadcrumb-home"
            :to="{ name: 'home' }"
          >
            <template #icon>
              <component
                :is="InquiryGeneralIcons.Home"
                :size="20"
              />
            </template>
            <span class="breadcrumb-label">{{ t('agora', 'Home') }}</span>
          </NcButton>

          <!-- Family (only when we are inside an actual group, not the family browser) -->
          <template v-if="showFamilyCrumb">
            <div class="breadcrumb-separator">
              ❯
            </div>
            <NcButton
              type="tertiary"
              class="breadcrumb-item breadcrumb-family"
              :aria-label="t('agora', 'Family')"
              @click="goToFamilyRoot"
            >
              <div class="breadcrumb-item-content">
                <component
                  :is="familyIconComponent"
                  class="breadcrumb-icon"
                />
                <span class="breadcrumb-label">{{ familyLabel }}</span>
              </div>
            </NcButton>
          </template>

          <!-- Parent groups -->
          <template
            v-for="parent in parentGroups"
            :key="parent.id"
          >
            <div class="breadcrumb-separator">
              ❯
            </div>
            <NcButton
              type="tertiary"
              class="breadcrumb-item"
              :aria-label="t('agora', 'Parent')"
              @click="selectGroup(parent)"
            >
              <div class="breadcrumb-item-content">
                <component
                  :is="getGroupTypeIconComponent(parent.type)"
                  class="breadcrumb-icon"
                />
                <span class="breadcrumb-label">{{ parent.title }}</span>
              </div>
            </NcButton>
          </template>

          <!-- Current -->
          <div class="breadcrumb-separator">
            ❯
          </div>
          <div class="breadcrumb-current">
            <div class="breadcrumb-current-content">
              <component
                :is="currentIconComponent"
                class="breadcrumb-icon"
              />
              <span class="breadcrumb-label">{{ currentBreadcrumbTitle }}</span>
              <span
                v-if="totalInquiries > 0 && hasSlug"
                class="inquiry-count"
              >
                ({{ totalInquiries }})
              </span>
              <span
                v-else-if="displayedGroups.length > 0 && !hasSlug"
                class="inquiry-count"
              >
                ({{ displayedGroups.length }})
              </span>
              <span
                v-else-if="rootTypesWithGroups.length > 0 && !hasSlug && !currentGroupType"
                class="inquiry-count"
              >
                ({{ rootTypesWithGroups.length }})
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- White Separation Line -->
      <div class="separation-line" />

      <!-- Group not found -->
      <div
        v-if="groupNotFound"
        class="not-found-state"
      >
        <div class="not-found-icon">
          🔍
        </div>
        <h2>{{ t('agora', 'Group not found') }}</h2>
        <p>
          {{
            t(
              'agora',
              'The group you are looking for does not exist or you do not have permission to access it.'
            )
          }}
        </p>
        <NcButton
          type="primary"
          :to="{ name: 'home' }"
        >
          {{ t('agora', 'Back to home') }}
        </NcButton>
      </div>

      <!-- Main content -->
      <template v-else>
        <!-- Header -->
        <div class="group-header">
          <div class="header-left">
            <div class="group-icon-badge">
              <component
                :is="currentIconComponent"
                class="group-icon"
              />
            </div>
            <div class="group-title-section">
              <h1 class="group-title">
                {{ currentTitle }}
              </h1>
              <div class="group-subtitle">
                <p>{{ currentDescription }}</p>
                <span
                  v-if="totalInquiries > 0 && hasSlug"
                  class="inquiry-count-badge"
                >
                  {{ totalInquiries }} {{ t('agora', 'inquiries') }}
                </span>
                <span
                  v-if="displayedGroups.length > 0 && !hasSlug"
                  class="groups-count-badge"
                >
                  {{ displayedGroups.length }} {{ t('agora', 'groups') }}
                </span>
              </div>
            </div>
            <div class="header-right">
              <ExperienceSwitcher
                v-if="currentInquiryGroup"
                :current-experience="experience"
                :available-experiences="availableExperiences"
                @change="handleExperienceChange"
              />
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div
          v-if="isLoading"
          class="loading-state"
        >
          <div class="spinner" />
          <p>{{ t('agora', 'Loading …') }}</p>
        </div>

        <!-- ================================================================ -->
        <!-- CONTENT                                                            -->
        <!-- Three states:                                                      -->
        <!--   A) no slug + no type selected → show GROUP TYPES as vignettes    -->
        <!--   B) no slug + type selected    → show GROUPS of that type         -->
        <!--   C) slug set                   → show CHILDREN + experience       -->
        <!-- ================================================================ -->
        <div
          v-else
          class="content-area"
        >
          <!-- ============================================================= -->
          <!-- STATE A — Group TYPES grid                                     -->
          <!-- ============================================================= -->
          <template v-if="!hasSlug && !currentGroupType">
            <div class="section-header">
              <h3>
                {{ activeFamily ? familyLabel : t('agora', 'Group types') }}
              </h3>
              <div
                v-if="canCreateInFamily"
                class="section-actions"
              >
                <NcButton
                  class="create-button"
                  @click="createInquiryGroup('')"
                >
                  ➕ {{ t('agora', 'Create group') }}
                </NcButton>
              </div>
            </div>

            <div
              v-if="rootTypesWithGroups.length > 0"
              class="types-grid"
            >
              <div
                v-for="type in rootTypesWithGroups"
                :key="getTypeKey(type)"
                class="type-vignette"
                @click="selectType(type)"
              >
                <div class="type-vignette__icon">
                  <component :is="getGroupTypeIconComponent(getTypeKey(type))" />
                </div>
                <div class="type-vignette__body">
                  <h4 class="type-vignette__title">
                    {{ t('agora', type.label) }}
                  </h4>
                  <p
                    v-if="type.description"
                    class="type-vignette__desc"
                  >
                    {{ t('agora', type.description) }}
                  </p>
                  <span class="type-vignette__count">
                    {{ groupCountOfType(getTypeKey(type)) }}
                    {{ t('agora', 'groups') }}
                  </span>
                </div>
              </div>
            </div>

            <div
              v-else
              class="empty-state"
            >
              <div class="empty-icon">
                📁
              </div>
              <h3>{{ t('agora', 'No group types available') }}</h3>
              <p>{{ t('agora', 'There are no group types you can browse yet.') }}</p>
            </div>
          </template>

          <!-- ============================================================= -->
          <!-- STATE B / C — Type selected OR a specific slug                 -->
          <!-- ============================================================= -->
          <template v-else>
            <div class="section-header">
              <div class="section-title-block">
                <!-- Back to types, only in state B -->
                <NcButton
                  v-if="!hasSlug && currentGroupType"
                  type="tertiary"
                  class="back-to-types"
                  @click="clearSelectedType"
                >
                  ← {{ t('agora', 'All group types') }}
                </NcButton>
                <h3>{{ sectionTitle }}</h3>
              </div>

              <div
                v-if="canUserEditGroup(currentInquiryGroup)"
                class="section-actions"
              >
                <NcButton
                  class="create-button"
                  @click="createInquiryGroup(currentGroupType)"
                >
                  ➕ {{ t('agora', 'Create group') }}
                </NcButton>
              </div>
            </div>

            <!-- Groups of the selected type (state B) or children (state C) -->
            <div
              v-if="displayedGroups.length > 0"
              class="groups-grid"
            >
              <div
                v-for="group in displayedGroups"
                :key="group.id"
                class="group-vignette-wrapper"
              >
                <div class="vignette-container">
                  <div
                    class="group-vignette"
                    @click="selectGroup(group)"
                  >
                    <div
                      v-if="group.coverId"
                      class="vignette-cover"
                    >
                      <img
                        :src="getCoverUrl(group.coverId)"
                        :alt="group.title"
                      >
                      <div class="vignette-cover-overlay" />
                    </div>
                    <div class="vignette-content">
                      <div class="vignette-icon">
                        <component :is="getGroupTypeIconComponent(group.type)" />
                      </div>
                      <h4>{{ group.title }}</h4>
                      <p
                        v-if="group.description"
                        class="vignette-description"
                      >
                        {{ group.description }}
                      </p>
                      <div class="vignette-stats">
                        <div class="stat-item">
                          <span class="stat-icon">📝</span>
                          <span class="stat-value">
                            {{ group.inquiryIds?.length || 0 }}
                          </span>
                        </div>
                        <div
                          v-if="getGroupChildren(group).length > 0"
                          class="stat-item"
                        >
                          <span class="stat-icon">👥</span>
                          <span class="stat-value">
                            {{ getGroupChildren(group).length }}
                          </span>
                        </div>
                      </div>
                      <div class="vignette-footer">
                        <NcButton
                          class="view-group-button"
                          @click.stop="selectGroup(group)"
                        >
                          {{ t('agora', 'View group') }}
                          <template #icon>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                            </svg>
                          </template>
                        </NcButton>
                      </div>
                    </div>
                  </div>

                  <!-- Owner menu (Modify / Delete / Archive) -->
                  <div
                    v-if="
                      group &&
                        (canUserEditGroup(group) ||
                          canUserDeleteGroup(group) ||
                          canUserArchiveGroup(group))
                    "
                    class="owner-menu-under"
                  >
                    <div class="owner-menu-content">
                      <NcButton
                        v-if="canUserEditGroup(group)"
                        type="tertiary"
                        class="menu-item modify"
                        @click.stop="modifyGroup(group)"
                      >
                        <template #icon>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                            />
                          </svg>
                        </template>
                        {{ t('agora', 'Modify') }}
                      </NcButton>

                      <NcButton
                        v-if="canUserDeleteGroup(group)"
                        type="tertiary"
                        class="menu-item delete"
                        @click.stop="deleteGroup(group)"
                      >
                        <template #icon>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                            />
                          </svg>
                        </template>
                        {{ t('agora', 'Delete') }}
                      </NcButton>

                      <NcButton
                        v-if="canUserArchiveGroup(group)"
                        type="tertiary"
                        class="menu-item archive"
                        @click.stop="archiveGroup(group)"
                      >
                        <template #icon>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                          </svg>
                        </template>
                        {{ t('agora', 'Archive') }}
                      </NcButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty state for state B / C -->
            <div
              v-else
              class="empty-state"
            >
              <div class="empty-icon">
                📁
              </div>
              <h3>{{ emptyStateTitle }}</h3>
              <p>{{ emptyStateMessage }}</p>
              <NcButton
                v-if="canUserEditGroup(currentInquiryGroup)"
                type="primary"
                @click="createInquiryGroup(currentGroupType)"
              >
                {{ t('agora', 'Create first group') }}
              </NcButton>
            </div>

            <!-- Experience renderer OR legacy inquiries list (state C only) -->
            <template v-if="currentInquiryGroup">
              <div
                v-if="hasCustomArchitecture && experience !== 'classic'"
                class="experience-container"
              >
                <ExperienceRenderer
                  :group="currentInquiryGroup"
                  :inquiries="groupInquiries"
                  :experience="experience"
                  :display-mode="displayMode"
                  :display-architecture="displayArchitecture"
                  :layout-config="layoutConfig"
                  :ui-config="currentInquiryGroup?.configuration?.ui"
                  :show-header="false"
                  :show-stats="true"
                  :show-resources="true"
                  :show-comments="true"
                  @view-inquiry="handleViewInquiry"
                  @view-option="handleViewOption"
                  @view-group="selectGroup"
		  @openPanel="handleOpenPanel"
                  @experience-change="handleExperienceChange"
                  @display-change="handleDisplayChange"
                  @create-inquiry="handleCreateInquiry"
                />
              </div>

              <div
                v-else
                class="inquiry-group-content"
              >
                <InquiryGroupViewMain
                  :group="currentInquiryGroup"
                  :inquiry-ids="currentInquiryGroup.inquiryIds"
                  @view-inquiry="handleViewInquiry"
                />
              </div>
            </template>
          </template>
        </div>
      </template>

      <!-- Dialogs -->
      <NcDialog
        v-if="createGroupDlgToggle"
        :name="t('agora', 'Create new inquiry group')"
        :enable-slide-up="false"
        @close="handleCloseGroupDialog"
      >
        <InquiryCreateDlg
          v-if="showCreateDialog"
          :inquiry-type="createDialogType"
          :family="createDialogFamily"
          :parent-inquiry-id="currentInquiryGroup?.id ?? null"
          :available-groups="availableGroups"
          @close="closeCreateDialog"
          @added="onInquiryAdded"
        />

        <InquiryGroupCreateDlg
          :inquiry-group-type="selectedInquiryGroupTypeForCreation"
          :parent-group-id="selectedParentId"
          :available-groups="availableGroups"
          :family="createDialogFamily"
          @added="inquiryGroupAdded"
          @close="handleCloseGroupDialog"
        />
      </NcDialog>

      <NcDialog
        v-if="deleteDialogGroup"
        v-model:open="showDeleteDialog"
        :name="deleteDialogTitle"
        :message="deleteDialogMessage"
        :buttons="deleteDialogButtons"
      />
    </div>
  </NcAppContent>
    <InquiryInteractionShell ref="shellRef" />
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { t } from '@nextcloud/l10n'
import { showError, showSuccess } from '@nextcloud/dialogs'
import NcAppContent from '@nextcloud/vue/components/NcAppContent'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcDialog from '@nextcloud/vue/components/NcDialog'
import { useSessionStore } from '../stores/session.ts'
import { useInquiriesStore } from '../stores/inquiries.ts'
import { useInquiryGroupsStore } from '../stores/inquiryGroups.ts'
import { useInquiryGroupStore } from '../stores/inquiryGroup.ts'
import { InquiryGeneralIcons } from '../utils/icons.ts'
import { getInquiryGroupTypeData } from '../helpers/modules/InquiryHelper.ts'
import InquiryGroupCreateDlg from '../components/Create/InquiryGroupCreateDlg.vue'
import InquiryCreateDlg from '../components/Create/InquiryCreateDlg.vue'
import type { InquiryGroupType, InquiryGroup } from '../Types/inquiryGroups.types.ts'
import { createInquiryGroupContext, canArchive, canEdit, canDelete } from '../utils/permissions.ts'
import InquiryGroupViewMain from '../components/InquiryGroup/InquiryGroupViewMain.vue'
import ExperienceRenderer from '../components/Experience/ExperienceRenderer.vue'
import ExperienceSwitcher from '../components/Experience/ExperienceSwitcher.vue'
import { useGroupExperience } from '../composables/useGroupExperience'
import type { ExperienceKey, DisplayMode } from '../composables/useExperience'
import type { Inquiry, Option } from '../Types/index.ts'

// ============================================================
// Stores
// ============================================================
const route = useRoute()
const router = useRouter()
const sessionStore = useSessionStore()
const inquiriesStore = useInquiriesStore()
const inquiryGroupsStore = useInquiryGroupsStore()
const inquiryGroupStore = useInquiryGroupStore()
const shellRef = ref()


// ============================================================
// Local state
// ============================================================
const isLoading = ref(true)
const selectedParentId = ref<number | null>(null)
const createGroupDlgToggle = ref(false)
const selectedInquiryGroupTypeForCreation = ref<InquiryGroupType | null>(null)
const groupNotFound = ref(false)

const showCreateDialog = computed(() => route.query.viewMode === 'create')

const showDeleteDialog = ref(false)
const deleteDialogGroup = ref<InquiryGroup | null>(null)

// ============================================================
// Route-derived state
// ============================================================
const hasSlug = computed(() => {
  const slug = route.params.slug as string
  return !!slug && slug !== 'undefined' && slug !== 'null' && slug !== '0'
})

const activeFamily = computed<string | null>(() => (route.query.family as string) || null)

const isFamilyBrowserMode = computed(() => !hasSlug.value && !!activeFamily.value)

const currentInquiryGroup = computed<InquiryGroup | null>(() => {
  if (!hasSlug.value) return null
  const slug = route.params.slug as string
  const group = inquiryGroupsStore.bySlug(slug)
  if (!group || !group.owner) return null
  console.log(' ACTIVE FAMILY ', activeFamily.value)
  console.log(' IS FAMILY BROS ', isFamilyBrowserMode.value)
  console.log(' CURRENT INQUIRY GROUP ', currentInquiryGroup.value)
  return group
})

// ============================================================
// Experience
// ============================================================
const {
  experience,
  displayMode,
  displayArchitecture,
  layoutConfig,
  hasCustomArchitecture,
  availableExperiences,
  switchExperience,
  switchDisplay,
} = useGroupExperience(computed(() => currentInquiryGroup.value))

// ============================================================
// Permissions
// ============================================================
function contextFor(group: InquiryGroup | null) {
  return group ? createInquiryGroupContext(group) : null
}

function canUserArchiveGroup(group: InquiryGroup | null): boolean {
  if (!group) return false
  const ctx = contextFor(group)
  return ctx ? canArchive(ctx) : false
}

function canUserEditGroup(group: InquiryGroup | null): boolean {
  if (sessionStore.currentUser.isAdmin || sessionStore.currentUser.isGroupEditor) return true
  if (!group) return false
  const ctx = contextFor(group)
  return ctx ? canEdit(ctx) : false
}

function canUserDeleteGroup(group: InquiryGroup | null): boolean {
  if (!group) return false
  const ctx = contextFor(group)
  return ctx ? canDelete(ctx) : false
}

function handleOpenPanel(payload: { inquiry: any; target: string }) {
  shellRef.value.open(payload)
}

const canCreateInFamily = computed(
  () => sessionStore.currentUser.isAdmin === true || sessionStore.currentUser.isGroupEditor === true
)

// ============================================================
// Family breadcrumb
// ============================================================
const showFamilyCrumb = computed(() => hasSlug.value && !!activeFamily.value)

const familyIconComponent = computed(() => {
  const fam = activeFamily.value
  if (!fam) return 'Folder'
  const family = (sessionStore.appSettings?.inquiryFamilyTab || []).find(
    (f: { family_type?: string; type?: string }) => (f.family_type || f.type) === fam
  )
  const icon = family?.icon
  return icon ? (InquiryGeneralIcons as Record<string, unknown>)[icon] || 'Folder' : 'Folder'
})

function goToFamilyRoot() {
  if (!activeFamily.value) return
  router.push({
    name: 'group-list',
    params: { slug: '' },
    query: { family: activeFamily.value, viewMode: 'group' },
  })
}

// ============================================================
// Derived data
// ============================================================
function getTypeKey(type: InquiryGroupType): string {
  return type.type || type.group_type || ''
}

const familyRootTypeKeys = computed<string[]>(() => {
  const fam = activeFamily.value
  if (!fam) return []
  return (sessionStore.appSettings?.inquiryGroupTypeTab || [])
    .filter(
      (gt: InquiryGroupType & { family?: string; family_type?: string }) =>
        gt.is_root === true && (gt.family === fam || gt.family_type === fam)
    )
    .map((gt) => gt.type || gt.group_type || '')
    .filter(Boolean)
})

const rootTypesWithGroups = computed<InquiryGroupType[]>(() => {
  const fam = activeFamily.value
  const familyKeys = new Set(familyRootTypeKeys.value)
  return (sessionStore.appSettings?.inquiryGroupTypeTab || [])
    .filter((tt: InquiryGroupType) => tt.is_root === true)
    .filter((tt: InquiryGroupType) => (fam ? familyKeys.has(getTypeKey(tt)) : true))
    .filter((tt: InquiryGroupType) => groupsOfType(getTypeKey(tt)).length > 0)
    .sort((a: InquiryGroupType, b: InquiryGroupType) => (a.sort_order || 0) - (b.sort_order || 0))
})

function selectType(type: InquiryGroupType) {
  inquiryGroupsStore.setCurrentGroupType(getTypeKey(type))
}

function clearSelectedType() {
  inquiryGroupsStore.setCurrentGroupType('')
}

const currentGroupType = computed(
  () => currentInquiryGroup.value?.type || inquiryGroupsStore.currentGroupType || ''
)

const parentGroups = computed<InquiryGroup[]>(() => {
  if (!currentInquiryGroup.value) return []
  const parents: InquiryGroup[] = []
  let current = currentInquiryGroup.value
  while (current.parentId) {
    const parent = inquiryGroupsStore.inquiryGroups.find((g) => g.id === current.parentId)
    if (!parent) break
    parents.unshift(parent)
    current = parent
  }
  return parents
})

const displayedGroups = computed<InquiryGroup[]>(() => {
  const familyKeys = new Set(familyRootTypeKeys.value)

  if (!hasSlug.value) {
    // State A shows types, not groups
    if (!inquiryGroupsStore.currentGroupType) return []

    return inquiryGroupsStore.inquiryGroups
      .filter((g) => {
        const isRoot = g.parentId === null || g.parentId === 0 || g.parentId === undefined
        if (!isRoot) return false
        if (g.status?.groupStatus === 'archived') return false
        if (familyKeys.size > 0 && !familyKeys.has(g.type)) return false
        return g.type === inquiryGroupsStore.currentGroupType
      })
      .sort((a, b) => a.title.localeCompare(b.title))
  }

  if (!currentInquiryGroup.value) return []
  return inquiryGroupsStore.inquiryGroups
    .filter(
      (g) => g.parentId === currentInquiryGroup.value!.id && g.status?.groupStatus !== 'archived'
    )
    .sort((a, b) => a.title.localeCompare(b.title))
})

const groupInquiries = computed<Inquiry[]>(() => {
  if (!currentInquiryGroup.value?.inquiryIds) return []
  return currentInquiryGroup.value.inquiryIds
    .map((id) => inquiriesStore.inquiries.find((i) => i.id === id))
    .filter(Boolean) as Inquiry[]
})

const totalInquiries = computed(() =>
  hasSlug.value ? (currentInquiryGroup.value?.inquiryIds?.length ?? 0) : 0
)

// ============================================================
// Type data + titles
// ============================================================
function getGroupTypeIconComponent(type: string) {
  const typeData = getInquiryGroupTypeData(type, sessionStore.appSettings.inquiryGroupTypeTab)
  return typeData?.icon || 'Folder'
}

const selectedTypeData = computed(() =>
  getInquiryGroupTypeData(currentGroupType.value, sessionStore.appSettings.inquiryGroupTypeTab)
)

const selectedTypeLabel = computed(() =>
  selectedTypeData.value?.label ? t('agora', selectedTypeData.value.label) : t('agora', 'Groups')
)

const selectedTypeDescription = computed(() =>
  selectedTypeData.value?.description
    ? t('agora', selectedTypeData.value.description)
    : t('agora', 'Browse available groups')
)

// ------- Family helpers -------
const familyLabel = computed(() => {
  const fam = activeFamily.value
  if (!fam) return t('agora', 'Spaces')
  const family = (sessionStore.appSettings?.inquiryFamilyTab || []).find(
    (f: { family_type?: string; type?: string }) => (f.family_type || f.type) === fam
  )
  return family?.label ? t('agora', family.label) : fam
})

function handleCreateInquiry() {
  if (!currentInquiryGroup.value) return
  router.push({
    name: 'group-list',
    params: { slug: currentInquiryGroup.value.slug },
    query: { ...route.query, viewMode: 'create' },
  })
}

function groupsOfType(typeKey: string): InquiryGroup[] {
  return inquiryGroupsStore.inquiryGroups.filter(
    (g) =>
      g.type === typeKey &&
      (g.parentId === null || g.parentId === 0 || (g.parentId as unknown) === undefined) &&
      g.status?.groupStatus !== 'archived'
  )
}

function groupCountOfType(typeKey: string): number {
  return groupsOfType(typeKey).length
}

const currentIconComponent = computed(() => {
  if (isFamilyBrowserMode.value) {
    const fam = activeFamily.value
    const family = (sessionStore.appSettings?.inquiryFamilyTab || []).find(
      (f: { family_type?: string; type?: string; icon?: string }) =>
        (f.family_type || f.type) === fam
    )
    const icon = family?.icon
    return icon ? (InquiryGeneralIcons as Record<string, unknown>)[icon] || 'Folder' : 'Folder'
  }
  return getGroupTypeIconComponent(
    hasSlug.value && currentInquiryGroup.value
      ? currentInquiryGroup.value.type
      : currentGroupType.value
  )
})

// NOTE: only ONE definition of currentTitle / currentDescription
const currentTitle = computed(() => {
  if (isFamilyBrowserMode.value) return familyLabel.value
  if (hasSlug.value && currentInquiryGroup.value) {
    return currentInquiryGroup.value.title || currentInquiryGroup.value.name
  }
  // State A: no type selected yet
  if (!currentGroupType.value) {
    return activeFamily.value ? familyLabel.value : t('agora', 'Group types')
  }
  return selectedTypeLabel.value
})

const currentDescription = computed(() => {
  if (isFamilyBrowserMode.value) {
    return t('agora', 'Browse the group types of this family.')
  }
  if (hasSlug.value && currentInquiryGroup.value) {
    return (
      currentInquiryGroup.value.titleExt ||
      currentInquiryGroup.value.configuration?.description ||
      selectedTypeDescription.value
    )
  }
  if (!currentGroupType.value) {
    return t('agora', 'Choose a group type to browse its groups.')
  }
  return selectedTypeDescription.value
})

const currentBreadcrumbTitle = computed(() => currentTitle.value)

const sectionTitle = computed(() => {
  if (hasSlug.value && currentInquiryGroup.value) {
    return t('agora', 'Subgroups')
  }
  return selectedTypeLabel.value
})

// ============================================================
// Empty-state copy
// ============================================================
const emptyStateTitle = computed(() =>
  hasSlug.value ? t('agora', 'No subgroups yet') : t('agora', 'No groups available')
)

const emptyStateMessage = computed(() =>
  hasSlug.value
    ? t('agora', 'This space does not have any subgroups yet.')
    : t('agora', 'There are no groups in this section yet.')
)

// ============================================================
// Helpers
// ============================================================
function getGroupChildren(group: InquiryGroup): InquiryGroup[] {
  if (!group?.id) return []
  const storeGroup = inquiryGroupsStore.inquiryGroups.find((g) => g.id === group.id)
  if (storeGroup?.childs?.length) return storeGroup.childs as unknown as InquiryGroup[]
  return inquiryGroupsStore.inquiryGroups.filter((g) => g.parentId === group.id)
}

const BASE_URL = window.location.origin

function getNextcloudPreviewUrl(fileId: number, x = 1920, y = 1080, autoScale = true) {
  return `${BASE_URL}/index.php/core/preview?fileId=${fileId}&x=${x}&y=${y}&a=${autoScale ? 1 : 0}`
}

function getCoverUrl(coverId: number) {
  return getNextcloudPreviewUrl(coverId)
}

// ============================================================
// Navigation + CRUD
// ============================================================
function selectGroup(group: InquiryGroup) {
  if (!group) return
  if (currentInquiryGroup.value?.id === group.id) {
    inquiryGroupStore.load(group.id)
    return
  }
  if (group.slug) {
    router.push({
      name: 'group-list',
      params: { slug: group.slug },
      query: { ...route.query },
    })
  } else if (group.id) {
    router.push({
      name: 'group',
      params: { id: String(group.id) },
      query: { ...route.query },
    })
  }
}

function modifyGroup(group: InquiryGroup) {
  router.push({ name: 'group', params: { id: String(group.id) } })
}

const createDialogFamily = ref<string | null>(null)

function createInquiryGroup(inquiryGroupType: InquiryGroupType | string) {
  if (hasSlug.value) {
    selectedParentId.value = currentInquiryGroup?.value.id ?? null
    createDialogFamily.value = null // parent type drives filtering
  } else {
    selectedParentId.value = null
    createDialogFamily.value = activeFamily.value
  }
  selectedInquiryGroupTypeForCreation.value = inquiryGroupType
  createGroupDlgToggle.value = true
}

async function deleteGroup(group: InquiryGroup) {
  deleteDialogGroup.value = group
  showDeleteDialog.value = true
}

async function performDeleteGroup(group: InquiryGroup) {
  try {
    await inquiryGroupStore.deleteGroup(group.id)
    showSuccess(t('agora', 'Group deleted successfully'))
    await inquiryGroupsStore.fetchAllGroups()

    if (currentInquiryGroup.value?.id === group.id) {
      const parent = group.parentId
        ? inquiryGroupsStore.inquiryGroups.find((g) => g.id === group.parentId)
        : null
      if (parent?.slug) {
        router.push({ name: 'group-list', params: { slug: parent.slug } })
      } else {
        router.push({ name: 'home' })
      }
    }
  } catch (error) {
    console.error('Error deleting group:', error)
    showError(t('agora', 'Failed to delete group'))
  }
}

async function archiveGroup(group: InquiryGroup) {
  try {
    await inquiryGroupStore.archive(group.id)
    showSuccess(t('agora', 'Group archived successfully'))
    router.push({ name: 'home' })
  } catch (error) {
    console.error('Error archiving group:', error)
    showError(t('agora', 'Failed to archive group'))
  }
}

function handleCloseGroupDialog() {
  createGroupDlgToggle.value = false
  selectedParentId.value = null
  selectedInquiryGroupTypeForCreation.value = null
}

function inquiryGroupAdded(newGroup: InquiryGroup) {
  createGroupDlgToggle.value = false
  if (newGroup.slug) {
    setTimeout(() => {
      router.push({ name: 'group-list', params: { slug: newGroup.slug } })
    }, 100)
  } else if (newGroup.id) {
    router.push({ name: 'group', params: { id: String(newGroup.id) } })
  }
}

// ============================================================
// Experience handlers
// ============================================================
function handleExperienceChange(key: ExperienceKey) {
  switchExperience(key)
}

function handleDisplayChange(mode: DisplayMode) {
  switchDisplay(mode)
}

function handleViewInquiry(inquiry: Inquiry) {
  if (!inquiry?.id) {
    showError(t('agora', 'Cannot open inquiry: missing ID'))
    return
  }
  router.push({ name: 'inquiry', params: { id: String(inquiry.id) } }).catch((err) => {
    console.error(err)
    showError(t('agora', 'Failed to navigate to inquiry'))
  })
}

function handleViewOption(option: Option) {
  if (!option?.id) {
    showError(t('agora', 'Cannot open option: missing ID'))
    return
  }
  router.push({ name: 'option', params: { id: String(option.id) } }).catch((err) => {
    console.error(err)
    showError(t('agora', 'Failed to navigate to option'))
  })
}

// ============================================================
// Delete dialog
// ============================================================
const deleteDialogTitle = computed(() =>
  deleteDialogGroup.value
    ? t('agora', 'Delete "{group}"', { group: deleteDialogGroup.value.title })
    : t('agora', 'Delete group')
)

const deleteDialogMessage = computed(() =>
  t(
    'agora',
    'Are you sure you want to delete this group? All subgroups and inquiries within it will also be deleted. This action cannot be undone.'
  )
)

const deleteDialogButtons = computed(() => [
  {
    label: t('agora', 'Cancel'),
    type: 'secondary',
    callback: () => {
      showDeleteDialog.value = false
      deleteDialogGroup.value = null
    },
  },
  {
    label: t('agora', 'Delete'),
    type: 'error',
    callback: async () => {
      if (deleteDialogGroup.value) await performDeleteGroup(deleteDialogGroup.value)
      showDeleteDialog.value = false
      deleteDialogGroup.value = null
    },
  },
])

// ============================================================
// Available Nextcloud groups for the creation dialog
// ============================================================
const availableGroups = computed(() => {
  const groups = sessionStore.currentUser.groups || {}
  if (typeof groups === 'object' && !Array.isArray(groups)) {
    return Object.keys(groups)
  }
  return groups as string[]
})

// ============================================================
// Lifecycle
// ============================================================
const shouldGroupNotFound = computed(() => hasSlug.value && !currentInquiryGroup.value)

watch(
  shouldGroupNotFound,
  (v) => {
    groupNotFound.value = v
  },
  { immediate: true }
)

onMounted(async () => {
  isLoading.value = true
  try {
    if (inquiryGroupsStore.inquiryGroups.length === 0) {
      await inquiryGroupsStore.fetchAllGroups()
    }
    if (inquiriesStore.inquiries.length === 0) {
      await inquiriesStore.load()
    }
    if (hasSlug.value) {
      const slug = route.params.slug as string
      const group = inquiryGroupsStore.bySlug(slug)
      if (group) {
        await inquiryGroupStore.load(group.id)
      } else {
        groupNotFound.value = true
      }
    }
  } catch (error) {
    console.error('Error loading data:', error)
    showError(t('agora', 'Failed to load data'))
  } finally {
    isLoading.value = false
  }
})

watch(
  () => route.params.slug,
  async (newSlug, oldSlug) => {
    if (newSlug === oldSlug) return
    isLoading.value = true
    groupNotFound.value = false
    if (hasSlug.value) {
      const group = inquiryGroupsStore.bySlug(route.params.slug as string)
      if (group) {
        await inquiryGroupStore.load(group.id)
      } else {
        groupNotFound.value = true
      }
    }
    isLoading.value = false
  }
)
</script>

<style lang="scss" scoped>
// ============================================================
// DESIGN TOKENS (local, composable with Nextcloud vars)
// ============================================================
.inquiry-group-page {
  --ig-radius-sm: 8px;
  --ig-radius: 12px;
  --ig-radius-lg: 16px;

  --ig-shadow-xs: 0 1px 2px rgba(15, 23, 42, 0.04);
  --ig-shadow-sm: 0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04);
  --ig-shadow-md: 0 4px 12px rgba(15, 23, 42, 0.08), 0 2px 4px rgba(15, 23, 42, 0.04);
  --ig-shadow-lg: 0 12px 32px rgba(15, 23, 42, 0.12), 0 4px 8px rgba(15, 23, 42, 0.06);

  --ig-accent: var(--color-primary-element, #4a6f8f);
  --ig-accent-soft: rgba(74, 111, 143, 0.08);

  --ig-ease: cubic-bezier(0.4, 0, 0.2, 1);

  width: 100%;
  min-height: 100vh;
  background: transparent;
}

// ============================================================
// BREADCRUMB
// ============================================================
.breadcrumb-bar {
  background: linear-gradient(135deg, #1f2a37 0%, #2c3e50 55%, #34495e 100%);
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  .breadcrumb-family {
    background: rgba(255, 255, 255, 0.15) !important;
    border-left: 2px solid var(--color-primary-element, #2196f3);
  }

  .breadcrumb-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;

    .breadcrumb-home,
    .breadcrumb-item {
      color: rgba(255, 255, 255, 0.92);
      font-weight: 500;
      font-size: 13px;
      padding: 6px 10px;
      background: transparent;
      border-radius: var(--ig-radius-sm);
      transition:
        background 0.18s var(--ig-ease),
        color 0.18s var(--ig-ease);
      min-width: auto;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
        color: white;
      }
    }

    .breadcrumb-label {
      margin-left: 6px;
    }

    .breadcrumb-separator {
      color: rgba(255, 255, 255, 0.35);
      font-weight: 300;
      font-size: 13px;
      padding: 0 2px;
    }

    .breadcrumb-current {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      background: rgba(255, 255, 255, 0.12);
      border-radius: var(--ig-radius-sm);
      color: white;
      font-weight: 600;
      font-size: 13px;
      border-left: 2px solid var(--color-primary-element, #2196f3);
    }

    .breadcrumb-count {
      font-weight: 500;
      font-size: 11px;
      opacity: 0.85;
      background: rgba(255, 255, 255, 0.18);
      padding: 1px 8px;
      border-radius: 999px;
    }

    .breadcrumb-icon {
      width: 16px;
      height: 16px;
      display: inline-flex;
    }
  }
}

// ============================================================
// HEADER
// ============================================================
.section-title-block {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.back-to-types {
  font-size: 12.5px;
  font-weight: 600;
}

.group-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 28px 24px;
  background: var(--color-main-background, #fff);
  border-bottom: 1px solid var(--color-border, #e5e7eb);
  margin-bottom: 32px;
  flex-wrap: wrap;

  .group-icon-badge {
    width: 60px;
    height: 60px;
    border-radius: var(--ig-radius-lg);
    background: linear-gradient(135deg, #6c8eb2 0%, #4a6f8f 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 16px rgba(74, 111, 143, 0.28);
    flex-shrink: 0;

    .group-icon {
      width: 28px;
      height: 28px;
      color: white;
    }
  }

  .group-title-section {
    flex: 1;
    min-width: 0;

    .group-title {
      font-size: 26px;
      font-weight: 700;
      margin: 0;
      color: var(--color-main-text, #111827);
      letter-spacing: -0.015em;
      line-height: 1.2;
    }

    .group-subtitle {
      margin-top: 6px;

      p {
        color: var(--color-text-maxcontrast, #6b7280);
        font-size: 14.5px;
        line-height: 1.5;
        margin: 0 0 10px 0;
        max-width: 800px;
      }

      .inquiry-count-badge,
      .groups-count-badge {
        display: inline-flex;
        align-items: center;
        background: var(--ig-accent-soft);
        color: var(--ig-accent);
        padding: 4px 11px;
        border-radius: 999px;
        font-weight: 600;
        font-size: 12px;
        letter-spacing: 0.01em;
      }
    }
  }

  .header-right {
    flex-shrink: 0;
  }
}

// ============================================================
// CONTENT
// ============================================================
.content-area {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 24px 48px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  gap: 16px;
  flex-wrap: wrap;

  h3 {
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.005em;
    color: var(--color-main-text, #111827);
    margin: 0;
  }

  .create-button {
    background: var(--ig-accent);
    color: white;
    font-weight: 600;
    font-size: 13px;
    padding: 8px 16px;
    border: none;
    border-radius: var(--ig-radius-sm);
    box-shadow: var(--ig-shadow-sm);
    transition:
      transform 0.15s var(--ig-ease),
      box-shadow 0.15s var(--ig-ease),
      background 0.15s var(--ig-ease);

    &:hover {
      background: #3d5d78;
      transform: translateY(-1px);
      box-shadow: var(--ig-shadow-md);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

.inquiry-group-content {
  margin-top: 24px;
}

.experience-container {
  margin-top: 24px;
}

// ============================================================
// GROUPS GRID + VIGNETTES — modernized
// ============================================================
.groups-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  align-items: stretch;
  margin-bottom: 32px;
}

.group-vignette-wrapper {
  position: relative;
  display: flex;
}

.vignette-container {
  position: relative;
  width: 100%;
  padding-bottom: 56px;
  display: flex;

  &:hover {
    .owner-menu-under {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      pointer-events: auto;
    }
  }
}

.group-vignette {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 280px;
  background: var(--color-main-background, #fff);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: var(--ig-radius-lg);
  overflow: hidden;
  cursor: pointer;
  box-shadow: var(--ig-shadow-xs);
  transition:
    transform 0.22s var(--ig-ease),
    box-shadow 0.22s var(--ig-ease),
    border-color 0.22s var(--ig-ease);

  &:hover {
    transform: translateY(-3px);
    border-color: var(--color-primary-element, #2196f3);
    box-shadow: var(--ig-shadow-lg);

    .vignette-cover img {
      transform: scale(1.04);
    }

    .view-group-button {
      color: var(--ig-accent);
      background: var(--ig-accent-soft);

      .chevron {
        transform: translateX(2px);
      }
    }
  }

  // ---------- Cover ----------
  .vignette-cover {
    height: 130px;
    overflow: hidden;
    position: relative;
    background: linear-gradient(135deg, #eef2f7 0%, #dbe3ec 100%);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s var(--ig-ease);
    }

    .vignette-cover-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, transparent 55%, rgba(15, 23, 42, 0.35));
    }
  }

  // ---------- Content ----------
  .vignette-content {
    flex: 1;
    padding: 18px 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .vignette-icon {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: linear-gradient(135deg, #6c8eb2 0%, #4a6f8f 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      box-shadow: 0 4px 10px rgba(74, 111, 143, 0.22);

      :deep(svg),
      :deep(img) {
        width: 18px;
        height: 18px;
      }
    }

    h4 {
      font-size: 16px;
      font-weight: 600;
      letter-spacing: -0.005em;
      margin: 0;
      color: var(--color-main-text, #111827);
      line-height: 1.35;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .vignette-description {
      color: var(--color-text-maxcontrast, #6b7280);
      font-size: 13px;
      line-height: 1.5;
      margin: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      min-height: 39px; // 2 lines × 19.5px ≈ consistent height
    }

    // ---------- Stats chips ----------
    .vignette-stats {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-top: auto;

      .stat-item {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        padding: 3px 9px;
        background: var(--color-background-dark, #f3f4f6);
        border-radius: 999px;
        font-size: 11.5px;
        font-weight: 500;
        color: var(--color-text-maxcontrast, #6b7280);
        line-height: 1.4;

        .stat-icon {
          font-size: 12px;
          line-height: 1;
          opacity: 0.9;
        }

        .stat-value {
          font-weight: 600;
          color: var(--color-main-text, #111827);
        }
      }
    }

    // ---------- CTA ----------
    .vignette-footer {
      margin-top: 6px;

      .view-group-button {
        width: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 8px 12px;
        background: transparent;
        color: var(--color-text-maxcontrast, #4b5563);
        border: none;
        border-radius: var(--ig-radius-sm);
        font-weight: 600;
        font-size: 12.5px;
        letter-spacing: 0.01em;
        cursor: pointer;
        transition:
          background 0.18s var(--ig-ease),
          color 0.18s var(--ig-ease);

        .chevron {
          transition: transform 0.18s var(--ig-ease);
        }
      }
    }
  }
}

// ============================================================
// OWNER MENU — floating pill card
// ============================================================
.owner-menu-under {
  position: absolute;
  top: calc(100% - 52px); // sits just under the card
  left: 0;
  right: 0;
  z-index: 50;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-6px);
  transition:
    opacity 0.2s var(--ig-ease),
    transform 0.2s var(--ig-ease),
    visibility 0.2s var(--ig-ease);

  .owner-menu-content {
    display: flex;
    gap: 4px;
    padding: 6px;
    background: var(--color-main-background, #fff);
    border: 1px solid var(--color-border, #e5e7eb);
    border-radius: var(--ig-radius);
    box-shadow: var(--ig-shadow-md);

    .menu-item {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 7px 8px;
      font-size: 11.5px;
      font-weight: 600;
      letter-spacing: 0.01em;
      border-radius: var(--ig-radius-sm);
      background: transparent;
      color: var(--color-text-maxcontrast, #4b5563);
      border: none;
      cursor: pointer;
      white-space: nowrap;
      transition:
        background 0.15s var(--ig-ease),
        color 0.15s var(--ig-ease);

      :deep(svg) {
        width: 13px;
        height: 13px;
        fill: currentColor;
        flex-shrink: 0;
      }

      &:hover {
        background: var(--color-background-hover, #f3f4f6);
      }

      &.modify:hover {
        color: #2563eb;
        background: rgba(37, 99, 235, 0.08);
      }

      &.delete:hover {
        color: #dc2626;
        background: rgba(220, 38, 38, 0.08);
      }

      &.archive:hover {
        color: #059669;
        background: rgba(5, 150, 105, 0.08);
      }
    }
  }
}

// ============================================================
// FAMILY BROWSER — type vignettes
// ============================================================
.types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.type-vignette {
  display: flex;
  flex-direction: column;
  background: var(--color-main-background, #fff);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: var(--ig-radius-lg);
  padding: 22px;
  gap: 14px;
  box-shadow: var(--ig-shadow-xs);
  transition:
    transform 0.2s var(--ig-ease),
    box-shadow 0.2s var(--ig-ease),
    border-color 0.2s var(--ig-ease);

  &:hover {
    transform: translateY(-2px);
    border-color: var(--color-primary-element, #2196f3);
    box-shadow: var(--ig-shadow-md);
  }

  &__icon {
    width: 52px;
    height: 52px;
    border-radius: var(--ig-radius);
    background: linear-gradient(135deg, #6c8eb2 0%, #4a6f8f 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 4px 12px rgba(74, 111, 143, 0.22);

    :deep(svg),
    :deep(img) {
      width: 24px;
      height: 24px;
    }
  }

  &__body {
    flex: 1;
    min-width: 0;
  }

  &__title {
    margin: 0 0 6px;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.005em;
    color: var(--color-main-text, #111827);
  }

  &__desc {
    margin: 0 0 10px;
    font-size: 13px;
    color: var(--color-text-maxcontrast, #6b7280);
    line-height: 1.5;
  }

  &__count {
    display: inline-flex;
    align-items: center;
    background: var(--ig-accent-soft);
    color: var(--ig-accent);
    font-size: 11.5px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 999px;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
}

// ============================================================
// LOADING
// ============================================================
.loading-state {
  text-align: center;
  padding: 60px 20px;

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--color-border, #e5e7eb);
    border-top-color: var(--color-primary-element, #2196f3);
    border-radius: 50%;
    margin: 0 auto 18px;
    animation: spin 0.9s linear infinite;
  }

  p {
    color: var(--color-text-maxcontrast, #6b7280);
    font-size: 14px;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

// ============================================================
// NOT FOUND / EMPTY
// ============================================================
.not-found-state,
.empty-state {
  text-align: center;
  padding: 72px 20px;
  max-width: 1600px;
  margin: 0 auto;

  .not-found-icon,
  .empty-icon {
    font-size: 56px;
    margin-bottom: 20px;
    opacity: 0.45;
  }

  h2,
  h3 {
    font-size: 22px;
    font-weight: 600;
    color: var(--color-main-text, #111827);
    margin: 0 0 12px;
  }

  p {
    color: var(--color-text-maxcontrast, #6b7280);
    font-size: 15px;
    line-height: 1.55;
    margin: 0 auto 26px;
    max-width: 500px;
  }
}

// ============================================================
// RESPONSIVE
// ============================================================
@media (max-width: 768px) {
  .group-header {
    padding: 22px 18px;

    .group-icon-badge {
      width: 52px;
      height: 52px;
    }

    .group-title {
      font-size: 21px;
    }
  }

  .breadcrumb-bar .breadcrumb-container {
    padding: 0 16px;
    gap: 4px;

    .breadcrumb-home,
    .breadcrumb-item {
      font-size: 12px;
      padding: 5px 8px;
    }
  }

  .content-area {
    padding: 0 16px 32px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .groups-grid,
  .types-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  // Disable the hover-only reveal on touch; show owner menu inline under card
  .vignette-container {
    padding-bottom: 8px;
  }

  .owner-menu-under {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    margin-top: 8px;

    .owner-menu-content {
      flex-wrap: wrap;

      .menu-item {
        flex: 1 0 auto;
      }
    }
  }
}
</style>
