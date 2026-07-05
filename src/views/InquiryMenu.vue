<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { t } from '@nextcloud/l10n'
import NcDialog from '@nextcloud/vue/components/NcDialog'
import { showError } from '@nextcloud/dialogs'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcAppContent from '@nextcloud/vue/components/NcAppContent'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcEmptyContent from '@nextcloud/vue/components/NcEmptyContent'
import InquiryCreateDlg from '../components/Create/InquiryCreateDlg.vue'
import InquiryGroupCreateDlg from '../components/Create/InquiryGroupCreateDlg.vue'
import { AgoraAppIcon } from '../components/AppIcons/index.ts'
import { useSessionStore } from '../stores/session.ts'
import { useInquiriesStore } from '../stores/inquiries.ts'
import { usePreferencesStore } from '../stores/preferences.ts'
import { 
  getInquiryItemData,
  getInquiryTypeData,
  getInquiryTypesByFamily,
  getInquiryGroupTypesByFamily,
  getInquiryTypesForFamily,
  getInquiryGroupTypeData,
  getInquiryGroupTypesForFamily,
  type InquiryFamily,
  type InquiryType,
  type InquiryGroupType
} from '../helpers/modules/InquiryHelper.ts'
import { accessFamilyMenu,
  canCreateInquiryGroupInGeneral,
} from '../utils/permissions.ts'

const route = useRoute()
const router = useRouter()
const sessionStore = useSessionStore()
const inquiriesStore = useInquiriesStore()
const createDlgToggle = ref(false)
const createGroupDlgToggle = ref(false)
const selectedInquiryTypeForCreation = ref<InquiryType | null>(null)
const selectedInquiryGroupTypeForCreation = ref(null)
const selectedGroups = ref<string[]>([])
const preferencesStore = usePreferencesStore()

const canUserCreateInquiryGroup = computed(() => canCreateInquiryGroupInGeneral())

const isNavigating = ref(false)

// ViewMode state - directly from URL with fallback to user preference
const viewMode = computed({
  get: () => (route.query.viewMode as string) || (preferencesStore.user?.defaultDisplayMode || 'view'),
  set: (value: string) => {
    if (isNavigating.value || viewMode.value === value) return
    
    isNavigating.value = true
    router.replace({
      query: {
        ...route.query,
        viewMode: value,
      },
    }).finally(() => {
      isNavigating.value = false
    })
  }
})

const availableGroups = computed(() => {
  const groups = sessionStore.currentUser.groups || {}
  if (typeof groups === 'object' && !Array.isArray(groups)) {
    return Object.keys(groups)
  }
  return groups
})

// Selected family - directly from store
const selectedFamily = computed({
  get: () => inquiriesStore.advancedFilters.familyType || null,
  set: (value) => inquiriesStore.setFamilyType(value || '')
})

// Computed for available families
const inquiryFamilies = computed((): InquiryFamily[] => sessionStore.appSettings.inquiryFamilyTab || [])

// Computed for all inquiry types (templates)
const allInquiryTypes = computed((): InquiryType[] => {
  const types = sessionStore.appSettings.inquiryTypeTab || []
  return types.filter(type => type.is_root === true)
})

// Computed for all inquiry group types
const allInquiryGroupTypes = computed((): InquiryGroupType[] => {
  const groupTypes = sessionStore.appSettings.inquiryGroupTypeTab || []
  return groupTypes.filter(groupType => groupType.is_root === true)
})

const inquiryTypesByFamily = computed(() => {
  const types = allInquiryTypes.value
  return getInquiryTypesByFamily(types)
})

const inquiryGroupTypesByFamily = computed(() => {
  const types = allInquiryGroupTypes.value
  return getInquiryGroupTypesByFamily(types)
})

// Computed for inquiry types filtered by selected family
const filteredInquiryTypes = computed(() => {
  if (!selectedFamily.value) return []
  
  const family = inquiryFamilies.value.find(f => f.family_type === selectedFamily.value)
  if (!family) return []
  
  return getInquiryTypesForFamily(family.family_type, inquiryTypesByFamily.value)
})

// Computed for inquiry group types filtered by selected family
const filteredInquiryGroupTypes = computed(() => {
  if (!selectedFamily.value) return []
  
  const family = inquiryFamilies.value.find(f => f.family_type === selectedFamily.value)
  if (!family) return []
  
  return getInquiryGroupTypesForFamily(family.family_type, inquiryGroupTypesByFamily.value)
})

