<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud Contributors
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
import type { InquiryGroupType } from '../stores/inquiryGroups.types.ts'
import { 
  getInquiryGroupTypeData,
} from '../helpers/modules/InquiryHelper.ts'

defineProps<{
  slug?: string
}>()



const preferencesStore = usePreferencesStore()
const router = useRouter()
const sessionStore = useSessionStore()
const inquiriesStore = useInquiriesStore()
const inquiryGroupsStore = useInquiryGroupsStore()
const createGroupDlgToggle = ref(false)
const selectedInquiryGroupTypeForCreation = ref(null)
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
const selectedFamily = ref<string | null>(inquiriesStore.familyType || null)

// Computed for all inquiry group types (root types only)
const allInquiryGroupTypes = computed((): InquiryGroupType[] => {
  const groupTypes = sessionStore.appSettings.inquiryGroupTypeTab || []
  return groupTypes.filter(groupType => groupType.is_root === true)
})


// Filter group types by selected family
const filteredInquiryGroupTypes = computed(() => {
  if (!selectedFamily.value) return allInquiryGroupTypes.value
  
  return allInquiryGroupTypes.value.filter(groupType => 
    groupType.family === selectedFamily.value
  )
})

// Get inquiry groups from store
const inquiryGroups = computed(() => inquiryGroupsStore.inquiryGroups)

// Get inquiry group type data (icon, label, description)
function getInquiryGroupTypeDisplayData(inquiryGroupType: InquiryGroupType) {
  return getInquiryGroupTypeData(inquiryGroupType.group_type, allInquiryGroupTypes.value)
}

// Get groups count for specific type
function getGroupTypeCount(groupType: string) {
  return inquiryGroupsByType.value[groupType]?.length || 0
}

function selectGroupType(inquiryGroupType) {
  // update store
  inquiryGroupsStore.setCurrentGroupType(inquiryGroupType.group_type)
  // navigate with hidden state
  router.push({
    name: 'group-list',
    // params: { slug: '' },
  })
}


// Function to navigate to default view based on preferences
function navigateToCreateOrView() {
  if (viewMode.value === 'create') {
    // Navigate to create new inquiry
    router.push({ 
      name: 'menu',
      query: { viewMode: 'create' }
    })
  } else {
    // Navigate to default menu view
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

// Function to handle group selection update
function handleGroupUpdate(groups: string[]) {
  selectedGroups.value = groups
}

// Group inquiry groups by their type (non-archived only)
const inquiryGroupsByType = computed(() => {
  const groupsByType: Record<string, InquiryGroupType[]> = {}
  
  filteredInquiryGroupTypes.value.forEach(groupType => {
    const groupsOfType = inquiryGroups.value.filter(group => 
      (group.type === groupType.group_type || group.group_type === groupType.group_type) &&
      group.groupStatus !== "archived"
    )
    groupsByType[groupType.group_type] = groupsOfType
  })
  
  return groupsByType
})

// Group archived inquiry groups by their type
const archivedInquiryGroupsByType = computed(() => {
  const groupsByType: Record<string, InquiryGroupType[]> = {}
  
  filteredInquiryGroupTypes.value.forEach(groupType => {
    const groupsOfType = inquiryGroups.value.filter(group => 
      (group.type === groupType.group_type || group.group_type === groupType.group_type) &&
      group.groupStatus === "archived"
    )
    if (groupsOfType.length > 0) {
      groupsByType[groupType.group_type] = groupsOfType
    }
  })
  
  return groupsByType
})

// Check if there are any archived groups
const hasArchivedGroups = computed(() => Object.values(archivedInquiryGroupsByType.value).some(groups => groups.length > 0))


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
</script>

<template>
  <NcAppNavigation class="agora-navigation" aria-label="Agora Navigation">
    <!-- Navigation List -->
    <template #list>
      <!-- Groups Section -->
      <NcAppNavigationList v-if="filteredInquiryGroupTypes.length > 0">
      <h3 class="navigation-caption">
          {{ t('agora', 'Group Types') }}
      </h3>
      <NcAppNavigationItem
              v-for="inquiryGroupType in filteredInquiryGroupTypes"
              :key="inquiryGroupType.id"
              :name="t('agora', getInquiryGroupTypeDisplayData(inquiryGroupType).label)"
              :title="t('agora', getInquiryGroupTypeDisplayData(inquiryGroupType).description)"
              allow-collapse
              class="navigation-item"
              :open="false"
              @click="selectGroupType(inquiryGroupType)"
              >

      <template #icon>
          <component :is="getInquiryGroupTypeDisplayData(inquiryGroupType).icon" />
      </template>

      <template #counter>
          <NcCounterBubble
                  :count="getGroupTypeCount(inquiryGroupType.group_type)"
                  class="navigation-counter"
                  />
      </template>

      <!-- List of existing groups of this type -->
      <ul class="navigation-sublist">
          <NcAppNavigationItem
                  v-for="group in inquiryGroupsByType[inquiryGroupType.group_type]"
                  :key="group.id"
                  :name="group.title"
                  :title="group.description"
                  :to="{
                       name: 'group-list',
                       params: { slug: group.slug },
                       }"
                  class="navigation-subitem"
                  >
                  <template #icon>
                      <component :is="getInquiryGroupTypeDisplayData(inquiryGroupType).icon" />
                  </template>
          </NcAppNavigationItem>

          <NcAppNavigationItem
                  v-if="getGroupTypeCount(inquiryGroupType.group_type) === 0"
                  :name="t('agora', 'No groups created yet')"
                  class="navigation-empty"
                  />
      </ul>
          </NcAppNavigationItem>
      </NcAppNavigationList>

      <NcAppNavigationSpacer />

       <!-- Archived Groups Section (Conditional) -->
        <!-- Archived Groups Section -->
<NcAppNavigationList v-if="hasArchivedGroups && filteredInquiryGroupTypes.length > 0">
  <NcAppNavigationItem
    :name="t('agora', 'Archived Groups')"
    :title="t('agora', 'View archived groups')"
    class="navigation-item archived-groups-item"
    :to="{
      name: 'group-archived',
    }"
  >
    <template #icon>
      <component :is="NavigationIcons.Archive" />
    </template>
    
    <template #counter>
      <NcCounterBubble
        :count="Object.values(archivedInquiryGroupsByType).flat().length"
        class="navigation-counter archived-counter"
      />
    </template>
  </NcAppNavigationItem>
</NcAppNavigationList>

      <NcAppNavigationSpacer />

      <!-- Quick Actions Section -->
      <NcAppNavigationList>
      <h3 class="navigation-caption">
          {{ t('agora', 'Quick Actions') }}
      </h3>

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
        v-if="viewMode === 'create'"
        :is="NavigationIcons.Plus"
    />
    <component
        v-else
        :is="NavigationIcons.View"
    />
</template>
      </NcAppNavigationItem>

      <NcAppNavigationItem
              :name="t('agora', 'Settings')"
              class="navigation-item"
              @click="showSettings()"
              >
              <template #icon>
                  <Component :is="NavigationIcons.Settings" />
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
