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
          <!-- Home Button -->
          <NcButton
            type="tertiary"
            aria-label="t('agora', 'Home')"
            class="breadcrumb-home"
            :to="{
              name: 'menu',
            }"
          >
            <template #icon>
              <component :is="InquiryGeneralIcons.Home" :size="20" />
            </template>
            <span class="breadcrumb-label">{{ t('agora', 'Home') }}</span>
          </NcButton>

          <!-- Parent groups -->
          <template v-for="parent in parentGroups" :key="parent.id">
            <div class="breadcrumb-separator">❯</div>
            <NcButton
              type="tertiary"
              class="breadcrumb-item"
              aria-label="t('agora', 'Parent')"
              @click="selectGroup(parent)"
            >
              <div class="breadcrumb-item-content">
                <component :is="getGroupTypeIconComponent(parent.type)" class="breadcrumb-icon" />
                <span class="breadcrumb-label">{{ parent.title }}</span>
              </div>
            </NcButton>
          </template>

          <!-- Current group or type -->
          <div v-if="hasSlug || parentGroups.length > 0" class="breadcrumb-separator">❯</div>
          <div class="breadcrumb-current">
            <div class="breadcrumb-current-content">
              <component :is="currentIconComponent" class="breadcrumb-icon" />
              <span class="breadcrumb-label">{{ currentBreadcrumbTitle }}</span>
              <span v-if="totalInquiries > 0 && hasSlug" class="inquiry-count">
                ({{ totalInquiries }})
              </span>
              <span v-else-if="displayedGroups.length > 0 && !hasSlug" class="inquiry-count">
                ({{ displayedGroups.length }})
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- White Separation Line -->
      <div class="separation-line"></div>

      <!-- Group not found - Show this first -->
      <div v-if="groupNotFound" class="not-found-state">
        <div class="not-found-icon">🔍</div>
        <h2>{{ t('agora', 'Group not found') }}</h2>
        <p>
          {{
            t(
              'agora',
              'The group you are looking for does not exist or you do not have permission to access it.'
            )
          }}
        </p>
        <NcButton type="primary" :to="{ name: 'menu' }">
          {{ t('agora', 'Back to home') }}
        </NcButton>
      </div>

      <!-- Main Content - Only show if group is found -->
      <template v-else>
        <!-- Header Section -->
        <div class="group-header">
          <div class="header-left">
            <div class="group-icon-badge">
              <component :is="currentIconComponent" class="group-icon" />
            </div>
            <div class="group-title-section">
              <h1 class="group-title">{{ currentTitle }}</h1>
              <div class="group-subtitle">
                <p>{{ currentDescription }}</p>
                <span v-if="totalInquiries > 0 && hasSlug" class="inquiry-count-badge">
                  {{ totalInquiries }} {{ t('agora', 'inquiries') }}
                </span>
                <span v-if="displayedGroups.length > 0 && !hasSlug" class="groups-count-badge">
                  {{ displayedGroups.length }} {{ t('agora', 'groups') }}
                </span>
              </div>
            </div>
            <!-- Experience Switcher - Only when in a group with UI config -->
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

        <!-- Loading State -->
        <div v-if="isLoading" class="loading-state">
          <div class="spinner"></div>
          <p>{{ t('agora', 'Loading …') }}</p>
        </div>

        <!-- Content when loaded -->
        <div v-else class="content-area">
          <!-- ============================================================ -->
          <!-- CASE 1: Experience Renderer - For groups with display_architecture -->
          <!-- ============================================================ -->
          <template v-if="currentInquiryGroup && hasCustomArchitecture && experience !== 'classic'">
            <div class="experience-container">
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
                @experience-change="handleExperienceChange"
                @display-change="handleDisplayChange"
                @create-inquiry="handleCreateInquiry"
              />
            </div>
          </template>

	  <!-- In InquiryGroup.vue - replace the CASE 2 section -->