// Get family by ID
const currentFamily = computed(() => {
  if (!selectedFamily.value) return null
  return inquiryFamilies.value.find(f => f.family_type === selectedFamily.value)
})

// Get current family data (icon, label, description)
const currentFamilyData = computed(() => getInquiryItemData(currentFamily.value, t('agora', 'Inquiry types')))

// Function to select a family
function selectFamily(familyType: string) {
  if (!accessFamilyMenu(familyType)) {
    showError(t('agora', 'You are not allowed to access this family'))
    return
  }
  
  if (isNavigating.value) return
  isNavigating.value = true
  
  // Update store
  selectedFamily.value = familyType
  
  // Navigate based on view mode
  if (viewMode.value === 'create') {
    router.push({
      name: 'menu',
      query: { viewMode: 'create' }
    }).finally(() => {
      isNavigating.value = false
    })
  } else if (shouldRedirectToGroupView(familyType)) {
    router.push({
      name: 'group-list',
      params: { slug: 'none' },
      query: { viewMode: 'group' }
    }).finally(() => {
      isNavigating.value = false
    })
  } else {
    router.push({
      name: 'list',
      params: { type: 'relevant' },
      query: { viewMode: 'view' }
    }).finally(() => {
      isNavigating.value = false
    })
  }
}

// Function to clear family selection
function clearFamilySelection() {
  if (isNavigating.value) return
  isNavigating.value = true
  
  selectedFamily.value = null
  
  router.push({ 
    name: 'menu',
    query: { viewMode: viewMode.value }
  }).finally(() => {
    isNavigating.value = false
  })
}

// Check if a family has inquiry groups OR inquiry group types defined
function shouldRedirectToGroupView(familyType: string) {
  const hasGroupTypes = getInquiryGroupTypesForCurrentFamily(familyType).length > 0
  return hasGroupTypes
}

// Function to handle view mode change
function handleViewModeChange(mode: string) {
  if (viewMode.value === mode) return
  viewMode.value = mode
  
  // If we have a selected family, navigate to appropriate view
  if (selectedFamily.value) {
    if (mode === 'create') {
      router.push({
        name: 'menu',
        query: { viewMode: 'create' }
      })
    } else {
      router.push({
        name: 'list',
        params: { type: 'relevant' },
        query: { viewMode: 'view' }
      })
    }
  }
}

// Get inquiry group types for a specific family
function getInquiryGroupTypesForCurrentFamily(familyInquiryType: string) {
  const groupTypes = getInquiryTypesForFamily(familyInquiryType, inquiryGroupTypesByFamily.value)
  return groupTypes
}

// Function to check if user can create inquiry group for current family
function canCreateInquiryGroupForFamily(familyType: string): boolean {
  // First check if user has access to this family
  if (!accessFamilyMenu(familyType)) {
    return false
  }
  
  // Then check if user can create inquiry groups in general
  return canUserCreateInquiryGroup.value
}

// Function to create new inquiry from type
function createInquiry(inquiryType: InquiryType) {
  selectedInquiryTypeForCreation.value = inquiryType
  createDlgToggle.value = true
}

// Function to create new inquiry group from type
function createInquiryGroup(inquiryGroupType: InquiryGroupType) {
  if (!selectedFamily.value || !canCreateInquiryGroupForFamily(selectedFamily.value)) {
    showError(t('agora', 'You do not have permission to create inquiry groups for this family'))
    return
  }
  selectedInquiryGroupTypeForCreation.value = inquiryGroupType.group_type
  createGroupDlgToggle.value = true
}

// Function to add inquiry 
function inquiryAdded(payLoad: { id: number; title: string }) {
  createDlgToggle.value = false
  selectedInquiryTypeForCreation.value = null
  router.push({
    name: 'inquiry',
    params: { id: payLoad.id },
    query: { viewMode: viewMode.value }
  })
}

// Function to add inquiry group
function inquiryGroupAdded(payLoad: { id: number; slug: string }) {
  createGroupDlgToggle.value = false
  selectedInquiryGroupTypeForCreation.value = null
  router.push({
    name: 'group',
    params: { id: payLoad.id },
    query: { viewMode: viewMode.value }
  })
}

// Empty content props
const emptyContentProps = computed(() => ({
  name: selectedFamily.value 
    ? t('agora', 'No inquiry types found for this family')
    : t('agora', 'No inquiry families configured'),
  description: selectedFamily.value
    ? t('agora', 'There are no inquiry types available in this family')
    : t('agora', 'Please configure inquiry families in the settings'),
}))

