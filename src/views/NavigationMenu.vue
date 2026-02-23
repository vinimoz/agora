<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { watch,ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { t } from '@nextcloud/l10n'
import { emit } from '@nextcloud/event-bus'
import { showError } from '@nextcloud/dialogs'
import NcAppNavigationItem from '@nextcloud/vue/components/NcAppNavigationItem'
import NcAppNavigation from '@nextcloud/vue/components/NcAppNavigation'
import NcAppNavigationList from '@nextcloud/vue/components/NcAppNavigationList'
import InquiryCreateDlg from '../components/Create/InquiryCreateDlg.vue'
import InquiryGroupCreateDlg from '../components/Create/InquiryGroupCreateDlg.vue'
import { InquiryGeneralIcons,NavigationIcons } from '../utils/icons.ts'
import { useInquiryGroupsStore } from '../stores/inquiryGroups.ts'
import { useSessionStore } from '../stores/session.ts'
import { useInquiriesStore } from '../stores/inquiries.ts'
import { usePreferencesStore } from '../stores/preferences.ts'
import { Event } from '../Types/index.ts'
import type { InquiryGroupType } from '../stores/inquiryGroups.types.ts'
import { 
  getInquiryItemData,
  getInquiryTypeData,
  getInquiryTypesByFamily,
  getInquiryTypesForFamily,
  getInquiryGroupTypeData,
  type InquiryFamily,
  type InquiryType,
} from '../helpers/modules/InquiryHelper.ts'

import {
  accessFamilyMenu,
  canCreateInquiryGroupInGeneral,
} from '../utils/permissions.ts'

const preferencesStore = usePreferencesStore()
const router = useRouter()
const sessionStore = useSessionStore()
const inquiriesStore = useInquiriesStore()
const createDlgToggle = ref(false)
const inquiryGroupsStore = useInquiryGroupsStore()
const createGroupDlgToggle = ref(false)
const selectedInquiryTypeForCreation = ref<InquiryType | null>(null)
const selectedInquiryGroupTypeForCreation = ref(null)

// Add this computed property to check if user can create groups
const canUserCreateInquiryGroup = computed(() => 
  canCreateInquiryGroupInGeneral()
)

// Function to check if user can create inquiry group for current family
function canCreateInquiryGroupForFamily(familyType: string): boolean {
  // First check if user has access to this family
  if (familyType && !accessFamilyMenu(familyType)) {
    return false
  }
  // Then check if user can create inquiry groups in general
  return canUserCreateInquiryGroup.value
}

// Function to create new inquiry group from type (UPDATED with permission check)
function createInquiryGroup(inquiryGroupType: InquiryGroupType) {
  // Check permission before creating
  if (!canCreateInquiryGroupForFamily(selectedFamily.value)) {
    showError(t('agora', 'You do not have permission to create inquiry groups for this family'))
    return false
  } 

  selectedInquiryGroupTypeForCreation.value = inquiryGroupType.group_type
  createGroupDlgToggle.value = true
}


const availableGroups = computed(() => {
  const groups = sessionStore.currentUser.groups || {}
  if (typeof groups === 'object' && !Array.isArray(groups)) {
    return Object.keys(groups)
  }
  return groups
})

// State for selected family

const selectedFamily = ref<string | null>(inquiriesStore.familyType || null)
// State for expanded/collapsed families
const expandedFamilies = ref<Set<string>>(new Set())

// Computed for available families
const inquiryFamilies = computed((): InquiryFamily[] => sessionStore.appSettings.inquiryFamilyTab || [])

// Computed for recent inquiries
const sortedInquiries = computed(() => [...inquiriesStore.inquiries].sort((a, b) => new Date(b.status.lastInteraction) - new Date(a.status.lastInteraction)));
const recentInquiries = computed(() => sortedInquiries.value.slice(0, 5));


// Check if a family has inquiry groups OR inquiry group types defined
const shouldRedirectToGroupView = (familyType: string) => {
  const hasGroupTypes = getInquiryGroupTypesForCurrentFamily(familyType).length > 0
  return hasGroupTypes
}

// Computed for all inquiry types
const allInquiryTypes = computed((): InquiryType[] => {
  const types = sessionStore.appSettings.inquiryTypeTab || []
  return types.filter(type => type.is_root === true)
})

// Computed pour les types de groupes d'enquête racines seulement
const allInquiryGroupTypes = computed((): InquiryGroupType[] => {
  const groupTypes = sessionStore.appSettings.inquiryGroupTypeTab || []
  return groupTypes.filter(groupType => groupType.is_root === true)
})

// Computed for inquiry types grouped by family
const inquiryTypesByFamily = computed(() => {
  const types = allInquiryTypes.value
  return getInquiryTypesByFamily(types)
})

// Computed for inquiry group types grouped by family
const inquiryGroupTypesByFamily = computed(() => {
  const groupTypes = allInquiryGroupTypes.value
  return getInquiryTypesByFamily(groupTypes)
})

// Computed for default view mode from app settings
const defaultViewMode = computed(() => preferencesStore.user.defaultDisplayMode === 'view' ? 'view' : 'create')

// DEBUG: Check data
onMounted(() => {
  inquiriesStore.load(false)
})

// Toggle family expansion
function toggleFamily(familyType: string) {
  if (expandedFamilies.value.has(familyType)) {
    expandedFamilies.value.delete(familyType)
  } else {
    expandedFamilies.value.add(familyType)
  }
}

// Check if a family is expanded
function isFamilyExpanded(familyType: string) {
  return expandedFamilies.value.has(familyType)
}

// Get inquiry types for a specific family
function getInquiryTypesForCurrentFamily(familyInquiryType: string) {
  const types = getInquiryTypesForFamily(familyInquiryType, inquiryTypesByFamily.value)
  return types
}

// Get inquiry group types for a specific family
function getInquiryGroupTypesForCurrentFamily(familyInquiryType: string) {
  const groupTypes = getInquiryTypesForFamily(familyInquiryType, inquiryGroupTypesByFamily.value)
  return groupTypes
}

// Get family data (icon, label, description)
function getFamilyData(family: InquiryFamily) {
  return getInquiryItemData(family)
}

// Get inquiry type data (icon, label, description)
function getInquiryTypeDisplayData(inquiryType: InquiryType) {
  return getInquiryTypeData(inquiryType.inquiry_type, allInquiryTypes.value)
}

// Get inquiry group type data (icon, label, description)
function getInquiryGroupTypeDisplayData(inquiryGroupType: InquiryGroupType) {
  return getInquiryGroupTypeData(inquiryGroupType.group_type, allInquiryGroupTypes.value)
}

/**
 * Show the settings dialog
 */
function showSettings() {
  emit(Event.ShowSettings, null)
}

// Function to navigate to family inquiries
function navigateToFamilyInquiries(familyType: string) {
  if (accessFamilyMenu(familyType) ) {
    inquiriesStore.setFamilyType(familyType)
    selectedFamily.value = familyType
    if (shouldRedirectToGroupView(inquiriesStore.advancedFilters.familyType)) {
        router.push({
          name: 'group-list',
          params: {
            slug: 'none'
          },
          query: {
            viewMode: 'group',
          }
        })
       } else {
        router.push({
        name: defaultViewMode.value === 'create' ? 'menu' : 'list',
        params: defaultViewMode.value === 'view' ? { type: 'relevant' } : {},
        query: { viewMode: defaultViewMode.value }
    })
    }
  } else showError("You are not allowed to access this family")
}

// Function to create new inquiry from type
function createInquiry(inquiryType: InquiryType) {
  selectedInquiryTypeForCreation.value = inquiryType
  createDlgToggle.value = true
}


function handleInquirySelected(inquiry) {
  if (inquiry && inquiry.family) {
    inquiriesStore.setFamilyType(inquiry.family)
    router.push({
      name: 'inquiry',
      params: { id: inquiry.id },
    })
  }
}

// Function to handle inquiry added
function inquiryAdded(payload: { id: number; title: string }) {
  createDlgToggle.value = false
  selectedInquiryTypeForCreation.value = null
  router.push({
    name: 'inquiry',
    params: { id: payload.id },
  })
}

// Function to handle inquiry group added
function inquiryGroupAdded(payload: { id: number; slug: string }) {
  createGroupDlgToggle.value = false
  selectedInquiryGroupTypeForCreation.value = null
  router.push({
    name: 'group',
    params: { id: payload.id },
  })
}

// Function to get icon for an inquiry based on its type
function getInquiryIcon(inquiry) {
  if (inquiry.type) {
    const typeData = getInquiryTypeData(inquiry.type, allInquiryTypes.value)
    return typeData?.icon || InquiryGeneralIcons.Flash
  }
  return InquiryGeneralIcons.Flash
}

function handleCloseDialog() {
  createDlgToggle.value = false
  selectedInquiryTypeForCreation.value = null
}

function handleCloseGroupDialog() {
  createGroupDlgToggle.value = false
  selectedInquiryGroupTypeForCreation.value = null
}

// Watch for familyType changes in store
watch(
  () => inquiriesStore.familyType,
  (newFamilyId) => {
    selectedFamily.value = newFamilyId
  }
)
</script>

<template>
  <NcAppNavigation class="agora-navigation" aria-label="Inquiry Navigation">
    <template #list>
      <!-- Recent Inquiries Section -->
      <NcAppNavigationList>
        <h3 class="navigation-caption">
          {{ t('agora', 'Recent Inquiries') }}
        </h3>
        <NcAppNavigationItem
          v-for="inquiry in recentInquiries"
          :key="inquiry.id"
          :name="inquiry.title"
          :exact="true"
          class="navigation-item"
          :to="{ name: 'inquiry', params: { id: inquiry.id } }"
        >
          <template #icon>
            <component :is="getInquiryIcon(inquiry)" class="nav-icon" />
          </template>
        </NcAppNavigationItem>

        <NcAppNavigationItem
          v-if="recentInquiries.length === 0"
          :name="t('agora', 'No recent inquiries')"
          :disabled="true"
          class="navigation-empty"
        />
      </NcAppNavigationList>

      <!-- Inquiry Families Section -->
      <NcAppNavigationList>
        <h3 class="navigation-caption">
          {{ t('agora', 'Inquiry Families') }}
        </h3>

        <NcAppNavigationItem
          v-for="family in inquiryFamilies"
          :key="family.id"
          :name="t('agora', getFamilyData(family).label)"
          :allow-collapse="true"
          :open="isFamilyExpanded(family.family_type)"
          class="navigation-item"
          @update:open="toggleFamily(family.family_type)"
          @click="navigateToFamilyInquiries(family.family_type)"
        >
          <template #icon>
            <component :is="getFamilyData(family).icon" />
          </template>

          <template #counter>
            <span class="family-counter">
              {{ getInquiryTypesForCurrentFamily(family.family_type).length +
              getInquiryGroupTypesForCurrentFamily(family.family_type).length }}
            </span>
          </template>

          <!-- Inquiry Types for this family -->
          <NcAppNavigationList class="navigation-sublist">
            <h4 v-if="getInquiryGroupTypesForCurrentFamily(family.family_type).length > 0" class="navigation-subcaption">
              {{ t('agora', 'Inquiries') }}
            </h4>
            <NcAppNavigationItem
              v-for="inquiryType in accessFamilyMenu(family.family_type)
                      ? getInquiryTypesForCurrentFamily(family.family_type)
                      : []"
              :key="inquiryType.id"
              :name="t('agora', getInquiryTypeDisplayData(inquiryType).label)"
              class="navigation-subitem"
              @click="createInquiry(inquiryType)"
            >
              <template #icon>
                <component :is="getInquiryTypeDisplayData(inquiryType).icon" />
              </template>

              <template v-if="getInquiryTypeDisplayData(inquiryType).description" #description>
                {{ t('agora', getInquiryTypeDisplayData(inquiryType).description) }}
              </template>
            </NcAppNavigationItem>

            <NcAppNavigationItem
              v-if="getInquiryTypesForCurrentFamily(family.family_type).length === 0"
              :name="t('agora', 'No inquiry types')"
              :disabled="true"
              class="navigation-empty"
            />
          </NcAppNavigationList>

          <!-- Inquiry Group Types for this family -->
          <NcAppNavigationList
            v-if="getInquiryGroupTypesForCurrentFamily(family.family_type).length > 0"
            class="navigation-sublist"
          >
            <h4 class="navigation-subcaption">
              {{ t('agora', 'Inquiry Groups') }}
            </h4>

            <NcAppNavigationItem
              v-for="inquiryGroupType in accessFamilyMenu(family.family_type)
                      ? getInquiryGroupTypesForCurrentFamily(family.family_type)
                      : []"
              :key="inquiryGroupType.id"
              :name="t('agora', getInquiryGroupTypeDisplayData(inquiryGroupType).label)"
              :class="{
                'navigation-subitem': true,
                'disabled-item': !canUserCreateInquiryGroup
              }"
              @click="canUserCreateInquiryGroup ? createInquiryGroup(inquiryGroupType) : null"
            >
              <template #icon>
                <component :is="getInquiryGroupTypeDisplayData(inquiryGroupType).icon" />
              </template>

              <template v-if="getInquiryGroupTypeDisplayData(inquiryGroupType).description" #description>
                {{ t('agora', getInquiryGroupTypeDisplayData(inquiryGroupType).description) }}
              </template>

              <!-- Permission badge for users who can't create -->
              <template v-if="!canUserCreateInquiryGroup" #counter>
                <span
                  class="permission-badge"
                  :title="t('agora', 'You do not have permission to create inquiry groups')"
                >
                  🔒
                </span>
              </template>
            </NcAppNavigationItem>

            <NcAppNavigationItem
              v-if="getInquiryGroupTypesForCurrentFamily(family.family_type).length === 0"
              :name="t('agora', 'No inquiry group types')"
              :disabled="true"
              class="navigation-empty"
            />
          </NcAppNavigationList>
        </NcAppNavigationItem>

        <NcAppNavigationItem
          v-if="inquiryFamilies.length === 0"
          :name="t('agora', 'No families configured')"
          :disabled="true"
          class="navigation-empty"
        />
      </NcAppNavigationList>
    </template>

    <!-- Footer Section -->
    <template #footer>
      <NcAppNavigationList class="navigation-footer">
        <NcAppNavigationItem
          :name="t('agora', 'Settings')"
          class="footer-item"
          @click="showSettings()"
        >
          <template #icon>
            <Component :is="NavigationIcons.Settings" />
          </template>
        </NcAppNavigationItem>
      </NcAppNavigationList>
    </template>
  </NcAppNavigation>

  <InquiryCreateDlg
    v-if="createDlgToggle"
    :inquiry-type="selectedInquiryTypeForCreation"
    :available-groups="availableGroups"
    @close="handleCloseDialog"
    @added="inquiryAdded"
  />

  <InquiryGroupCreateDlg
    v-if="createGroupDlgToggle"
    :inquiry-group-type="selectedInquiryGroupTypeForCreation"
    :available-groups="availableGroups"
    @close="handleCloseGroupDialog"
    @added="inquiryGroupAdded"
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
}