<!-- ============================================================ -->
<!-- CASE 2: Fallback display - For groups without custom architecture -->
<!-- ============================================================ -->
<template v-else-if="currentInquiryGroup">
  <!-- Section Header -->
  <div class="section-header">
    <h3>{{ sectionTitle }}</h3>
    <div v-if="currentInquiryGroup && canUserEditGroup(currentInquiryGroup)" class="section-actions">
      <NcButton class="create-button" @click="createInquiryGroup(currentGroupType)">
        ➕ {{ t('agora', 'Create group') }}
      </NcButton>
    </div>
  </div>

  <!-- Groups Grid - Show child groups -->
  <div v-if="displayedGroups.length > 0" class="groups-grid">
    <div
      v-for="group in displayedGroups"
      :key="group.id"
      class="group-vignette-wrapper"
      @mouseenter="hoveredGroupId = group.id"
      @mouseleave="hoveredGroupId = null"
    >
                <div class="vignette-container">
                  <div class="group-vignette" @click="selectGroup(group)">
                    <div v-if="group.coverId" class="vignette-cover">
                      <img :src="getCoverUrl(group.coverId)" :alt="group.title" />
                      <div class="vignette-cover-overlay"></div>
                    </div>
                    <div class="vignette-content">
                      <div class="vignette-icon">
                        <component :is="getGroupTypeIconComponent(group.type)" />
                      </div>
                      <h4>{{ group.title }}</h4>
                      <p v-if="group.description" class="vignette-description">
                        {{ group.description }}
                      </p>
                      <div class="vignette-stats">
                        <div class="stat-item">
                          <span class="stat-icon">📝</span>
                          <span class="stat-value">{{ group.inquiryIds?.length || 0 }}</span>
                        </div>
                        <div v-if="getGroupChildren(group).length > 0" class="stat-item">
                          <span class="stat-icon">👥</span>
                          <span class="stat-value">{{ getGroupChildren(group).length }}</span>
                        </div>
                      </div>
                      <div class="vignette-footer">
                        <NcButton class="view-group-button" @click.stop="selectGroup(group)">
                          {{ t('agora', 'View group') }}
                          <template #icon>
                            <svg width="16" height="16" viewBox="0 0 24 24">
                              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                            </svg>
                          </template>
                        </NcButton>
                      </div>
                    </div>
                  </div>

                  <!-- Owner menu -->
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
                          <svg width="14" height="14" viewBox="0 0 24 24">
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
                          <svg width="14" height="14" viewBox="0 0 24 24">
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
                          <svg width="14" height="14" viewBox="0 0 24 24">
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

            <!-- Legacy Middle + Main content (if no custom architecture) -->
            <div class="inquiry-group-content">
              <InquiryGroupViewMain
                :group="currentInquiryGroup"
                :inquiry-ids="currentInquiryGroup.inquiryIds"
                @view-inquiry="handleViewInquiry"
              />
            </div>
          </template>

          <!-- No groups but we have a slug? Show empty state -->
          <template v-else-if="currentInquiryGroup && displayedGroups.length === 0">
            <div class="empty-state">
              <div class="empty-icon">📁</div>
              <h3>{{ t('agora', 'No groups available') }}</h3>
              <p>{{ t('agora', 'There are no groups in this section yet.') }}</p>
              <NcButton
                v-if="canUserEditGroup(currentInquiryGroup)"
                type="primary"
                @click="createInquiryGroup(currentGroupType)"
              >
                {{ t('agora', 'Create first group') }}
              </NcButton>
            </div>
          </template>

          <!-- ============================================================ -->
          <!-- Root level (no slug) - Show groups grid -->
          <!-- ============================================================ -->
          <template v-else-if="!hasSlug">
            <div class="section-header">
              <h3>{{ selectedTypeLabel }}</h3>
              <div v-if="canUserEditGroup(null)" class="section-actions">
                <NcButton class="create-button" @click="createInquiryGroup(currentGroupType)">
                  ➕ {{ t('agora', 'Create group') }}
                </NcButton>
              </div>
            </div>

            <div v-if="displayedGroups.length > 0" class="groups-grid">
              <div v-for="group in displayedGroups" :key="group.id" class="group-vignette-wrapper">
                <div class="vignette-container">
                  <div class="group-vignette" @click="selectGroup(group)">
                    <div v-if="group.coverId" class="vignette-cover">
                      <img :src="getCoverUrl(group.coverId)" :alt="group.title" />
                      <div class="vignette-cover-overlay"></div>
                    </div>
                    <div class="vignette-content">
                      <div class="vignette-icon">
                        <component :is="getGroupTypeIconComponent(group.type)" />
                      </div>
                      <h4>{{ group.title }}</h4>
                      <p v-if="group.description" class="vignette-description">
                        {{ group.description }}
                      </p>
                      <div class="vignette-stats">
                        <div class="stat-item">
                          <span class="stat-icon">📝</span>
                          <span class="stat-value">{{ group.inquiryIds?.length || 0 }}</span>
                        </div>
                        <div v-if="getGroupChildren(group).length > 0" class="stat-item">
                          <span class="stat-icon">👥</span>
                          <span class="stat-value">{{ getGroupChildren(group).length }}</span>
                        </div>
                      </div>
                      <div class="vignette-footer">
                        <NcButton class="view-group-button" @click.stop="selectGroup(group)">
                          {{ t('agora', 'View group') }}
                          <template #icon>
                            <svg width="16" height="16" viewBox="0 0 24 24">
                              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                            </svg>
                          </template>
                        </NcButton>
                      </div>
                    </div>
                  </div>
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
                          <svg width="14" height="14" viewBox="0 0 24 24">
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
                          <svg width="14" height="14" viewBox="0 0 24 24">
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
                          <svg width="14" height="14" viewBox="0 0 24 24">
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

            <div v-else class="empty-state">
              <div class="empty-icon">📁</div>
              <h3>{{ t('agora', 'No groups available') }}</h3>
              <p>{{ t('agora', 'There are no groups in this section yet.') }}</p>
              <NcButton
                v-if="canUserEditGroup(null)"
                type="primary"
                @click="createInquiryGroup(currentGroupType)"
              >
                {{ t('agora', 'Create first group') }}
              </NcButton>
            </div>
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
        <InquiryGroupCreateDlg
          :inquiry-group-type="selectedInquiryGroupTypeForCreation"
          :parent-group-id="selectedParentId"
          :available-groups="availableGroups"
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
</template>