function handleCloseDialog() {
  createDlgToggle.value = false
  selectedInquiryTypeForCreation.value = null
  selectedGroups.value = []
}

function handleCloseGroupDialog() {
  createGroupDlgToggle.value = false
  selectedInquiryGroupTypeForCreation.value = null
  selectedGroups.value = []
}

// Initialize on mount
onMounted(() => {
  inquiriesStore.load(false)
  
  // If there's a family type in the store, ensure it's reflected in selectedFamily
  if (inquiriesStore.advancedFilters.familyType && !selectedFamily.value) {
    selectedFamily.value = inquiriesStore.advancedFilters.familyType
  }
})
</script>


<template>
    <NcAppContent class="inquiry-menu">
    <template #title>
        {{ selectedFamily 
        ? currentFamilyData.label
        : t('agora', 'Select inquiry family') 
        }}
    </template>

    <!-- Header Actions Container -->
    <div class="header-actions">
        <!-- Back Button (conditionally shown) -->
        <NcButton 
         v-if="selectedFamily" 
         class="back-button" 
         :aria-label="t('agora', 'Back to families')"
         @click="clearFamilySelection"
         >
         <span class="back-button__icon">←</span>
         {{ t('agora', 'Back to families') }}
        </NcButton>

        <!-- View Mode Switcher (always shown, aligned to right) -->
        <div v-if="selectedFamily" class="view-mode-switcher">
            <NcCheckboxRadioSwitch
                    :button-variant="true"
                    :model-value="viewMode"
                    value="create"
                    name="view_mode_radio"
                    type="radio"
                    button-variant-grouped="horizontal"
                    @update:model-value="handleViewModeChange"
                    >
                    {{ t('agora', 'Create mode') }}
            </NcCheckboxRadioSwitch>
            <NcCheckboxRadioSwitch
                    :button-variant="true"
                    :model-value="viewMode"
                    value="view"
                    name="view_mode_radio"
                    type="radio"
                    button-variant-grouped="horizontal"
                    @update:model-value="handleViewModeChange"
                    >
                    {{ t('agora', 'View mode') }}
            </NcCheckboxRadioSwitch>
        </div>
    </div>

    <!-- Family Selection Grid -->
    <div v-if="!selectedFamily" class="families-grid-container">
        <div class="families-grid">
            <div
                    v-for="family in inquiryFamilies"
                    :key="family.id"
                    class="family-card-large"
                    @click="selectFamily(family.family_type)"
                    >
                    <div class="family-card-large__icon">
                        <component :is="getInquiryItemData(family).icon" />
                    </div>
                <div class="family-card-large__content">
                    <h3 class="family-card-large__title">{{ t('agora', getInquiryItemData(family).label) }}</h3>
                    <p v-if="getInquiryItemData(family).description" class="family-card-large__description">
                    {{ t('agora', getInquiryItemData(family).description) }}
                    </p>
                </div>
            </div>
        </div>

        <NcEmptyContent 
                                                                     v-if="inquiryFamilies.length === 0" 
                                                                     v-bind="emptyContentProps"
                                                                     >
                                                                     <template #icon>
                                                                         <AgoraAppIcon />
                                                                     </template>
        </NcEmptyContent>
    </div>

    <!-- Inquiry Types and Groups for Selected Family -->
    <div v-else class="inquiry-types-container">
        <div class="inquiry-types-header">
            <div class="selected-family-info">
                <h2>{{ t('agora', currentFamilyData.label) }}</h2>
                <p v-if="currentFamilyData.description">{{ t('agora', currentFamilyData.description) }}</p>
            </div>
        </div>

        <!-- Inquiry Types Section -->
        <div v-if="filteredInquiryTypes.length > 0" class="inquiry-section">
            <h3 class="section-title">{{ t('agora', 'Inquiry types') }}</h3>
            <div class="inquiry-types-grid">
                <div
                        v-for="inquiryType in filteredInquiryTypes"
                        :key="inquiryType.id"
                        class="inquiry-type-card"
                        @click="createInquiry(inquiryType)"
                        >
                        <div class="inquiry-type-card__icon">
                            <component :is="getInquiryTypeData(inquiryType.inquiry_type, allInquiryTypes).icon" />
                        </div>
                    <div class="inquiry-type-card__content">
                        <h4 class="inquiry-type-card__title">
                            {{ t('agora', getInquiryTypeData(inquiryType.inquiry_type, allInquiryTypes).label) }}
                        </h4>
                        <p v-if="getInquiryTypeData(inquiryType.inquiry_type, allInquiryTypes).description" class="inquiry-type-card__description">
                        {{ t('agora', getInquiryTypeData(inquiryType.inquiry_type, allInquiryTypes).description) }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Inquiry Group Types Section -->
  <div v-if="filteredInquiryGroupTypes.length > 0" class="inquiry-section">
    <h3 class="section-title">{{ t('agora', 'Inquiry groups') }}</h3>
    <div class="inquiry-types-grid">
      <div
        v-for="inquiryGroupType in filteredInquiryGroupTypes"
        :key="inquiryGroupType.id"
        class="inquiry-type-card"
        :class="{ 'disabled-card': !canUserCreateInquiryGroup }"
        @click="canUserCreateInquiryGroup ? createInquiryGroup(inquiryGroupType) : null"
      >
        <div class="inquiry-type-card__icon">
          <component :is="getInquiryGroupTypeData(inquiryGroupType.group_type, allInquiryGroupTypes).icon" />
        </div>
        <div class="inquiry-type-card__content">
          <h4 class="inquiry-type-card__title">
            {{ t('agora', getInquiryGroupTypeData(inquiryGroupType.group_type, allInquiryGroupTypes).label) }}
          </h4>
          <p v-if="getInquiryGroupTypeData(inquiryGroupType.group_type, allInquiryGroupTypes).description" class="inquiry-type-card__description">
            {{ t('agora', getInquiryGroupTypeData(inquiryGroupType.group_type, allInquiryGroupTypes).description) }}
          </p>

          <!-- Permission warning for users who can't create -->
          <div v-if="!canUserCreateInquiryGroup" class="permission-warning">
            <small>{{ t('agora', 'You do not have permission to create inquiry groups') }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>


        <NcEmptyContent 
                                                                                                                         v-if="filteredInquiryTypes.length === 0 && filteredInquiryGroupTypes.length === 0" 
                                                                                                                         v-bind="emptyContentProps"
                                                                                                                         >
                                                                                                                         <template #icon>
                                                                                                                             <AgoraAppIcon />
                                                                                                                         </template>
        </NcEmptyContent>
    </div>

    <!-- Inquiry Creation Dialog -->
    <NcDialog
            v-if="createDlgToggle"
            :name="t('agora', 'Create new inquiry')"
            :enable-slide-up="false"
            @close="handleCloseDialog"
            >
            <InquiryCreateDlg
                    :inquiry-type="selectedInquiryTypeForCreation"
                    :selected-groups="selectedGroups"
                    :available-groups="availableGroups"
                    @added="inquiryAdded"
                    @close="handleCloseDialog"
                    @update:selected-groups="selectedGroups = $event"
                    />
    </NcDialog>

    <!-- Inquiry Group Creation Dialog -->
    <NcDialog
            v-if="createGroupDlgToggle"
            :name="t('agora', 'Create new inquiry group')"
            :enable-slide-up="false"
            @close="handleCloseGroupDialog"
            >
            <InquiryGroupCreateDlg
                    :inquiry-group-type="selectedInquiryGroupTypeForCreation"
                    :selected-groups="selectedGroups"
                    :available-groups="availableGroups"
                    @added="inquiryGroupAdded"
                    @close="handleCloseGroupDialog"
                    @update:selected-groups="selectedGroups = $event"
                    />
    </NcDialog>
    </NcAppContent>
</template>

<style lang="scss" scoped>
.inquiry-menu {
    .area__main {
        width: 100%;
    }
}

                            // Header Actions Container
                                .header-actions {
                                display: flex;
                                align-items: center;
                                justify-content: flex-end;
                                gap: 16px;
                                width: 100%;
                                margin-left: auto;

                                // Back button styles
                                    .back-button {
                                    display: flex;
                                    align-items: center;
                                    gap: 8px;
                                    background: none;
                                    border: 1px solid var(--color-border);
                                    border-radius: 10px;
                                    padding: 10px 18px;
                                    cursor: pointer;
                                    color: var(--color-text-lighter);
                                    transition: all 0.2s ease;
                                    flex-shrink: 0;
                                    margin-right: auto;

                                    &:hover {
                                        background: var(--color-background-dark);
                                        color: var(--color-main-text);
                                        border-color: var(--color-primary-element);
                                    }

                                    &__icon {
                                        font-size: 18px;
                                        font-weight: 600;
                                    }
                                }

                                // View Mode Switcher styles
                                    .view-mode-switcher {
                                    display: flex;
                                    align-items: center;
                                    gap: 0;
                                    background: var(--color-background-dark);
                                    border-radius: 10px;
                                    padding: 4px;
                                    border: 1px solid var(--color-border);
                                    overflow: hidden;
                                }
                            }

                            .families-grid-container {
                                padding: 20px;
                            }

                            .families-grid {
                                display: grid;
                                grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                                gap: 24px;
                                max-width: 1400px;
                                margin: 0 auto;
                            }

                            .family-card-large {
                                background: var(--color-main-background);
                                border: 2px solid var(--color-border);
                                border-radius: 20px;
                                padding: 32px;
                                cursor: pointer;
                                transition: all 0.3s ease;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                text-align: center;
                                min-height: 240px;
                                justify-content: center;
                                position: relative;

                                &:hover {
                                    border-color: var(--color-primary-element);
                                    transform: translateY(-6px);
                                    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
                                }

                                &__icon {
                                    width: 80px;
                                    height: 80px;
                                    background: linear-gradient(135deg, var(--color-primary-element), var(--color-primary-element-hover));
                                    border-radius: 50%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    margin-bottom: 20px;
                                }

                                &__title {
                                    font-size: 22px;
                                    font-weight: 700;
                                    margin-bottom: 12px;
                                    color: var(--color-main-text);
                                    line-height: 1.3;
                                }

                                &__description {
                                    color: var(--color-text-lighter);
                                    font-size: 16px;
                                    line-height: 1.5;
                                    margin-bottom: 16px;
                                }
                            }

                            /* Inquiry Types Container Styles */
                            .inquiry-types-container {
                                padding: 20px;
                            }

                            .inquiry-types-header {
                                display: flex;
                                align-items: flex-start;
                                gap: 24px;
                                margin-bottom: 32px;
                                padding-bottom: 20px;
                                border-bottom: 1px solid var(--color-border);

                                .selected-family-info {
                                    flex: 1;

                                    h2 {
                                        font-size: 28px;
                                        font-weight: 700;
                                        margin-bottom: 8px;
                                        color: var(--color-main-text);
                                    }

                                    p {
                                        color: var(--color-text-lighter);
                                        font-size: 16px;
                                        line-height: 1.5;
                                        margin-bottom: 12px;
                                    }
                                }
                            }

                            .inquiry-section {
                                margin-bottom: 40px;

                                .section-title {
                                    font-size: 22px;
                                    font-weight: 600;
                                    margin-bottom: 20px;
                                    color: var(--color-main-text);
                                    padding-bottom: 10px;
                                    border-bottom: 1px solid var(--color-border);
                                }
                            }

                            .inquiry-types-grid {
                                display: grid;
                                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                                gap: 20px;
                                max-width: 1200px;
                                margin: 0 auto;
                            }

                            .inquiry-type-card {
                                background: var(--color-main-background);
                                border: 1px solid var(--color-border);
                                border-radius: 16px;
                                padding: 24px;
                                cursor: pointer;
                                transition: all 0.2s ease;
                                display: flex;
                                align-items: flex-start;
                                gap: 16px;
                                min-height: 140px;

                                &:hover {
                                    border-color: var(--color-primary-element);
                                    transform: translateY(-2px);
                                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
                                }

                                &__icon {
                                    width: 48px;
                                    height: 48px;
                                    background: var(--color-background-dark);
                                    border-radius: 12px;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    flex-shrink: 0;
                                }

                                &__content {
                                    flex: 1;
                                }

                                &__title {
                                    font-size: 18px;
                                    font-weight: 600;
                                    margin-bottom: 8px;
                                    color: var(--color-main-text);
                                    line-height: 1.3;
                                }

                                &__description {
                                    color: var(--color-text-lighter);
                                    font-size: 14px;
                                    line-height: 1.4;
                                    margin-bottom: 12px;
                                }
                            }

                            /* Responsive Design */
                            @media (max-width: 768px) {
                                .header-actions {
                                    flex-direction: column;
                                    align-items: stretch;
                                    gap: 12px;

                                    .back-button {
                                        margin-right: 0;
                                        order: 1;
                                    }

                                    .view-mode-switcher {
                                        order: 2;
                                        justify-content: center;
                                    }
                                }

                                .families-grid {
                                    grid-template-columns: 1fr;
                                }

                                .inquiry-types-header {
                                    flex-direction: column;
                                    gap: 16px;

                                    .selected-family-info h2 {
                                        font-size: 24px;
                                    }
                                }

                                .inquiry-types-grid {
                                    grid-template-columns: 1fr;
                                }
                            }
</style>
