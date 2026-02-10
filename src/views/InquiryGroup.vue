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
            class="breadcrumb-home"
            @click="navigateToHome"
          >
            <template #icon>
                <component :is="InquiryGeneralIcons.Home" :size="20"/>
            </template>
            <span class="breadcrumb-label">{{ t('agora', 'Home') }}</span>
          </NcButton>
          
          <!-- Parent groups -->
          <template v-for="(parent) in parentGroups" :key="parent.id">
            <div class="breadcrumb-separator">❯</div>
            <NcButton 
              type="tertiary"
              class="breadcrumb-item"
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

          <!-- Current group or type -->
          <div v-if="hasSlug || parentGroups.length > 0" class="breadcrumb-separator">❯</div>
          <div class="breadcrumb-current">
              <div class="breadcrumb-current-content">
                  <component
                    :is="currentIconComponent"
                    class="breadcrumb-icon"
                  />
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

      <!-- Main Content -->
      <div v-if="!groupNotFound">
        <!-- Header Section -->
        <div class="group-header">
            <div class="header-left">
                <div class="group-icon-badge">
                    <component
                      :is="currentIconComponent"
                      class="group-icon"
                    />
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
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="loading-state">
            <div class="spinner"></div>
            <p>{{ t('agora', 'Loading...') }}</p>
        </div>

        <!-- Content when loaded -->
        <div v-else class="content-area">
          <!-- Section Header -->
          <div class="section-header">
            <h3>{{ sectionTitle }}</h3>
            <div v-if="currentInquiryGroup && canUserEditGroup(currentInquiryGroup)" class="section-actions">
              <NcButton class="create-button" @click="createInquiryGroup(currentGroupType)">
                ➕ {{ t('agora', 'Create Group') }}
              </NcButton>
            </div>
          </div>

          <!-- Groups Grid -->
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
                    <component
                      :is="getGroupTypeIconComponent(group.type)"
                    />
                  </div>
                  <h4>{{ group.title }}</h4>
                  <p v-if="group.description" class="vignette-description">
                    {{ group.description}}
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
                      {{ t('agora', 'View Group') }}
                      <template #icon>
                        <svg width="16" height="16" viewBox="0 0 24 24">
                          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                        </svg>
                      </template>
                    </NcButton>
                  </div>
                </div>
              </div>
              
              <!-- Owner menu (appears under the vignette on hover) -->
                  <div
                          v-if="group && group.slug && (canUserEditGroup(group) || canUserDeleteGroup(group) || canUserArchiveGroup(group)) && hoveredGroupId === group.id"
                          class="owner-menu-under"
                          @mouseenter="hoveredGroupId = group.id"
                          @mouseleave="hoveredGroupId = null"
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
                                       <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
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
                                                     <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
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
                                                                   <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                                                               </svg>
                                                           </template>
                                                           {{ t('agora', 'Archive') }}
                  </NcButton>
                          </div>
                  </div>
              </div>
             </div>
            </div>
            <div v-if="hasSlug && currentInquiryGroup" class="inquiry-group-content">
                <InquiryGroupViewMiddle
                        :group="currentInquiryGroup"
                        :inquiry-ids="currentInquiryGroup.inquiryIds"
                        />
                <InquiryGroupViewMain
                        :group="currentInquiryGroup"
                        :inquiry-ids="currentInquiryGroup.inquiryIds"
                        />
            </div>
          </div>
        </div>

        <!-- Group not found -->
        <div v-else class="not-found-state">
            <div class="not-found-icon">🔍</div>
            <h2>{{ t('agora', 'Group not found') }}</h2>
            <p>{{ t('agora', 'The group you are looking for does not exist or you do not have permission to access it.') }}</p>
            <NcButton type="primary" @click="navigateToHome">
            {{ t('agora', 'Back to home') }}
            </NcButton>
        </div>
      </div>
      <NcDialog
              v-if="createGroupDlgToggle"
              :name="t('agora', 'Create New Inquiry Group')"
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

  </NcAppContent>
</template>
<script setup lang="ts">
import { computed, ref, watch, onMounted} from 'vue'
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
import InquiryGroupViewMiddle from '../components/InquiryGroup/InquiryGroupViewMiddle.vue'
import InquiryGroupViewMain from '../components/InquiryGroup/InquiryGroupViewMain.vue'
import { 
  createInquiryGroupContext, 
  canArchive,
  canEdit,
  canDelete,
} from '../utils/permissions.ts'


const route = useRoute()
const router = useRouter()
const sessionStore = useSessionStore()
const inquiriesStore = useInquiriesStore()
const inquiryGroupsStore = useInquiryGroupsStore()
const inquiryGroupStore = useInquiryGroupStore()

