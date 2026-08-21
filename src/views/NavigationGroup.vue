<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { watch, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { t } from '@nextcloud/l10n'
import { showError } from '@nextcloud/dialogs'
import NcAppNavigationItem from '@nextcloud/vue/components/NcAppNavigationItem'
import NcAppNavigation from '@nextcloud/vue/components/NcAppNavigation'
import NcAppNavigationList from '@nextcloud/vue/components/NcAppNavigationList'
import NcAppNavigationSpacer from '@nextcloud/vue/components/NcAppNavigationSpacer'
import NcCounterBubble from '@nextcloud/vue/components/NcCounterBubble'
import InquiryGroupCreateDlg from '../components/Create/InquiryGroupCreateDlg.vue'
import { NavigationIcons } from '../utils/icons.ts'
import { useSessionStore } from '../stores/session.ts'
import { useInquiriesStore } from '../stores/inquiries.ts'
import { useInquiryGroupsStore } from '../stores/inquiryGroups.ts'
import { usePreferencesStore } from '../stores/preferences.ts'
import type { InquiryGroupType, InquiryGroup } from '../stores/inquiryGroups.types.ts'
import { 
  getInquiryGroupTypeData,
} from '../helpers/modules/InquiryHelper.ts'

const { slug } = defineProps<{
  slug?: string
}>()

const preferencesStore = usePreferencesStore()
const router = useRouter()
const sessionStore = useSessionStore()
const inquiriesStore = useInquiriesStore()
const inquiryGroupsStore = useInquiryGroupsStore()
const createGroupDlgToggle = ref(false)
const selectedInquiryGroupTypeForCreation = ref<InquiryGroupType | null>(null)
const selectedGroups = ref<string[]>([])
const viewMode = computed(() => preferencesStore.user.defaultDisplayMode || 'create')

const availableGroups = computed(() => {
  const groups = sessionStore.currentUser.groups || {}
  if (typeof groups === 'object' && !Array.isArray(groups)) {
    return Object.keys(groups)
  }
  return groups
})

// State for selected family
const selectedFamily = computed({
  get: () => inquiriesStore.advancedFilters?.familyType || null,
  set: (value) => inquiriesStore.setFamilyType(value || '')
})

// Computed for all inquiry group types (root types only)
const allInquiryGroupTypes = computed((): InquiryGroupType[] => {
  const groupTypes = sessionStore.appSettings?.inquiryGroupTypeTab || []
  return groupTypes.filter((groupType: InquiryGroupType) => groupType.is_root === true)
})

// Get inquiry groups from store
const inquiryGroups = computed(() => inquiryGroupsStore.inquiryGroups || [])

// Helper function to get groups by type
function getGroupsByType(typeKey: string): InquiryGroup[] {
  return inquiryGroups.value.filter(group =>
    group.type === typeKey && 
    group.parentId === null && 
    group.groupStatus !== "archived"
  )
}

// Get groups count for specific type
function getGroupTypeCount(groupType: string): number {
  return getGroupsByType(groupType).length
}

// Filter group types by selected family AND only those that have groups
const filteredInquiryGroupTypes = computed((): InquiryGroupType[] => {
  let types = allInquiryGroupTypes.value || []
  
  if (selectedFamily.value) {
    types = types.filter((groupType: InquiryGroupType) => 
      groupType.family === selectedFamily.value 
    )
  }
  
  // Only show types that have at least one group
  return types.filter((groupType: InquiryGroupType) => {
    const typeKey = groupType.type || groupType.group_type
    return getGroupTypeCount(typeKey) > 0
  })
})

// Get inquiry group type data (icon, label, description) - USING THE WORKING HELPER
function getInquiryGroupTypeDisplayData(inquiryGroupType: InquiryGroupType) {
  // Use the helper that works in the original version
  const typeKey = inquiryGroupType.type || inquiryGroupType.group_type
  return getInquiryGroupTypeData(typeKey, allInquiryGroupTypes.value)
}

function selectGroupType(inquiryGroupType: InquiryGroupType) {
  const typeKey = inquiryGroupType.type || inquiryGroupType.group_type
  inquiryGroupsStore.setCurrentGroupType(typeKey)
  
  let navslug
  if (slug) { navslug = slug }
  else { navslug = '' }

  router.push({
    name: 'group-list',
    params: { slug: navslug },
  })
}

// Function to navigate to default view based on preferences
function navigateToCreateOrView() {
  if (viewMode.value === 'create') {
    router.push({ 
      name: 'menu',
      query: { viewMode: 'create' }
    })
  } else {
    router.push({ 
      name: 'list',
      query: { viewMode: 'view' }
    })
  }
}

function inquiryGroupAdded(payLoad: { id: number; slug: string }) {
  createGroupDlgToggle.value = false
  selectedInquiryGroupTypeForCreation.value = null
  router.push({
    name: 'group',
    params: { id: payLoad.id },
    query: { viewMode: viewMode.value }
  })
}

function handleCloseGroupDialog() {
  createGroupDlgToggle.value = false
  selectedInquiryGroupTypeForCreation.value = null
  selectedGroups.value = []
}

function handleGroupUpdate(groups: string[]) {
  selectedGroups.value = groups
}

// Check if there are any archived groups
const hasArchivedGroups = computed(() => {
  const archived = inquiryGroups.value.filter(group => group.groupStatus === "archived")
  return archived.length > 0
})

// Watch for familyType changes in store
watch(
  () => inquiriesStore.familyType,
  (newFamilyId) => {
    selectedFamily.value = newFamilyId
  }
)

// Function to show settings (placeholder)
function showSettings() {
  showError(t('agora', 'Settings functionality not implemented yet'))
}

// Group inquiry groups by their type (non-archived only)
const inquiryGroupsByType = computed((): Record<string, InquiryGroup[]> => {
  const groupsByType: Record<string, InquiryGroup[]> = {}
  const types = filteredInquiryGroupTypes.value || []

  types.forEach((groupType: InquiryGroupType) => {
    const typeKey = groupType.type || groupType.group_type
    const groupsOfType = getGroupsByType(typeKey)
    if (groupsOfType.length > 0) {
      groupsByType[typeKey] = groupsOfType
    }
  })

  return groupsByType
})

// Group archived inquiry groups by their type
const archivedInquiryGroupsByType = computed((): Record<string, InquiryGroup[]> => {
  const groupsByType: Record<string, InquiryGroup[]> = {}
  const types = filteredInquiryGroupTypes.value || []

  types.forEach((groupType: InquiryGroupType) => {
    const typeKey = groupType.type || groupType.group_type
    const groupsOfType = inquiryGroups.value.filter(group =>
      (group.type === typeKey) &&
      group.groupStatus === "archived" 
    )
    if (groupsOfType.length > 0) {
      groupsByType[typeKey] = groupsOfType
    }
  })

  return groupsByType
})

// Function to clear family selection (Home)
function clearFamilySelection() {
  inquiriesStore.setFamilyType('')
  selectedFamily.value = null
  router.push({ 
    name: 'group-list',
    params: { slug: '' },
    query: { viewMode: viewMode.value }
  })     
}

// Check if we're on the home page (no family selected, no slug)
const isHomePage = computed(() => !selectedFamily.value && !slug)

// Check if there are any types to display
const hasGroupTypes = computed(() => (filteredInquiryGroupTypes.value || []).length > 0)

// Check if there are any groups to display
const hasGroups = computed(() => inquiryGroups.value.length > 0)

</script>

<template>
  <NcAppNavigation class="agora-navigation" aria-label="Agora Navigation">
    <!-- Navigation List -->
    <template #list>
      <!-- Groups Section -->
      <NcAppNavigationList v-if="hasGroupTypes && hasGroups" key="group-types">
        <h3 class="navigation-caption">
          {{ t('agora', 'Group types') }}
        </h3>
        
        <NcAppNavigationItem
          v-for="inquiryGroupType in filteredInquiryGroupTypes"
          :key="inquiryGroupType.id || inquiryGroupType.type"
          :name="t('agora', getInquiryGroupTypeDisplayData(inquiryGroupType).label)"
          :title="t('agora', getInquiryGroupTypeDisplayData(inquiryGroupType).description)"
          allow-collapse
          class="navigation-item"
          :open="false"
          @click="selectGroupType(inquiryGroupType)"
        >
          <template #icon>
            <component 
              :is="getInquiryGroupTypeDisplayData(inquiryGroupType).icon" 
              class="navigation-icon"
            />
          </template>

          <template #counter>
            <NcCounterBubble
              :count="getGroupTypeCount(inquiryGroupType.type || inquiryGroupType.group_type) || 0"
              class="navigation-counter"
            />
          </template>

          <!-- List of existing groups of this type -->
          <ul class="navigation-sublist">
            <NcAppNavigationItem
              v-for="group in inquiryGroupsByType[inquiryGroupType.type || inquiryGroupType.group_type]"
              :key="group.id"
              :name="group.title"
              :title="group.description || group.titleExt || ''"
              :to="{
                name: 'group-list',
                params: { slug: group.slug },
              }"
              class="navigation-subitem"
            >
              <template #icon>
                <component 
                  :is="getInquiryGroupTypeDisplayData(inquiryGroupType).icon" 
                  class="navigation-icon sub-icon"
                />
              </template>
            </NcAppNavigationItem>

            <NcAppNavigationItem
              v-if="getGroupTypeCount(inquiryGroupType.type || inquiryGroupType.group_type) === 0"
              :name="t('agora', 'No groups created yet')"
              class="navigation-empty"
            />
          </ul>
        </NcAppNavigationItem>
      </NcAppNavigationList>

      <!-- Empty state when no groups -->
      <NcAppNavigationList v-else key="no-groups">
        <h3 class="navigation-caption">
          {{ t('agora', 'Groups') }}
        </h3>
        <NcAppNavigationItem
          :name="t('agora', 'No groups available')"
          :disabled="true"
          class="navigation-empty"
        />
      </NcAppNavigationList>

      <NcAppNavigationSpacer />

      <!-- Archived Groups Section -->
      <NcAppNavigationList v-if="hasArchivedGroups" key="archived-groups">
        <NcAppNavigationItem
          :name="t('agora', 'Archived groups')"
          :title="t('agora', 'View archived groups')"
          class="navigation-item archived-groups-item"
          :to="{
            name: 'group-archived',
          }"
        >
          <template #icon>
            <component :is="NavigationIcons.Archive" class="navigation-icon" />
          </template>

          <template #counter>
            <NcCounterBubble
              :count="inquiryGroups.value.filter(g => g.groupStatus === 'archived').length || 0"
              class="navigation-counter archived-counter"
            />
          </template>
        </NcAppNavigationItem>
      </NcAppNavigationList>

      <NcAppNavigationSpacer />

      <!-- Quick Actions Section -->
      <NcAppNavigationList key="quick-actions">
        <h3 class="navigation-caption">
          {{ t('agora', 'Quick actions') }}
        </h3>

        <!-- Home / Acceuil -->
        <NcAppNavigationItem
          :name="t('agora', 'Home')"
          :to="{
            name: 'menu',
          }"
          :exact="true"
          :active="isHomePage"
          class="navigation-item"
          @click="clearFamilySelection"
        >
          <template #icon>
            <component :is="NavigationIcons.Home" class="navigation-icon" />
          </template>
        </NcAppNavigationItem>

        <NcAppNavigationItem
          :name="viewMode === 'create'
            ? t('agora', 'Create')
            : t('agora', 'View')"
          :to="{
            name: 'list',
            params: { type: 'relevant' },
            query: { viewMode: 'view' }
          }"
          :exact="true"
          class="navigation-item"
          @click="navigateToCreateOrView"
        >
          <template #icon>
            <component
              :is="NavigationIcons.Plus"
              v-if="viewMode === 'create'"
              class="navigation-icon"
            />
            <component
              :is="NavigationIcons.View"
              v-else
              class="navigation-icon"
            />
          </template>
        </NcAppNavigationItem>

        <NcAppNavigationItem
          :name="t('agora', 'Settings')"
          class="navigation-item"
          @click="showSettings()"
        >
          <template #icon>
            <Component :is="NavigationIcons.Settings" class="navigation-icon" />
          </template>
        </NcAppNavigationItem>
      </NcAppNavigationList>
    </template>
  </NcAppNavigation>

  <InquiryGroupCreateDlg
    v-if="createGroupDlgToggle"
    :inquiry-group-type="selectedInquiryGroupTypeForCreation"
    :available-groups="availableGroups"
    @close="handleCloseGroupDialog"
    @added="inquiryGroupAdded"
    @update:selected-groups="handleGroupUpdate"
  />
</template>

<style lang="scss">
.agora-navigation {
    padding: 12px 0;
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
    padding: 0;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 8px;
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

// Override default navigation styles
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

.closed {
    :deep(.app-navigation-entry-icon),
    :deep(.app-navigation-entry__title) {
        opacity: 0.6;
    }
}

.force-not-active {
    :deep(.app-navigation-entry.active) {
        background-color: transparent !important;

        * {
            color: unset !important;
        }
    }
}

// Responsive adjustments
@media (max-width: 768px) {
    .agora-navigation {
        padding: 8px 0;
    }
}

// Dark theme adjustments
.theme--dark {
    .navigation-caption {
        color: var(--color-text-light);
    }
}
</style>