<script setup lang="ts">
// ============================================================
// EXISTING IMPORTS
// ============================================================
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
import type { InquiryGroupType, InquiryGroup } from '../stores/inquiryGroups.types.ts'
import InquiryGroupViewMain from '../components/InquiryGroup/InquiryGroupViewMain.vue'
import { createInquiryGroupContext, canArchive, canEdit, canDelete } from '../utils/permissions.ts'

// ============================================================
// ============================================================
import ExperienceRenderer from '../components/Experience/ExperienceRenderer.vue'
import ExperienceSwitcher from '../components/Experience/ExperienceSwitcher.vue'
import { useGroupExperience } from '../composables/useGroupExperience'
import type { ExperienceKey, DisplayMode } from '../composables/useExperience'
import type { Inquiry, Option } from '../Types/index.ts'

// ============================================================
// EXISTING STORE INITIALIZATION
// ============================================================
const route = useRoute()
const router = useRouter()
const sessionStore = useSessionStore()
const inquiriesStore = useInquiriesStore()
const inquiryGroupsStore = useInquiryGroupsStore()
const inquiryGroupStore = useInquiryGroupStore()

// ============================================================
// EXISTING STATE
// ============================================================
const isLoading = ref(true)
const hoveredGroupId = ref<number | null>(null)
const selectedParentId = ref(null)
const createGroupDlgToggle = ref(false)
const selectedInquiryGroupTypeForCreation = ref<InquiryGroupType | null>(null)
const groupNotFound = ref(false)

// Delete dialog state
const showDeleteDialog = ref(false)
const deleteDialogGroup = ref<InquiryGroup | null>(null)

// ============================================================
// EXISTING COMPUTED
// ============================================================

// State for selected family
const selectedFamily = computed({
  get: () => inquiriesStore.advancedFilters?.familyType || null,
  set: (value) => inquiriesStore.setFamilyType(value || ''),
})

// Check if we have a slug in the route
const hasSlug = computed(() => {
  const slug = route.params.slug as string
  // Check for undefined, null, empty string, or 'undefined' string (for backward compatibility)
  return slug && slug !== 'undefined' && slug !== '' && slug !== 'null'
})

function createGroupPermissionContext(group: InquiryGroup) {
  return createInquiryGroupContext(group)
}

// Get current group if slug exists
const currentInquiryGroup = computed(() => {
  if (!hasSlug.value) return null
  const slug = route.params.slug as string
  const group = inquiryGroupsStore.bySlug(slug)

  if (!group || !group.owner) {
    return null
  }

  return group
})

// ============================================================
// EXPERIENCE STATE
// ============================================================
const currentGroup = computed(() => currentInquiryGroup.value)
const {
  experience,
  displayMode,
  displayArchitecture,
  layoutConfig,
  features,
  hasCustomArchitecture,
  availableExperiences,
  switchExperience,
  switchDisplay,
} = useGroupExperience(currentGroup)

/*
function selectGroup(group: InquiryGroup) {
  if (group.slug) {
    router.push({ name: 'group-list', params: { slug: group.slug }, query: route.query })
  } else if (group.id) {
    // fallback to ID if slug not present (should not happen normally)
    router.push({ name: 'group', params: { id: String(group.id) }, query: route.query })
  }
}*/

function selectGroup(group: InquiryGroup) {
  if (!group) return

  // If the group is the same as current, reload it
  if (currentInquiryGroup.value?.id === group.id) {
    // Reload the current group
    inquiryGroupStore.load(group.id)
    return
  }

  // Navigate to the group
  if (group.slug) {
    router.push({
      name: 'group-list',
      params: { slug: group.slug },
      query: { ...route.query }
    })
  } else if (group.id) {
    router.push({
      name: 'group',
      params: { id: String(group.id) },
      query: { ...route.query }
    })
  }
}

// Get current group type
const currentGroupType = computed(() => {
  // If we have a current inquiry group, use its type
  if (currentInquiryGroup.value) {
    return currentInquiryGroup.value.type
  }
  // Otherwise use the store's current group type
  return inquiryGroupsStore.currentGroupType || ''
})