const isLoading = ref(true)
const hoveredGroupId = ref<number | null>(null)
const selectedParentId = ref(null)
const createGroupDlgToggle = ref(false)
const selectedInquiryGroupTypeForCreation = ref<InquiryGroupType | null>(null)

const groupNotFound = ref(false)

// Create a computed property to check if group should not be found
const shouldGroupNotFound = computed(() => hasSlug.value && !currentInquiryGroup.value)

// Delete dialog state
const showDeleteDialog = ref(false)
const deleteDialogGroup = ref<InquiryGroup | null>(null)

// Check if we have a slug in the route
const hasSlug = computed(() => {
  const slug = route.params.slug as string
  return slug && slug !== 'none' && slug !== 'undefined' && slug !== ''
})

function createGroupPermissionContext(group: InquiryGroup) {
  return createInquiryGroupContext(group)
}

// Get current group type
const currentGroupType = computed(() => {
  if (hasSlug.value && currentInquiryGroup.value) {
    return currentInquiryGroup.value.type
  }
  return inquiryGroupsStore.currentGroupType || 'assembly'
})

// Get current group if slug exists (SIMPLIFIED)
const currentInquiryGroup = computed(() => {
  if (!hasSlug.value) return null

  const slug = route.params.slug as string
  const group = inquiryGroupsStore.bySlug(slug)

  // Check if group exists and has owner
  if (!group || !group.owner) {
    return null
  }

  return group
})



// Context for permissions
const context = computed(() => createInquiryContext(inquiry, sessionStore.appSettings))

// Helper functions 
function canUserArchiveGroup(group: InquiryGroup | null): boolean {
  if (!group) return false  
  const context = createGroupPermissionContext(group)
  if (!context) return false
  return canArchive(context)
}

function canUserEditGroup(group: InquiryGroup | null): boolean {
  if (sessionStore.currentUser.isAdmin || sessionStore.currentUser.isGroupEditor ) return true
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

  // Build parent chain using parentId
  while (currentGroup.parentId) {
    const parent = inquiryGroupsStore.inquiryGroups.find(g => g.id === currentGroup.parentId)
    if (parent) {
      parents.unshift(parent)
      currentGroup = parent
    } else {
      break
    }
  }

  return parents
})

// Get groups to display
const displayedGroups = computed(() => {
  if (hasSlug.value && currentInquiryGroup.value) {
    // Show child groups of current group
    const childGroups = inquiryGroupsStore.inquiryGroups.filter(
      group => group.parentId === currentInquiryGroup.value?.id && group.groupStatus !== "archived"
    )
    return childGroups.sort((a, b) => a.title.localeCompare(b.title))
  }

  // Show root groups of current type
  const rootGroups = inquiryGroupsStore.inquiryGroups.filter(
    group => !group.parentId && group.type === currentGroupType.value && group.groupStatus !== "archived"
  )
  return rootGroups.sort((a, b) => a.title.localeCompare(b.title))
})

// Get total inquiries for current group
const totalInquiries = computed(() => {
  if (!hasSlug.value || !currentInquiryGroup.value) return 0

  // Count inquiries belonging to this group
  return inquiriesStore.inquiries.filter(
 //   inquiry => inquiry.groupId === currentInquiryGroup.value?.id
    inquiry => inquiry.id === currentInquiryGroup.value?.id
  ).length
})

// Section title
const sectionTitle = computed(() => {
  if (hasSlug.value && currentInquiryGroup.value) {
    return t('agora', '')
  }
  return selectedTypeLabel.value
})

// Check if user is owner or admin - FIXED: Ensure this returns boolean

// Get icon component for group type
const getGroupTypeIconComponent = (type: string) => {
  const typeData = getInquiryGroupTypeData(type, sessionStore.appSettings.inquiryGroupTypeTab)
  return typeData?.icon || 'div'
}

// Helper function to get children from inquiryGroupsStore[group.Id].childs
function getGroupChildren(group: InquiryGroup) {
  if (!group || !group.id) return []

  // Try to get children from store structure
  const storeGroup = inquiryGroupsStore.inquiryGroups.find(g => g.id === group.id)
  if (storeGroup?.childs) {
    return storeGroup.childs
  }

  // Fallback to filtering by parentId
  const allGroups = inquiryGroupsStore.inquiryGroups || []
  return allGroups.filter(g => g.parentId === group.id)
}

// Current icon component
const currentIconComponent = computed(() => {
  if (hasSlug.value && currentInquiryGroup.value) {
    return getGroupTypeIconComponent(currentInquiryGroup.value.type)
  }
  return getGroupTypeIconComponent(currentGroupType.value)
})

