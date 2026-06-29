<!--
    - SPDX-FileCopyrightText: 2024 Nextcloud contributors
    - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { t } from '@nextcloud/l10n'
import { 
  NcButton, 
  NcListItem,
  NcActionButton,
} from '@nextcloud/vue'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { InquiryLink, useInquiryLinksStore } from '../../stores/inquiryLinks'
import { useInquiryStore } from '../../stores/inquiry'
import { Attachment, useAttachmentsStore } from '../../stores/attachments'
import { useSessionStore } from '../../stores/session'
import { InquiryGeneralIcons } from '../../utils/icons.ts'
import { Inquiry } from '../../Types/index.ts'
import {
  canEdit,
  createInquiryContext,
} from '../../utils/permissions.ts'

// Components
import AddResourceModal from '../Modals/AddResourceModal.vue'

// Props
const props = defineProps<{
  availableApps?: string[]
  inquiry?: Inquiry
}>()

// Stores
const inquiryLinksStore = useInquiryLinksStore()
const inquiryStore = useInquiryStore()
const sessionStore = useSessionStore()
const attachmentsStore = useAttachmentsStore()

// State
const isLoading = ref(false)
const showAddModal = ref(false)

// Determine which inquiry to use
const currentInquiry = computed(() => {
  // If currentInquiry has an inquiry, use it
  if (inquiryStore.id) {
    return inquiryStore
  }
  
  // Otherwise, try to find the inquiry by ID in the store or use minimal data
  if (props.inquiry) {
    return props.inquiry
    }
  
  return null
})

interface ResourceItem {
  id: number | string
  target_app: string
  target_type: string
  target_id: string
  type: 'link' | 'attachment'
  displayName: string
  icon: string
  attachment?: Attachment
  sort_order: number
  metadata?: string | {
    hash?: string      
    title?: string 
    url?: string
    description?: string
  }
  size?: number
}

interface GroupedResources {
  [key: string]: ResourceItem[]
}

// Context for permissions
const context = computed(() => {
    if (!props.inquiry || !props.inquiry.id) {
    return null
  }
  try  {
return createInquiryContext(props.inquiry, sessionStore.appSettings)
 } catch (error) {
    console.error('Error creating permission context:', error)
    return null
  }

})

// Helper function to parse metadata
const parseMetadata = (metadata: string) => {
  if (typeof metadata === 'string') {
    try {
      return JSON.parse(metadata)
    } catch (e) {
      console.warn('Failed to parse metadata:', e)
      return {}
    }
  }
  return metadata || {}
}

// Computed - Combine links and attachments for display
const groupedResources = computed((): GroupedResources => {
  const groups: GroupedResources = {}

  // Add linked resources
  const links = inquiryLinksStore.getByInquiryId(currentInquiry.value.id)
    .sort((a, b) => a.sort_order - b.sort_order)

  links.forEach((link: InquiryLink) => {
    if (!groups[link.target_app]) {
      groups[link.target_app] = []
    }

    const metadata = parseMetadata(link.metadata)

    groups[link.target_app].push({
      ...link,
      type: 'link',
      displayName: getResourceDisplayName(link),
      icon: getAppIcon(link.target_app),
      metadata // Ensure metadata is parsed object
    })
  })

  // Add file attachments (excluding cover image)
  const fileAttachments = attachmentsStore.attachments
    .filter(att => att.file_id !== currentInquiry.value.coverId)

  if (fileAttachments.length > 0) {
    groups.files = fileAttachments.map(attachment => ({
      id: attachment.id,
      target_app: 'files',
      target_type: 'file',
      target_id: attachment.id?.toString() || '',
      type: 'attachment',
      displayName: attachment.name,
      icon: InquiryGeneralIcons.Document,
      attachment,
      sort_order: 0,
      size: attachment.size
    }))
  }

  return groups
})

const hasResources = computed(() => Object.keys(groupedResources.value).length > 0)

const openAddModal = () => {
  showAddModal.value = true
}

const getResourceDisplayName = (link: InquiryLink): string => {
  const typeNames: Record<string, string> = {
    poll: t('agora', 'Poll'),
    form: t('agora', 'Form'),
    card: t('agora', 'Card'),
    expense: t('agora', 'Expense'),
    file: t('agora', 'File'),
    page: t('agora', 'Collective Page'),
  }

  const typeName = typeNames[link.target_type] || link.target_type
  const resourceId = link.target_id

  // For files, show the filename
  if (link.target_app === 'files') {
    const attachment = attachmentsStore.attachments.find(att => 
      att.id?.toString() === resourceId
    )
    if (attachment) {
      return attachment.name
    }
  }

  // Use title from metadata if available
  const metadata = parseMetadata(link.metadata)
  if (metadata?.title) {
    return metadata.title
  }

  return `${typeName} #${resourceId}`
}