// ============================================================
// GROUP INQUIRIES AND OPTIONS
// ============================================================
const groupInquiries = computed(() => {
  if (!currentInquiryGroup.value || !currentInquiryGroup.value.inquiryIds) return []
  return currentInquiryGroup.value.inquiryIds
    .map((id) => inquiriesStore.inquiries.find((i) => i.id === id))
    .filter(Boolean) as Inquiry[]
})

// ============================================================
// EXISTING HELPER FUNCTIONS
// ============================================================
function canUserArchiveGroup(group: InquiryGroup | null): boolean {
  if (!group) return false
  const context = createGroupPermissionContext(group)
  if (!context) return false
  return canArchive(context)
}

function canUserEditGroup(group: InquiryGroup | null): boolean {
  if (sessionStore.currentUser.isAdmin || sessionStore.currentUser.isGroupEditor) return true
  if (!group) {
    return false
  }
  const context = createGroupPermissionContext(group)
  if (!context) return false
  return canEdit(context)
}

function canUserDeleteGroup(group: InquiryGroup | null): boolean {
  if (!group) return false
  const context = createGroupPermissionContext(group)
  if (!context) return false
  return canDelete(context)
}

// Get parent groups for breadcrumb
const parentGroups = computed(() => {
  if (!currentInquiryGroup.value) return []

  const parents: InquiryGroup[] = []
  let currentGroup = currentInquiryGroup.value

  while (currentGroup.parentId) {
    const parent = inquiryGroupsStore.inquiryGroups.find((g) => g.id === currentGroup.parentId)
    if (parent) {
      parents.unshift(parent)
      currentGroup = parent
    } else {
      break
    }
  }

  return parents
})


const displayedGroups = computed(() => {
  // If no slug, show root groups based on current type
  if (!hasSlug.value || route.params.slug === 'undefined' || route.params.slug === 'null') {
    const groupsInFamily = inquiryGroupsStore.byFamilyType(
      inquiriesStore.advancedFilters.familyType
    )

    // Show root groups (parentId === null) for the current type
    const rootGroups = groupsInFamily.filter(
      (group) =>
        group.parentId === null &&
        group.status.groupStatus !== 'archived' &&
        group.type === inquiryGroupsStore.currentGroupType
    )

    return rootGroups.sort((a, b) => a.title.localeCompare(b.title))
  }

  // When there's a valid slug, show child groups of the current group
  if (hasSlug.value && currentInquiryGroup.value) {
    console.log(" HAS SLUG ", hasSlug.value )
    console.log(" HAS SLUG CURRENT INQUIRY GROUP ", currentInquiryGroup.value )
    const childGroups = inquiryGroupsStore.inquiryGroups.filter(
      (group) =>
        group.parentId === currentInquiryGroup.value?.id && group.groupStatus !== 'archived'
    )
    return childGroups.sort((a, b) => a.title.localeCompare(b.title))
  }

  return []
})

// Get total inquiries for current group
const totalInquiries = computed(() => {
  if (!hasSlug.value || !currentInquiryGroup.value) return 0
  return inquiryGroupStore.inquiryIds.length
})

// Section title
const sectionTitle = computed(() => {
  if (hasSlug.value && currentInquiryGroup.value) {
    return t('agora', '')
  }
  return selectedTypeLabel.value
})

// Get icon component for group type
const getGroupTypeIconComponent = (type: string) => {
  const typeData = getInquiryGroupTypeData(type, sessionStore.appSettings.inquiryGroupTypeTab)
  return typeData?.icon || 'div'
}

// Helper function to get children
function getGroupChildren(group: InquiryGroup) {
  if (!group || !group.id) return []

  const storeGroup = inquiryGroupsStore.inquiryGroups.find((g) => g.id === group.id)
  if (storeGroup?.childs) {
    return storeGroup.childs
  }

  const allGroups = inquiryGroupsStore.inquiryGroups || []
  return allGroups.filter((g) => g.parentId === group.id)
}

// Current icon component
const currentIconComponent = computed(() => {
  if (hasSlug.value && currentInquiryGroup.value) {
    return getGroupTypeIconComponent(currentInquiryGroup.value.type)
  }
  return getGroupTypeIconComponent(currentGroupType.value)
})

// Get type data
const selectedTypeData = computed(() =>
  getInquiryGroupTypeData(currentGroupType.value, sessionStore.appSettings.inquiryGroupTypeTab)
)

const selectedTypeLabel = computed(() =>
  selectedTypeData.value?.label
    ? t('agora', selectedTypeData.value.label)
    : t('agora', 'You should not be here')
)