// Get type data
const selectedTypeData = computed(() => getInquiryGroupTypeData(currentGroupType.value, sessionStore.appSettings.inquiryGroupTypeTab))

const selectedTypeLabel = computed(() => 
  selectedTypeData.value?.label ? t('agora', selectedTypeData.value.label) : t('agora', 'Assembly')
)

const selectedTypeDescription = computed(() => 
  selectedTypeData.value?.description ? t('agora', selectedTypeData.value.description) : t('agora', 'Browse available groups')
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
    : t('agora', 'Delete Group')
)

const deleteDialogMessage = computed(() => 
  t('agora', 'Are you sure you want to delete this group? All subgroups and inquiries within it will also be deleted. This action cannot be undone.')
)

const deleteDialogButtons = computed(() => [
  {
    label: t('agora', 'Cancel'),
    type: 'secondary',
    callback: () => {
      showDeleteDialog.value = false
      deleteDialogGroup.value = null
    }
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
    }
  }
])

// Methods
function navigateToHome() {
  router.push({ name: 'group-list', 
  query: {} })
}

function selectGroup(group: InquiryGroup) {
  if (group.slug) {
    router.push({ name: 'group-list', params: { slug: group.slug } })
  }
}


// Function to create new inquiry group from type
function createInquiryGroup(inquiryGroupType: InquiryGroupType) {
  if (hasSlug.value) selectedParentId.value=currentInquiryGroup?.value.id
  selectedInquiryGroupTypeForCreation.value = inquiryGroupType
  createGroupDlgToggle.value = true
}

const BASE_URL = window.location.origin;

function getNextcloudPreviewUrl(fileId: number, x = 1920, y = 1080, autoScale = true) {
  return `${BASE_URL}/index.php/core/preview?fileId=${fileId}&x=${x}&y=${y}&a=${autoScale ? 1 : 0}`;
}

// Cover URL helper
function getCoverUrl(coverId: string) {
  return getNextcloudPreviewUrl(coverId)
}

// Owner menu actions
function modifyGroup(group: InquiryGroup) {
  router.push({
    name: 'group',
    params: { id: group.id }
  })
}

async function deleteGroup(group: InquiryGroup) {
  deleteDialogGroup.value = group
  showDeleteDialog.value = true
}