const getAppName = (appId: string): string => {
  const appNames: Record<string, string> = {
    polls: t('agora', 'Polls'),
    forms: t('agora', 'Forms'),
    deck: t('agora', 'Deck'),
    cospend: t('agora', 'Cospend'),
    files: t('agora', 'Files'),
    collectives: t('agora', 'Collectives'),
  }
  return appNames[appId] || appId
}

const getAppIcon = (appId: string): unknown => {
  const icons: Record<string, unknown> = {
    polls: InquiryGeneralIcons.Poll,
    forms: InquiryGeneralIcons.Form,
    deck: InquiryGeneralIcons.Deck,
    cospend: InquiryGeneralIcons.Money,
    files: InquiryGeneralIcons.Document,
    collectives: InquiryGeneralIcons.Collectives,
  }
  return icons[appId] || InquiryGeneralIcons.Link
}

// Delete
const deleteResource = async (resource: ResourceItem) => {
  try {
    if (resource.type === 'attachment') {
      const confirmed = await confirmDeletion(
        t('agora', 'Are you sure you want to delete this file? This action cannot be undone.'),
        t('agora', 'Confirm file deletion'),
        t('agora', 'Delete file'),
        t('agora', 'Cancel')
      )

      if (!confirmed) return;

      await handleAttachmentDeletion(resource);
      return;
    }

    const confirmedLinkDeletion = await confirmDeletion(
      t('agora', 'Are you sure you want to delete this resource link? This will remove the reference from Agora.'),
      t('agora', 'Confirm link deletion'),
      t('agora', 'Delete link'),
      t('agora', 'Cancel')
    )

    if (!confirmedLinkDeletion) return;

    await inquiryLinksStore.delete(resource.id);

    const confirmedDataDeletion = await confirmDeletion(
      t('agora', 'Do you also want to permanently delete the associated {app} data? This action cannot be undone.', { app: resource.target_app }),
      t('agora', 'Delete external data?'),
      t('agora', 'Delete everything'),
      t('agora', 'Keep external data')
    )

    await handleSpecificResourceDeletion(resource, confirmedDataDeletion);

  } catch (error) {
    console.error('Error deleting resource:', error);
    const errorMsg = getErrorMessage(resource.target_app);
    showError(errorMsg);
  }
}

// Helper functions
const confirmDeletion = (
  message: string,
  title: string,
  confirmText: string = t('agora', 'Delete'),
  cancelText: string = t('agora', 'Cancel')
): Promise<boolean> => new Promise((resolve) => {
    window.OC.dialogs.confirm(
      message,
      title,
      (result) => resolve(!!result),
      {
        type: 'error',
        confirm: confirmText,
        cancel: cancelText,
      }
    )
  })

const handleSpecificResourceDeletion = async (resource: ResourceItem, deleteExternalData: boolean) => {
  const deletionHandlers = {
    cospend: async () => {
      if (deleteExternalData) {
        await inquiryLinksStore.deleteCospendProjectViaAPI(resource.target_id); 
        showSuccess(t('agora', 'Cospend project and link deleted successfully'));
      } else {
        showSuccess(t('agora', 'Link deleted successfully - Cospend project kept'));
      }
    },
    deck: async () => {
      if (deleteExternalData) {
        await inquiryLinksStore.deleteDeckViaAPI(resource.target_id);
        showSuccess(t('agora', 'Deck board and link deleted successfully'));
      } else {
        showSuccess(t('agora', 'Link deleted successfully - Deck board kept'));
      }
    },
    collectives: async () => {
      if (deleteExternalData) {
        await inquiryLinksStore.deleteCollectiveViaAPI(resource.target_id);
        showSuccess(t('agora', 'Collective and link deleted successfully'));
      } else {
        showSuccess(t('agora', 'Link deleted successfully - Collective kept'));
      }
    },
    polls: async () => {
      if (deleteExternalData) {
        await inquiryLinksStore.deletePollViaAPI(resource.target_id);
        showSuccess(t('agora', 'Poll and link deleted successfully'));
      } else {
        showSuccess(t('agora', 'Link deleted successfully - Poll kept'));
      }
    },
    forms: async () => {
      if (deleteExternalData) {
        await inquiryLinksStore.deleteFormViaAPI(resource.target_id);
        showSuccess(t('agora', 'Form and link deleted successfully'));
      } else {
        showSuccess(t('agora', 'Link deleted successfully - Form kept'));
      }
    },
    default: async () => {
      showSuccess(t('agora', 'Resource link deleted successfully'));
    }
  };

  const handler = deletionHandlers[resource.target_app as keyof typeof deletionHandlers] || deletionHandlers.default;
  await handler();
}