const selectedTypeDescription = computed(() =>
  selectedTypeData.value?.description
    ? t('agora', selectedTypeData.value.description)
    : t('agora', 'Browse available groups')
)

// Current title
const currentTitle = computed(() => {
  if (hasSlug.value && currentInquiryGroup.value) {
    return currentInquiryGroup.value.title || currentInquiryGroup.value.name
  }
  return selectedTypeLabel.value
})

// Current description
const currentDescription = computed(() => {
  if (hasSlug.value && currentInquiryGroup.value) {
    return currentInquiryGroup.value.titleExt || selectedTypeDescription.value
  }
  return selectedTypeDescription.value
})

// Breadcrumb current title
const currentBreadcrumbTitle = computed(() => currentTitle.value)

// Delete dialog properties
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
      if (deleteDialogGroup.value) {
        await performDeleteGroup(deleteDialogGroup.value)
      }
      showDeleteDialog.value = false
      deleteDialogGroup.value = null
    },
  },
])

// ============================================================
// EXISTING METHODS
// ============================================================
function navigateToHome() {
  router.push({ name: 'menu' })
}
/*
function selectGroup(group: InquiryGroup) {
    if (group.slug) {
	router.push({ name: 'group-list', params: { slug: group.slug } })
    }
}
*/

function createInquiryGroup(inquiryGroupType: InquiryGroupType) {
  if (hasSlug.value) selectedParentId.value = currentInquiryGroup?.value.id
  selectedInquiryGroupTypeForCreation.value = inquiryGroupType
  createGroupDlgToggle.value = true
}

const BASE_URL = window.location.origin

function getNextcloudPreviewUrl(fileId: number, x = 1920, y = 1080, autoScale = true) {
  return `${BASE_URL}/index.php/core/preview?fileId=${fileId}&x=${x}&y=${y}&a=${autoScale ? 1 : 0}`
}

function getCoverUrl(coverId: string) {
  return getNextcloudPreviewUrl(coverId)
}

function modifyGroup(group: InquiryGroup) {
  router.push({
    name: 'group',
    params: { id: group.id },
  })
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
      if (group.parentId) {
        const parent = inquiryGroupsStore.inquiryGroups.find((g) => g.id === group.parentId)
        if (parent?.slug) {
          router.push({ name: 'group-list', params: { slug: parent.slug } })
        } else {
          navigateToHome()
        }
      } else {
        navigateToHome()
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
    navigateToHome()
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
    router.push({ name: 'group', params: { slug: newGroup.slug } })
  }
}

// ============================================================
// EXPERIENCE EVENT HANDLERS
// ============================================================
// ============================================================
// EXPERIENCE EVENT HANDLERS - FIXED VERSION
// ============================================================

function handleExperienceChange(key: ExperienceKey) {
  switchExperience(key)
}

function handleDisplayChange(mode: DisplayMode) {
  switchDisplay(mode)
}

/**
 * Handle view inquiry event from ExperienceRenderer
 * Navigates to the selected inquiry page
 */
function handleViewInquiry(inquiry: Inquiry) {
  if (!inquiry) {
    console.warn('handleViewInquiry: No inquiry provided')
    showError(t('agora', 'Cannot open inquiry'))
    return
  }
  
  if (!inquiry.id) {
    console.warn('handleViewInquiry: Inquiry has no ID', inquiry)
    showError(t('agora', 'Cannot open inquiry: missing ID'))
    return
  }
  
  // Navigate to the inquiry page
  router.push({
    name: 'inquiry',
    params: { id: String(inquiry.id) }
  }).catch(err => {
    console.error('Navigation error:', err)
    showError(t('agora', 'Failed to navigate to inquiry'))
  })
}

/**
 * Handle view option event from ExperienceRenderer
 * Navigates to the selected option page
 */
function handleViewOption(option: Option) {
  if (!option) {
    console.warn('handleViewOption: No option provided')
    showError(t('agora', 'Cannot open option'))
    return
  }
  
  if (!option.id) {
    console.warn('handleViewOption: Option has no ID', option)
    showError(t('agora', 'Cannot open option: missing ID'))
    return
  }
  
  router.push({
    name: 'option',
    params: { id: String(option.id) },
  }).catch(err => {
    console.error('Navigation error:', err)
    showError(t('agora', 'Failed to navigate to option'))
  })
}

/**
 * Handle view group event from ExperienceRenderer
 * Navigates to the selected group's page
 */