// Actual delete logic
async function performDeleteGroup(group: InquiryGroup) {
  try {
    // Implement delete logic here
     await inquiryGroupStore.deleteGroup(group.id)
    showSuccess(t('agora', 'Group deleted successfully'))

    // Refresh groups
    await inquiryGroupsStore.fetchAllGroups()

    // If we're in the deleted group's page, navigate to parent or home
    if (currentInquiryGroup.value?.id === group.id) {
      if (group.parentId) {
        const parent = inquiryGroupsStore.inquiryGroups.find(g => g.id === group.parentId)
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
    // Implement archive logic here
     await inquiryGroupStore.archiveGroup(group.id)
    showSuccess(t('agora', 'Group archived successfully'))
    navigateToHome()
  } catch (error) {
    console.error('Error archiving group:', error)
    showError(t('agora', 'Failed to archive group'))
  }
}


// Dialog handlers
function handleCloseGroupDialog() {
  createGroupDlgToggle.value = false
  selectedParentId.value = null
  selectedInquiryGroupTypeForCreation.value = null
}

function inquiryGroupAdded(newGroup: InquiryGroup) {
  // Handle new group creation
  createGroupDlgToggle.value = false

  // Navigate to the new group
  if (newGroup.slug) {
    router.push({ name: 'group', params: { slug: newGroup.slug } })
  }
}

// Available groups for dialog (groups that can be selected as parents)
const availableGroups = computed(() => {
  const groups = sessionStore.currentUser.groups || {}
  if (typeof groups === 'object' && !Array.isArray(groups)) {
    return Object.keys(groups)
  }
  return []
})

// Lifecycle
onMounted(async () => {
  try {
    // Load data if needed
    if (inquiryGroupsStore.inquiryGroups.length === 0) {
       await inquiryGroupsStore.fetchAllGroups()
    }

    if (inquiriesStore.inquiries.length === 0) {
      await inquiriesStore.load()
    }

    // Check if group exists when slug is provided
    if (hasSlug.value) {
      const slug = route.params.slug as string
      const group = inquiryGroupsStore.bySlug(slug)
      // currentInquiryGroup.value=group
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

watch(shouldGroupNotFound, (newValue) => {
  groupNotFound.value = newValue
}, { immediate: true })


watch(() => route.params.slug, async () => {
  isLoading.value = true
  groupNotFound.value =  shouldGroupNotFound.value

  if (hasSlug.value) {
    const slug = route.params.slug as string
    const group = inquiryGroupsStore.bySlug(slug)
    if (!group) {
      groupNotFound.value = true
    }
  }

  isLoading.value = false
})
</script>

<style lang="scss" scoped>
.inquiry-group-content {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.inquiry-group-page {
    width: 100%;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
}

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

                        /* Group Header */
                        .group-header {
                            padding: 30px 20px 20px;
                            background: white;
                            border-radius: 0 0 20px 20px;
                            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                            margin-bottom: 30px;

                            .header-left {
                                display: flex;
                                align-items: center;
                                gap: 20px;
                                max-width: 1600px;
                                margin: 0 auto;
                            }

                            .group-icon-badge {
                                width: 60px;
                                height: 60px;
                                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                                border-radius: 15px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

                                .group-icon {
                                    width: 30px;
                                    height: 30px;
                                    color: white;
                                }
                            }

                            .group-title-section {
                                flex: 1;

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
                                        background: linear-gradient(135deg, #00b09b, #96c93d);
                                        color: white;
                                        padding: 6px 12px;
                                        border-radius: 15px;
                                        font-weight: 600;
                                        font-size: 13px;
                                        box-shadow: 0 2px 8px rgba(0, 176, 155, 0.3);
                                    }

                                    .groups-count-badge {
                                        background: linear-gradient(135deg, #667eea, #764ba2);
                                    }
                                }
                            }
                        }

                        /* Loading State */
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
                            to { transform: rotate(360deg); }
                        }

                        /* Content Area */
                        .content-area {
                            max-width: 1600px;
                            margin: 0 auto;
                            padding: 0 20px 40px;
                        }

                        /* Section Header */
                        .section-header {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            margin-bottom: 25px;

                            h3 {
                                font-size: 24px;
                                font-weight: 600;
                                color: #2c3e50;
                                margin: 0;
                            }

                            .section-actions {
                                .create-button {
                                    background: linear-gradient(135deg, #00b09b, #96c93d);
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

                        /* Groups Grid */
                        .groups-grid {
                            display: grid;
                            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                            gap: 25px;
                            align-items: start;
                        }

                        /* Container for vignette + menu */
                        .group-vignette-wrapper {
                            position: relative;
                            margin-bottom: 0px; 
                        }

                        .vignette-container {
                            position: relative;
                            margin-bottom: 60px; /* Space for the menu */

                            &:hover {
                                .owner-menu-under {
                                    opacity: 1;
                                    visibility: visible;
                                    transform: translateY(0);
                                    pointer-events: auto; /* Enable clicks on menu */
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
                                    background: linear-gradient(to top, rgba(0,0,0,0.2), transparent);
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
                                    background: linear-gradient(135deg, #667eea, #764ba2);
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
                                        background: linear-gradient(135deg, #667eea, #764ba2);
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

                        /* FIXED: Owner menu - appears under the vignette */
                        .owner-menu-under {
                            position: absolute;
                            top: calc(100% + 5px); /* Position it right below the vignette with a small gap */
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

                            /* Show when parent wrapper is hovered */
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

                        /* Empty State */
                        .empty-state {
                            text-align: center;
                            padding: 50px 20px;
                            background: white;
                            border-radius: 15px;
                            border: 2px dashed #e0e6ed;

                            .empty-icon {
                                font-size: 48px;
                                margin-bottom: 20px;
                                opacity: 0.5;
                            }

                            h3 {
                                font-size: 20px;
                                color: #2c3e50;
                                margin: 0 0 10px 0;
                            }

                            p {
                                color: #7f8c8d;
                                margin-bottom: 25px;
                                font-size: 15px;
                            }
                        }

                        /* Not Found State */
                        .not-found-state {
                            text-align: center;
                            padding: 80px 20px;

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

                        /* Debug styles to check if owner menu is working */
                        .debug-info {
                            position: fixed;
                            top: 10px;
                            right: 10px;
                            background: rgba(0, 0, 0, 0.8);
                            color: white;
                            padding: 10px;
                            border-radius: 5px;
                            z-index: 1000;
                            font-size: 12px;
                        }

                        /* Responsive Design */
                        @media (max-width: 768px) {
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

                            .group-header {
                                padding: 25px 15px 15px;

                                .group-icon-badge {
                                    width: 50px;
                                    height: 50px;
                                    border-radius: 12px;

                                    .group-icon {
                                        width: 25px;
                                        height: 25px;
                                    }
                                }

                                .group-title {
                                    font-size: 22px;
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