const handleAttachmentDeletion = async (resource: ResourceItem) => {
  const attachment = attachmentsStore.attachments.find(att => att.id === resource.id);

  if (!attachment) {
    console.warn('No attachment found with id:', resource.id);
    return;
  }

  // Only delete from server if it's a positive numeric ID
  if (attachment.id && attachment.id > 0) {
    await attachmentsStore.delete(attachment.id);
  }

  // Use filter for immutable update
  attachmentsStore.attachments = attachmentsStore.attachments.filter(att => att.id !== resource.id);

  showSuccess(t('agora', 'File has been removed!'));
}

const getErrorMessage = (resourceType: string): string => {
  const messages = {
    cospend: t('agora', 'Failed to delete Cospend resource'),
    deck: t('agora', 'Failed to delete Deck resource'),
    collectives: t('agora', 'Failed to delete Collective resource'),
    polls: t('agora', 'Failed to delete Poll resource'),
    forms: t('agora', 'Failed to delete Form resource'),
    attachment: t('agora', 'Failed to delete file'),
    default: t('agora', 'Failed to delete resource')
  };

  return messages[resourceType as keyof typeof messages] || messages.default;
}

// Resource display helpers
const getResourceSubtitle = (resource: ResourceItem): string => {
  // For attachments, show file size
  if (resource.type === 'attachment') {
    const size = resource.attachment?.size ?? resource.size
    if (size !== undefined && size !== null) {
      return `${formatFileSize(size)}`
    }
  }
  // For links, show app name
  return getAppName(resource.target_app)
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, unitIndex)).toFixed(2))} ${sizes[unitIndex]}`
}

// Get the target for the link
const getResourceTarget = (): string => '_blank'

// Add this function to check if resource can be edited
const canEditResource = (): boolean => {

 if (!currentInquiry.value) {
    return false
  }

  // Only owners can delete resources
  if (!currentInquiry.value.currentUserStatus?.isOwner) {
    return false
  }


  // Use your permission system if available, otherwise simple owner check
  try {
      if (context.value === undefined || context.value === null) {
         return currentInquiry.value.currentUserStatus?.isOwner
    }
    return canEdit?.(context.value) ?? currentInquiry.value.currentUserStatus?.isOwner
  } catch (error) {
    console.error('Error checking edit permissions:', error)
    return currentInquiry.value.currentUserStatus?.isOwner
  }
}

// Get the href for the link
const getResourceHref = (resource: ResourceItem): string => {
  if (resource.type === 'attachment' && resource.attachment?.url) {
    return resource.attachment.url
  }

  if (resource.type === 'link') {
    const metadata = parseMetadata(resource.metadata)

    // Use URL from metadata if available
    if (metadata?.url) {
      return metadata.url
    }

    // Fallback to the resource.url if no metadata URL
    if (resource.url) {
      return resource.url
    }
  }

  return '#'
}

// Handle click with proper prevention
const handleResourceClick = () => {
  // Empty function since parameters weren't used
}

const loadLinks = async () => {
  try {
    isLoading.value = true
    await inquiryLinksStore.loadByInquiry(currentInquiry.value.id)
  } catch (error) {
    console.warn('Could not load inquiry links:', error)
  } finally {
    isLoading.value = false
  }
}

// Create a refresh method
const refreshResources = async () => {
  try {
    isLoading.value = true
    await loadLinks()
  } catch (error) {
    console.error('Error refreshing resources:', error)
  } finally {
    isLoading.value = false
  }
}

// Watch for modal close to refresh resources
watch(showAddModal, async (newValue, oldValue) => {
  // When modal changes from open to closed, refresh the data
  if (oldValue === true && newValue === false) {
    await refreshResources()
  }
})

// Watch for store changes to auto-update
watch(
  () => inquiryLinksStore.links,
  () => {
    // This will trigger recomputation of groupedResources
  },
  { deep: true }
)

// Watch for attachments changes
watch(
  () => attachmentsStore.attachments,
  () => {
    // This will trigger recomputation of groupedResources
  },
  { deep: true }
)

onMounted(async () => {
  await refreshResources()
})
</script>

<template>
    <div class="sidebar-links">
        <div class="sidebar-header">
            <div class="header-content">
                <div class="header-text">
                    <h2>{{ t('agora', 'Linked Resources') }}</h2>
                    <p class="description">{{ t('agora', 'Manage links to other Nextcloud resources and files') }}</p>
                </div>
                <NcButton
                        v-if="currentInquiry.currentUserStatus?.isOwner"
                        type="primary"
                        class="add-resource-btn"
                        @click="openAddModal"
                        >
                        <template #icon>
                            <component :is="InquiryGeneralIcons.Plus" :size="20" />
                        </template>
                {{ t('agora', 'Add Resource') }}
                </NcButton>
            </div>
        </div>

        <div class="resources-list">
            <div v-if="isLoading" class="loading-state">
                {{ t('agora', 'Loading resources …') }}
            </div>

            <div v-else-if="!hasResources" class="empty-state">
                <component :is="InquiryGeneralIcons.Link" :size="48" class="empty-icon" />
                <p>{{ t('agora', 'No linked resources') }}</p>
                <p class="empty-description">{{ t('agora', 'Add resources or files to connect with other apps') }}</p>
            </div>

            <div v-else class="resources-groups">
                <div v-for="(resources, appId) in groupedResources" :key="appId" class="resource-group">
                    <h3 class="group-title">
                        <component :is="getAppIcon(appId)" :size="20" class="group-icon" />
                        {{ getAppName(appId) }}
                    </h3>
                    <div class="group-items">
                        <NcListItem
                                v-for="resourceItem in resources"
                                :key="resourceItem.id || resourceItem.target_id"
                                :name="resourceItem.displayName"
                                :bold="true"
                                :force-display-actions="true"
                                :target="getResourceTarget()"
                                :href="getResourceHref(resourceItem)"
                                :to="null"
                                @click="handleResourceClick"
                                >
                                <template #icon>
                                    <component :is="resourceItem.icon" :size="20" />
                                </template>

                        <template #indicator>
                            {{ getResourceSubtitle(resourceItem) }}
                        </template>

                        <template #actions >
                            <NcActionButton
                                    v-if="canEditResource()"
                                    @click.stop="deleteResource(resourceItem)"
                                    >
                                    <template #icon>
                                        <component :is="InquiryGeneralIcons.Delete" :size="16" />
                                    </template>
                            {{ t('agora', 'Delete') }}
                            </NcActionButton>
                        </template>
                        </NcListItem>
                    </div>
                </div>
            </div>
        </div>

        <AddResourceModal
                v-model:open="showAddModal"
                :available-apps="availableApps"
                :inquiry="currentInquiry"
                />
    </div>
</template>

<style scoped lang="scss">
.sidebar-links {
    padding: var(--default-grid-baseline);
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--default-grid-baseline);

    .sidebar-header {
        margin-bottom: var(--default-grid-baseline);
        border-bottom: 1px solid var(--color-border);
        padding-bottom: var(--default-grid-baseline);

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: var(--default-grid-baseline);

            .header-text {
                flex-grow: 1;

                h2 {
                    margin: 0;
                    font-size: 1.2em;
                    font-weight: 600;
                    color: var(--color-text);
                }

                .description {
                    margin: calc(var(--default-grid-baseline) / 2) 0 0 0;
                    font-size: 0.9em;
                    color: var(--color-text-lighter);
                }
            }

            .add-resource-btn {
                flex-shrink: 0;
            }
        }
    }

    .resources-list {
        flex-grow: 1;
        overflow-y: auto;

        .loading-state,
        .empty-state {
            text-align: center;
            color: var(--color-text-lighter);
            padding: calc(var(--default-grid-baseline) * 3);
            font-style: italic;

            .empty-icon {
                margin-bottom: var(--default-grid-baseline);
                color: var(--color-border);
            }

            .empty-description {
                font-size: 0.9em;
                margin-top: calc(var(--default-grid-baseline) / 2);
                margin-bottom: var(--default-grid-baseline);
            }
        }

        .resources-groups {
            display: flex;
            flex-direction: column;
            gap: var(--default-grid-baseline);
        }

        .resource-group {
            .group-title {
                display: flex;
                align-items: center;
                gap: calc(var(--default-grid-baseline) / 2);
                margin: 0 0 calc(var(--default-grid-baseline) / 2) 0;
                font-size: 1em;
                font-weight: 600;
                color: var(--color-text);

                .group-icon {
                    color: var(--color-primary-element);
                }
            }

            .group-items {
                display: flex;
                flex-direction: column;
                gap: 1px;
                background-color: var(--color-background-dark);
                border-radius: var(--border-radius);
                overflow: hidden;
            }
        }
    }
}
</style>
