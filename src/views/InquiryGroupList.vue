
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { t } from '@nextcloud/l10n'
import { showError, showSuccess } from '@nextcloud/dialogs'
import NcAppContent from '@nextcloud/vue/components/NcAppContent'
import NcButton from '@nextcloud/vue/components/NcButton'
import { useSessionStore } from '../stores/session.ts'
import { useInquiryGroupsStore } from '../stores/inquiryGroups.ts'
import { useInquiryGroupStore } from '../stores/inquiryGroup.ts'
import { DateTime } from 'luxon'
import NcDialog from '@nextcloud/vue/components/NcDialog'
import { 
  createInquiryGroupContext, 
  canRestore,
  canDelete,
} from '../utils/permissions.ts'
import { InquiryGeneralIcons, NavigationIcons } from '../utils/icons.ts'
import { getInquiryGroupTypeData } from '../helpers/modules/InquiryHelper.ts'
import type { InquiryGroup } from '../stores/inquiryGroups.types.ts'

const sessionStore = useSessionStore()
const inquiryGroupsStore = useInquiryGroupsStore()
const inquiryGroupStore = useInquiryGroupStore()

const isLoading = ref(true)
const hoveredGroupId = ref<number | null>(null)

// Dialog states
const showDeleteDialog = ref(false)
const deleteDialogGroup = ref<InquiryGroup | null>(null)
const showRestoreDialog = ref(false)
const restoreDialogGroup = ref<InquiryGroup | null>(null)
const router = useRouter()


// Get all archived groups
const archivedGroups = computed(() => inquiryGroupsStore.inquiryGroups.filter(
    group => group.groupStatus === "archived"
  ).sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()))

// Create permission context for a specific group
function createGroupPermissionContext(group: InquiryGroup) {
  return createInquiryGroupContext(group)
}

// Helper functions
// Then use it for each group
function canUserRestoreGroup(group: InquiryGroup): boolean {
  const context = createGroupPermissionContext(group)
  if (!context) return false
  return canRestore(context)
}

function canUserDeleteGroup(group: InquiryGroup): boolean {
  const context = createGroupPermissionContext(group)
  if (!context) return false
  return canDelete(context)
}


// Get icon component for group type
const getGroupTypeIconComponent = (type: string) => {
  const typeData = getInquiryGroupTypeData(type, sessionStore.appSettings.inquiryGroupTypeTab)
  return typeData?.icon || 'div'
}

// Delete dialog properties
const deleteDialogTitle = computed(() => 
  deleteDialogGroup.value 
    ? t('agora', 'Delete "{group}"', { group: deleteDialogGroup.value.title })
    : t('agora', 'Delete Group')
)