function handleViewGroup(group: InquiryGroup) {
  if (!group) {
    console.warn('Attempted to view null/undefined group')
    showError(t('agora', 'Cannot navigate to this group'))
    return
  }

  // If the group has a slug, navigate using the slug
  if (group.slug) {
    router.push({
      name: 'group-list',
      params: { slug: group.slug },
      query: { ...route.query }
    }).catch(err => {
      console.error('Navigation error:', err)
      showError(t('agora', 'Failed to navigate to group'))
    })
  }
  // Fallback to ID if no slug (should not happen normally)
  else if (group.id) {
    router.push({
      name: 'group',
      params: { id: String(group.id) },
      query: { ...route.query }
    }).catch(err => {
      console.error('Navigation error:', err)
      showError(t('agora', 'Failed to navigate to group'))
    })
  } else {
    console.warn('Group has no slug or id:', group)
    showError(t('agora', 'Cannot navigate to this group'))
  }
}

function handleCreateInquiry() {
  if (currentInquiryGroup.value) {
    router.push({
      name: 'inquiry-create',
      params: { groupId: currentInquiryGroup.value.id },
    })
  }
}


// ============================================================
// Available groups for dialog
// ============================================================

// ============================================================
// AUTO-SELECT FIRST AVAILABLE GROUP TYPE
// ============================================================

/**
 * Get all inquiry group types that have at least one group
 * (Same logic as NavigationGroup.vue)
 */
const availableGroupTypesWithGroups = computed(() => {
  const allTypes = sessionStore.appSettings?.inquiryGroupTypeTab || []
  const rootTypes = allTypes.filter((t: InquiryGroupType) => t.is_root === true)

  // Filter by current family if selected
  let types = rootTypes
  if (selectedFamily.value) {
    types = types.filter((t: InquiryGroupType) => t.family === selectedFamily.value)
  }

  // Only return types that have at least one group
  return types.filter((type: InquiryGroupType) => {
    const typeKey = type.type || type.group_type
    const count = inquiryGroupsStore.inquiryGroups.filter(
      (g) => g.type === typeKey && g.parentId === null && g.groupStatus !== 'archived'
    ).length
    return count > 0
  })
})

/**
 * Get the first available group type that has groups
 */
const firstAvailableGroupType = computed(() => {
  const types = availableGroupTypesWithGroups.value
  return types.length > 0 ? types[0] : null
})

/**
 * Get the type key from a group type object
 * @param type
 */
function getTypeKey(type: InquiryGroupType): string {
  return type.type || type.group_type || ''
}

// ============================================================
// AUTO-SELECT LOGIC
// ============================================================

// Watch for when there's no slug and set the current group type
watch(
  [() => route.params.slug, firstAvailableGroupType],
  ([slug, firstType]) => {
    // Only auto-select when there's no valid slug
    if (!slug || slug === '' || slug === 'undefined' || slug === 'null') {
      if (firstType) {
        const typeKey = getTypeKey(firstType)
        // Only set if different from current
        if (inquiryGroupsStore.currentGroupType !== typeKey) {
          inquiryGroupsStore.setCurrentGroupType(typeKey)
        }
      }
    }
  },
  { immediate: true }
)

// Also watch for family changes
watch(
  () => inquiriesStore.familyType,
  () => {
    // When family changes, re-evaluate the first available type
    const slug = route.params.slug as string
    if (!slug || slug === '' || slug === 'undefined' || slug === 'null') {
      const firstType = firstAvailableGroupType.value
      if (firstType) {
        const typeKey = getTypeKey(firstType)
        inquiryGroupsStore.setCurrentGroupType(typeKey)
      }
    }
  }
)

const availableGroups = computed(() => {
  const groups = sessionStore.currentUser.groups || {}
  if (typeof groups === 'object' && !Array.isArray(groups)) {
    console.log(' AVAILABLE GROUPS', groups)
    return Object.keys(groups)
  }
  console.log(' AVAILABLE GROUPS ', groups)
  return groups
})

// ============================================================
// Lifecycle
// ============================================================
const shouldGroupNotFound = computed(() => hasSlug.value && !currentInquiryGroup.value)