.navigation-subitem.disabled-item {
  opacity: 0.6;
  cursor: not-allowed;
  
  &:hover {
    background-color: transparent !important;
  }
}

.permission-badge {
  font-size: 12px;
  opacity: 0.7;
  cursor: help;
}

.navigation-subcaption {
    font-size: 11px;
    font-weight: 500;
    color: var(--color-text-light);
    text-transform: uppercase;
    letter-spacing: 0.3px;
    margin: 12px 12px 4px 12px;
    padding: 0;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 4px;
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

          .navigation-subitem {
              margin: 1px 4px;
              border-radius: 6px;
              font-size: 13px;

              &:hover {
                  background-color: var(--color-background-hover);
              }
          }

          .navigation-counter {
              font-weight: 600;
          }

          .navigation-sublist {
              margin-left: 8px;
              border-left: 1px solid var(--color-border);
              padding: 0;

              :deep(.app-navigation-entry) {
                  padding-left: 16px;

                  .app-navigation-entry__description {
                      font-size: 11px;
                      color: var(--color-text-lighter);
                      margin-top: 1px;
                  }
              }
          }

          .navigation-empty {
              opacity: 0.7;
              font-style: italic;
          }

          // Override default navigation styles without :deep() nesting
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

              .navigation-sublist {
                  margin-left: 4px;

                  :deep(.app-navigation-entry) {
                      padding-left: 12px;
                  }
              }
          }

          // Dark theme adjustments
              .theme--dark {
              .navigation-sublist {
                  background: var(--color-background-darker);
              }
          }
    </style>