const deleteDialogMessage = computed(() => 
  t('agora', 'Are you sure you want to permanently delete this archived group? This action cannot be undone.')
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

// Restore dialog properties
const restoreDialogTitle = computed(() => 
  restoreDialogGroup.value 
    ? t('agora', 'Restore "{group}"', { group: restoreDialogGroup.value.title })
    : t('agora', 'Restore Group')
)

const restoreDialogMessage = computed(() => 
  t('agora', 'Are you sure you want to restore this group? It will be moved back to the active groups list.')
)

const restoreDialogButtons = computed(() => [
  {
    label: t('agora', 'Cancel'),
    type: 'secondary',
    callback: () => {
      showRestoreDialog.value = false
      restoreDialogGroup.value = null
    }
  },
  {             
    label: t('agora', 'Restore'),
    type: 'primary',
    callback: async () => {
      if (restoreDialogGroup.value) {
        await performRestoreGroup(restoreDialogGroup.value)
      }
      showRestoreDialog.value = false
      restoreDialogGroup.value = null
    }       
  }
])

// Owner menu actions
function restoreGroup(group: InquiryGroup) {
  // Check permission before showing dialog
  if (!canUserRestoreGroup(group)) {
    showError(t('agora', 'You do not have permission to restore this group'))
    return
  }
  
  restoreDialogGroup.value = group
  showRestoreDialog.value = true
}

// Methods
function navigateToHome() {
  router.push({ name: 'group-list', 
  query: {} })
}

function deleteGroup(group: InquiryGroup) {
  // Check permission before showing dialog
  if (!canUserDeleteGroup(group)) {
    showError(t('agora', 'You do not have permission to delete this group'))
    return
  }
  
  deleteDialogGroup.value = group
  showDeleteDialog.value = true
}

// Actual restore logic
async function performRestoreGroup(group: InquiryGroup) {
  try {
    // Implement restore logic here
    await inquiryGroupStore.restoreGroup(group.id)
    showSuccess(t('agora', 'Group restored successfully'))
    
    // Refresh groups
    await inquiryGroupsStore.fetchAllGroups()
    
  } catch (error) {
    console.error('Error restoring group:', error)
    showError(t('agora', 'Failed to restore group'))
  }
}

// Actual delete logic
async function performDeleteGroup(group: InquiryGroup) {
  try {
    await inquiryGroupStore.deleteGroup(group.id)
    showSuccess(t('agora', 'Group deleted successfully'))

    // Refresh groups
    await inquiryGroupsStore.fetchAllGroups()
    
  } catch (error) {
    console.error('Error deleting group:', error)
    showError(t('agora', 'Failed to delete group'))
  }
}

const formatDate = (timestamp: number) =>
  DateTime.fromMillis(timestamp * 1000).toLocaleString(DateTime.DATE_SHORT)

// Lifecycle
onMounted(async () => {
  try {
    // Load data if needed
    if (inquiryGroupsStore.inquiryGroups.length === 0) {
      await inquiryGroupsStore.fetchAllGroups()
    }
  } catch (error) {
    console.error('Error loading archived groups:', error)
    showError(t('agora', 'Failed to load archived groups'))
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <NcAppContent class="inquiry-group-archive-page">
    <div class="inquiry-group-archive-page">
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
          
          <!-- Archived Groups Label -->
          <div class="breadcrumb-separator">❯</div>
          <div class="breadcrumb-current">
            <div class="breadcrumb-current-content">
              <component
                :is="NavigationIcons.Archive"
                class="breadcrumb-icon"
              />
              <span class="breadcrumb-label">{{ t('agora', 'Archived Groups') }}</span>
              <span class="inquiry-count">
                ({{ archivedGroups.length }})
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- White Separation Line -->
      <div class="separation-line"></div>

      <!-- Main Content -->
      <div class="content-area">
        <!-- Header Section -->
        <div class="archive-header">
          <div class="header-left">
            <div class="archive-icon-badge">
              <component
                :is="NavigationIcons.Archive"
                class="archive-icon"
              />
            </div>
            <div class="archive-title-section">
              <h1 class="archive-title">{{ t('agora', 'Archived Groups') }}</h1>
              <div class="archive-subtitle">
                <p>{{ t('agora', 'Groups that have been archived. You can restore or delete them.') }}</p>
                <span class="archive-count-badge">
                  {{ archivedGroups.length }} {{ t('agora', 'archived groups') }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="loading-state">
          <div class="spinner"></div>
          <p>{{ t('agora', 'Loading archived groups …') }}</p>
        </div>

        <!-- No Archived Groups -->
        <div v-else-if="archivedGroups.length === 0" class="empty-state">
          <div class="empty-icon">
            <component :is="NavigationIcons.Archive" />
          </div>
          <h3>{{ t('agora', 'No archived groups') }}</h3>
          <p>{{ t('agora', 'There are no archived groups at the moment.') }}</p>
          <NcButton type="primary" @click="navigateToHome">
            {{ t('agora', 'Back to Home') }}
          </NcButton>
        </div>

        <!-- Archived Groups Grid -->
        <div v-else class="archived-groups-grid">
          <div 
            v-for="group in archivedGroups" 
            :key="group.id"
            class="group-vignette-wrapper"
            @mouseenter="hoveredGroupId = group.id"
            @mouseleave="hoveredGroupId = null"
          >
            <div class="vignette-container">
              <div class="group-vignette archived" @click="selectGroup(group)">
                <!-- Vignette content here (make sure it's properly closed) -->
                <!-- If you have content inside, ensure all tags are properly closed -->
                <div v-if="group.cover_id" class="vignette-cover">
                  <img :src="getCoverUrl(group.cover_id)" :alt="group.title" />
                  <div class="vignette-cover-overlay"></div>
                  <div class="archived-overlay">
                    <component :is="NavigationIcons.Archive" />
                    <span>{{ t('agora', 'Archived') }}</span>
                  </div>
                </div>
                <div class="vignette-content">
                  <div class="vignette-icon archived">
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
                  </div>
                  <div class="vignette-footer">
                    <div class="archive-date">
                      <span class="date-label">{{ t('agora', 'Archived on:') }}</span>
                      <span class="date-value">{{ formatDate(group.created) }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Owner menu (appears under the vignette on hover) -->
              <div 
                v-if="(canUserRestoreGroup(group) || canUserDeleteGroup(group)) && hoveredGroupId === group.id" 
                class="owner-menu-under"
                @mouseenter="hoveredGroupId = group.id"
                @mouseleave="hoveredGroupId = null"
              >
                <div class="owner-menu-content">
                  <!-- Restore button - only show if user has permission -->
                  <NcButton 
                    v-if="canUserRestoreGroup(group)"
                    type="tertiary" 
                    class="menu-item restore"
                    @click.stop="restoreGroup(group)"
                  >
                    <template #icon>
                      <svg width="14" height="14" viewBox="0 0 24 24">
                        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
                      </svg>
                    </template>
                    {{ t('agora', 'Restore') }}
                  </NcButton>
                  
                  <!-- Delete button - only show if user has permission -->
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        <!-- Delete Dialog -->
    <NcDialog
      v-if="deleteDialogGroup"
      v-model:open="showDeleteDialog"
      :name="deleteDialogTitle"
      :message="deleteDialogMessage"
      :buttons="deleteDialogButtons"
    />

    <!-- Restore Dialog -->
    <NcDialog
      v-if="restoreDialogGroup"
      v-model:open="showRestoreDialog"
      :name="restoreDialogTitle"
      :message="restoreDialogMessage"
      :buttons="restoreDialogButtons"
    />

  </NcAppContent>
</template>



<style lang="scss" scoped>
.inquiry-group-archive-page {
    width: 100%;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    min-height: 100vh;
}

/* Breadcrumb - smaller on left */
.breadcrumb-bar {
    background: linear-gradient(135deg, #495057 0%, #343a40 100%);
    padding: 15px 0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
    border-bottom: 3px solid #6c757d;

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
                border-left: 3px solid #6c757d;
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

/* Archive Header */
.archive-header {
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

    .archive-icon-badge {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);

        .archive-icon {
            width: 30px;
            height: 30px;
            color: white;
        }
    }

    .archive-title-section {
        flex: 1;

        .archive-title {
            font-size: 28px;
            font-weight: 700;
            margin: 0;
            color: #2c3e50;
            line-height: 1.2;
        }

        .archive-subtitle {
            margin-top: 10px;

            p {
                color: #5d6d7e;
                font-size: 16px;
                line-height: 1.4;
                max-width: 800px;
                margin: 0 0 10px 0;
            }

            .archive-count-badge {
                background: linear-gradient(135deg, #6c757d, #495057);
                color: white;
                padding: 6px 12px;
                border-radius: 15px;
                font-weight: 600;
                font-size: 13px;
                box-shadow: 0 2px 8px rgba(108, 117, 125, 0.3);
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
        border-top-color: #6c757d;
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

/* Empty State */
.empty-state {
    text-align: center;
    padding: 80px 20px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
    border: 2px dashed #dee2e6;

    .empty-icon {
        width: 80px;
        height: 80px;
        background: #f8f9fa;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 25px;
        color: #6c757d;

        :deep(svg) {
            width: 40px;
            height: 40px;
        }
    }

    h3 {
        font-size: 24px;
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

/* Archived Groups Grid */
.archived-groups-grid {
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

    &.archived {
        border-left: 4px solid #6c757d;
        opacity: 0.9;

        &:hover {
            opacity: 1;
            border-color: #495057;
        }
    }

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);

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
            filter: grayscale(30%);
        }

        .vignette-cover-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50px;
            background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
        }

        .archived-overlay {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(108, 117, 125, 0.9);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 4px;

            :deep(svg) {
                width: 12px;
                height: 12px;
            }
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
            background: linear-gradient(135deg, #6c757d, #495057);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 18px;
            box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
            margin-bottom: 10px;

            &.archived {
                background: linear-gradient(135deg, #adb5bd, #6c757d);
            }
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
            
            .archive-date {
                display: flex;
                flex-direction: column;
                gap: 4px;
                font-size: 12px;
                
                .date-label {
                    color: #6c757d;
                    font-weight: 500;
                }
                
                .date-value {
                    color: #495057;
                    font-weight: 600;
                }
            }
        }
    }
}

/* Owner menu - appears under the vignette */
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

            &.restore:hover {
                color: #10b981;
                border-color: #a7f3d0;
                :deep(svg) {
                    fill: #10b981;
                }
            }

            &.delete:hover {
                color: #ef4444;
                border-color: #fca5a5;
                :deep(svg) {
                    fill: #ef4444;
                }
            }
        }
    }
}

/* Responsive Design */
@media (max-width: 768px) {
    .breadcrumb-bar {
        padding: 12px 0;

        .breadcrumb-container {
            padding: 0 15px;
            gap: 6px;

            .breadcrumb-home {
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

    .archive-header {
        padding: 25px 15px 15px;

        .archive-icon-badge {
            width: 50px;
            height: 50px;
            border-radius: 12px;

            .archive-icon {
                width: 25px;
                height: 25px;
            }
        }

        .archive-title {
            font-size: 22px;
        }
    }

    .content-area {
        padding: 0 15px 30px;
    }

    .archived-groups-grid {
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