// Watch for group not found state
watch(
  shouldGroupNotFound,
  (newValue) => {
    groupNotFound.value = newValue
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
      inquiryGroupStore.load(group.id)
      if (!group) {
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
    
console.log('currentInquiryGroup:', currentInquiryGroup.value)
console.log('hasCustomArchitecture:', hasCustomArchitecture.value)
console.log('displayArchitecture:', displayArchitecture.value)
    if (hasSlug.value) {
      const slug = route.params.slug as string
      const group = inquiryGroupsStore.bySlug(slug)
      inquiryGroupStore.load(group.id)
      if (!group) {
        groupNotFound.value = true
      }
    }

    isLoading.value = false
  }
)

</script>

<style lang="scss" scoped>
// ============================================================
// EXISTING STYLES (kept as is)
// ============================================================
.inquiry-group-content {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.inquiry-group-page {
  width: 100%;
  height: 100%;
  background: transparent !important;
  min-height: 100vh;
}

// ============================================================
// Experience container styles
// ============================================================
.experience-container {
  padding: 0;
  width: 100%;
  min-height: 400px;
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 30px 20px 20px;
  background: white;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 16px;

  .header-left {
    display: flex;
    align-items: center;
    gap: 20px;
    max-width: 1600px;
    flex: 1;
    min-width: 0;
  }

  .header-right {
    flex-shrink: 0;
    padding-top: 8px;
  }

  .group-icon-badge {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #6c8eb2 0%, #4a6f8f 100%);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    flex-shrink: 0;

    .group-icon {
      width: 30px;
      height: 30px;
      color: white;
    }
  }

  .group-title-section {
    flex: 1;
    min-width: 0;

    .group-title {
      font-size: 28px;
      font-weight: 700;
      margin: 0;
      color: #2c3e50;
      line-height: 1.2;
    }

    .group-subtitle {
      margin-top: 10px;

      p {
        color: #5d6d7e;
        font-size: 16px;
        line-height: 1.4;
        max-width: 800px;
        margin: 0 0 10px 0;
      }

      .inquiry-count-badge,
      .groups-count-badge {
        background: linear-gradient(135deg, #6c8eb2 0%, #4a6f8f 100%);
        color: white;
        padding: 6px 12px;
        border-radius: 15px;
        font-weight: 600;
        font-size: 13px;
        box-shadow: 0 2px 8px rgba(0, 176, 155, 0.3);
      }

      .groups-count-badge {
        background: linear-gradient(135deg, #6c8eb2 0%, #4a6f8f 100%);
      }
    }
  }
}

// ============================================================
// EXISTING: Breadcrumb and other styles (kept as is)
// ============================================================
/* Breadcrumb - smaller on left */
.breadcrumb-bar {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  padding: 15px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  border-bottom: 3px solid var(--color-primary, #2196f3);

  .breadcrumb-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    gap: 10px;

    .breadcrumb-home {
      color: white;
      font-weight: 600;
      font-size: 14px;
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      transition: all 0.3s ease;
      min-width: auto;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .breadcrumb-label {
        margin-left: 6px;
      }
    }

    .breadcrumb-separator {
      color: rgba(255, 255, 255, 0.6);
      margin: 0 3px;
      font-weight: 300;
      font-size: 16px;
    }

    .breadcrumb-item {
      color: rgba(255, 255, 255, 0.9);
      font-weight: 500;
      font-size: 14px;
      padding: 6px 10px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 6px;
      transition: all 0.3s ease;
      min-width: auto;

      &:hover {
        background: rgba(255, 255, 255, 0.15);
      }

      .breadcrumb-item-content {
        display: flex;
        align-items: center;
        gap: 6px;
      }
    }

    .breadcrumb-current {
      color: white;
      font-weight: 700;
      font-size: 16px;
      margin-left: 3px;

      .breadcrumb-current-content {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 8px;
        border-left: 3px solid var(--color-primary, #2196f3);
      }

      .inquiry-count {
        font-weight: 400;
        font-size: 12px;
        opacity: 0.9;
        margin-left: 6px;
      }
    }

    .breadcrumb-icon {
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

/* White Separation Line */
.separation-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent);
  margin: 0;
}

// ============================================================
// EXISTING: Loading State (kept as is)
// ============================================================
.loading-state {
  text-align: center;
  padding: 60px 20px;

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e0e6ed;
    border-top-color: #667eea;
    border-radius: 50%;
    margin: 0 auto 20px;
    animation: spin 1s linear infinite;
  }

  p {
    color: #5d6d7e;
    font-size: 16px;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

// ============================================================
// EXISTING: Content Area (kept as is)
// ============================================================
.content-area {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px 40px;
}

// ============================================================
// EXISTING: Section Header (kept as is)
// ============================================================
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  h3 {
    font-size: 24px;
    font-weight: 600;
    color: white;
    margin: 0;
  }

  .section-actions {
    .create-button {
      background: linear-gradient(135deg, #6c8eb2 0%, #4a6f8f 100%);
      color: white;
      font-weight: 600;
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 176, 155, 0.3);
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 176, 155, 0.4);
      }
    }
  }
}

// ============================================================
// EXISTING: Groups Grid (kept as is)
// ============================================================
.groups-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  align-items: start;
}

// ============================================================
// EXISTING: Vignette styles (kept as is)
// ============================================================
.group-vignette-wrapper {
  position: relative;
  margin-bottom: 0px;
}

.vignette-container {
  position: relative;
  margin-bottom: 60px;

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
  background: white;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.05);
  min-height: 320px;
  max-height: 380px;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    border-color: var(--color-primary, #2196f3);

    .vignette-cover img {
      transform: scale(1.05);
    }
  }

  .vignette-cover {
    height: 120px;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .vignette-cover-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50px;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent);
    }
  }

  .vignette-content {
    padding: 16px 20px;
    flex: 1;
    display: flex;
    flex-direction: column;

    .vignette-icon {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #6c8eb2 0%, #4a6f8f 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 18px;
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      margin-bottom: 10px;
    }

    h4 {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 8px 0;
      color: #2c3e50;
      line-height: 1.3;
    }

    .vignette-description {
      color: #7f8c8d;
      font-size: 13px;
      line-height: 1.3;
      margin-bottom: 12px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      flex: 0 0 auto;
    }

    .vignette-stats {
      display: flex;
      gap: 15px;
      margin-bottom: 15px;

      .stat-item {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 13px;

        .stat-icon {
          opacity: 0.8;
        }

        .stat-value {
          font-weight: 600;
          color: #2c3e50;
        }
      }
    }

    .vignette-footer {
      margin-top: auto;

      .view-group-button {
        width: 100%;
        justify-content: center;
        background: linear-gradient(135deg, #6c8eb2 0%, #4a6f8f 100%);
        color: white;
        border: none;
        padding: 8px;
        border-radius: 8px;
        font-weight: 600;
        font-size: 12px;
        transition: all 0.3s ease;

        &:hover {
          background: linear-gradient(135deg, #764ba2, #667eea);
          transform: translateY(-1px);
        }
      }
    }
  }
}

.owner-menu-under {
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  z-index: 50;
  overflow: hidden;
  border: 1px solid #e0e6ed;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;

  .group-vignette-wrapper:hover & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .owner-menu-content {
    display: flex;
    padding: 8px;
    gap: 6px;
    background: #f8fafc;

    .menu-item {
      flex: 1;
      justify-content: center;
      padding: 8px 6px;
      font-size: 12px;
      font-weight: 500;
      border-radius: 6px;
      background: white;
      color: #64748b;
      border: 1px solid #e2e8f0;
      transition: all 0.2s ease;
      min-height: 36px;
      white-space: nowrap;
      cursor: pointer;

      &:hover {
        background: #f1f5f9;
        color: #475569;
        border-color: #cbd5e1;
        transform: translateY(-1px);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      }

      &:active {
        transform: translateY(0);
      }

      :deep(svg) {
        margin-right: 6px;
        fill: #64748b;
      }

      &.modify:hover {
        color: #3b82f6;
        border-color: #93c5fd;
        :deep(svg) {
          fill: #3b82f6;
        }
      }

      &.delete:hover {
        color: #ef4444;
        border-color: #fca5a5;
        :deep(svg) {
          fill: #ef4444;
        }
      }

      &.archive:hover {
        color: #10b981;
        border-color: #a7f3d0;
        :deep(svg) {
          fill: #10b981;
        }
      }
    }
  }
}

// ============================================================
// EXISTING: Not Found State
// ============================================================
.not-found-state {
  text-align: center;
  padding: 80px 20px;
  max-width: 1600px;
  margin: 0 auto;

  .not-found-icon {
    font-size: 60px;
    margin-bottom: 25px;
    opacity: 0.5;
  }

  h2 {
    font-size: 28px;
    color: #2c3e50;
    margin: 0 0 15px 0;
  }

  p {
    color: #7f8c8d;
    font-size: 16px;
    margin-bottom: 30px;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
}

// ============================================================
// Empty State
// ============================================================
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  border: 2px dashed #dee2e6;

  .empty-icon {
    font-size: 48px;
    margin-bottom: 20px;
    opacity: 0.6;
  }

  h3 {
    font-size: 22px;
    color: #2c3e50;
    margin: 0 0 12px 0;
  }

  p {
    color: #7f8c8d;
    font-size: 15px;
    margin-bottom: 20px;
  }
}

// ============================================================
// Responsive adjustments for header
// ============================================================
@media (max-width: 768px) {
  .group-header {
    flex-direction: column;
    align-items: stretch;
    padding: 25px 15px 15px;

    .header-left {
      flex-wrap: wrap;
    }

    .header-right {
      padding-top: 4px;
      align-self: flex-start;
    }
  }

  .breadcrumb-bar {
    padding: 12px 0;

    .breadcrumb-container {
      padding: 0 15px;
      gap: 6px;

      .breadcrumb-home,
      .breadcrumb-item {
        font-size: 13px;
        padding: 6px 8px;
      }

      .breadcrumb-current {
        font-size: 14px;

        .breadcrumb-current-content {
          padding: 6px 10px;
        }
      }
    }
  }

  .content-area {
    padding: 0 15px 30px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;

    h3 {
      font-size: 20px;
    }
  }

  .groups-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .owner-menu-under {
    .owner-menu-content {
      flex-direction: column;

      .menu-item {
        width: 100%;
        justify-content: flex-start;
        padding: 10px 12px;
      }
    }
  }
}
</style>
