<!--
  - SPDX-FileCopyrightText: 2024 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<script setup lang="ts">
import { t } from '@nextcloud/l10n'
import { ref, onMounted, watch, computed } from 'vue'
import { 
  NcButton, 
  NcSelect, 
  NcModal, 
  NcTextField,
  NcNoteCard 
} from '@nextcloud/vue'
import { showError, showSuccess } from '@nextcloud/dialogs'
import { useInquiryLinksStore } from '../../stores/inquiryLinks'
import { useAttachmentsStore } from '../../stores/attachments'
import { useInquiryStore } from '../../stores/inquiry'
import { InquiryGeneralIcons } from '../../utils/icons.ts'
import { Inquiry } from '../../Types/index.ts'

// Define interfaces for resource types
interface ResourceType {
  id: 'files' | 'forms' | 'deck' | 'cospend' | 'collectives' | 'polls'
  name: string
  icon: string
  description: string
}

interface SelectOption {
  id: string
  label: string
  name: string
  description: string
  data: string
}

// Props
const props = defineProps<{
  open: boolean
  availableApps?: string[]
  inquiry?: Inquiry
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const inquiryLinksStore = useInquiryLinksStore()
const attachmentsStore = useAttachmentsStore()
const inquiryStore = useInquiryStore()

// State
const isCreating = ref(false)
const selectedResource = ref<SelectOption | null>(null)
const selectedResourceType = ref<'files' | 'forms' | 'deck' | 'cospend' | 'collectives' | 'polls'>('files')
const resources = ref<unknown[]>([])
const isLoading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFiles = ref<File[]>([])

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


// Form data
const resourceTitle = ref(currentInquiry.value.title ? `${currentInquiry.value.title}` : '')
const resourceDescription = ref(currentInquiry.value.description || '')

// Resource types configuration
const resourceTypes: ResourceType[] = [
  {
    id: 'files',
    name: t('agora', 'Files'),
    icon: InquiryGeneralIcons.Document,
    description: t('agora', 'Upload and share files'),
  },
  {
    id: 'forms',
    name: t('agora', 'Forms'),
    icon: InquiryGeneralIcons.Form,
    description: t('agora', 'Create surveys and collect responses'),
  },
  {
    id: 'polls', 
    name: t('agora', 'Polls'),
    icon: InquiryGeneralIcons.Poll,
    description: t('agora', 'Create simple polls and votes'),
  },
  {
    id: 'deck',
    name: t('agora', 'Deck Cards'),
    icon: InquiryGeneralIcons.Deck,
    description: t('agora', 'Create task cards in Deck'),
  },
  {
    id: 'cospend',
    name: t('agora', 'Cospend Expenses'),
    icon: InquiryGeneralIcons.Money,
    description: t('agora', 'Track shared expenses'),
  },
  {
    id: 'collectives',
    name: t('agora', 'Collectives'),
    icon: InquiryGeneralIcons.Collectives,
    description: t('agora', 'Link to collective pages'),
  }
]

// Filter resource types based on available apps
const availableResourceTypes = computed(() => {
  if (!props.availableApps || props.availableApps.length === 0) {
    return resourceTypes
  }
  
  return resourceTypes.filter(type => {
    // Files are always available
    if (type.id === 'files') return true
    
    // Check if app is available
    const appMapping: Record<string, string> = {
      forms: 'forms',
      polls: 'polls', 
      deck: 'deck',
      cospend: 'cospend',
      collectives: 'collectives'
    }
    
    const appId = appMapping[type.id]
    return appId ? props.availableApps?.includes(appId) : true
  })
})

// Computed
const resourceOptions = computed((): SelectOption[] => 
  resources.value.map(resource => {
    let label = ''
    let description = ''
    
    switch (selectedResourceType.value) {
      case 'polls':
        // Structure Polls: { title, description } directement dans l'objet
        label = resource.configuration.title || 'Unnamed Poll'
        description = resource.configuration.description || t('agora', 'No description')
        break
        
      case 'deck':
        label = resource.title || 'Unnamed Board'
        description = resource.description || t('agora', 'No description')
        break
        
      case 'cospend':
        label = resource.name || resource.title || 'Unnamed Project'
        description = resource.description || t('agora', 'No description')
        break
        
      case 'forms':
        label = resource.title || resource.name || resource.filename
        description = resource.description || t('agora', 'No description')
        break
        
      default:
        label = resource.title || resource.name || resource.filename
        description = resource.description || t('agora', 'No description')
    }
    
    return {
      id: resource.id?.toString() || resource.fileId?.toString(),
      label,
      name: label,
      description,
      data: resource
    }
  })
)

const currentResourceType = computed(() => availableResourceTypes.value.find(type => type.id === selectedResourceType.value))

const hasResources = computed(() => resources.value.length > 0)
const canCreateResource = computed(() => {
  if (selectedResourceType.value === 'files') {
    return selectedFiles.value.length > 0
  }
  return resourceTitle.value.trim().length > 0
})
const canLinkResource = computed(() => selectedResource.value !== null && selectedResource.value !== '')
const canSubmit = computed(() => canCreateResource.value || canLinkResource.value)
const isFileType = computed(() => selectedResourceType.value === 'files')

// Helper functions
const getResourceName = (type: ResourceType | undefined): string => type?.name || 'resource'

const getResourceNameLower = (type: ResourceType | undefined): string => type?.name?.toLowerCase() || 'resource'

// Lifecycle
onMounted(async () => {
  if (props.open) {
    await loadResources()
  }
})

// Watch for modal open
watch(() => props.open, async (isOpen) => {
  if (isOpen) {
    await loadResources()
    // Reset form when opening
    selectedResource.value = null
    selectedFiles.value = []
    resourceTitle.value = currentInquiry.value.title ? `${currentInquiry.value.title}` : ''
    resourceDescription.value = currentInquiry.value.description || ''
  }
})

// Watch for resource type changes
watch(selectedResourceType, async () => {
  await loadResources()
  selectedResource.value = null
  selectedFiles.value = []
})

// Load existing resources for all different one 
const loadResources = async () => {
  try {
    isLoading.value = true
    resources.value = []
    
    const resourceType = currentResourceType.value
    if (!resourceType) return

    switch (resourceType.id) {
      case 'forms':
        if (inquiryLinksStore.getOwnedForms && inquiryLinksStore.getSharedForms) {
          const [ownedResources, sharedResources] = await Promise.all([
            inquiryLinksStore.getOwnedForms().catch(() => []),
            inquiryLinksStore.getSharedForms().catch(() => [])
          ])
          resources.value = [...ownedResources, ...sharedResources]
        }
        break

      case 'files':
        // For files, load existing attachments
        resources.value = attachmentsStore.attachments
          .filter(att => att.fileId !== currentInquiry.value.coverId)
          .map(att => ({
            id: att.id,
            filename: att.name,
            name: att.name,
            size: att.size,
            url: att.url
          }))
        break

      case 'polls':
        // Load polls if the method exists
        if (inquiryLinksStore.getOwnedPolls) {
          const [ownedPolls] = await Promise.all([
            inquiryLinksStore.getOwnedPolls().catch(() => []),
          ])
          resources.value = [...ownedPolls]
        }
        break

      case 'deck':
        // Load Deck boards if the method exists
        if (inquiryLinksStore.getOwnedDeckBoards) {
          const deckBoards = await inquiryLinksStore.getOwnedDeckBoards().catch(() => [])
          resources.value = deckBoards
        } 
        break

      case 'cospend':
        // Load Cospend projects if the method exists
        if (inquiryLinksStore.getOwnedCospendProjects) {
          const cospendProjects = await inquiryLinksStore.getOwnedCospendProjects().catch(() => [])
          resources.value = cospendProjects
        }
        break

      case 'collectives':
        // Load Collectives if the method exists
        if (inquiryLinksStore.getOwnedCollectives) {
            const collectives = await inquiryLinksStore.getOwnedCollectives().catch(() => [])
            resources.value=collectives || []
        } 
        break

      default:
      break
    }
  } catch (error) {
    console.error(error)
    showError(t('agora', 'Failed to load resources'))
    resources.value = []
  } finally {
    isLoading.value = false
  }
}

// File handling methods
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files) return

  selectedFiles.value = Array.from(files)
  target.value = ''
  // Clear resource selection when files are selected
  selectedResource.value = null
}

const removeSelectedFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, unitIndex)).toFixed(2))} ${sizes[unitIndex]}`
}

const createNewResource = async () => {
  if (!canCreateResource.value) {
    showError(t('agora', 'Title is required'))
    return
  }

  try {
    isCreating.value = true
    const resourceType = currentResourceType.value
    if (!resourceType) throw new Error('No resource type selected')

    // Remove unused variable declaration
    // let newResource

    switch (resourceType.id) {
      case 'forms':
        // Use the new createForm method that handles both creation and linking
        await inquiryLinksStore.createForm(
          currentInquiry.value.id,
          {
            title: resourceTitle.value,
            description: resourceDescription.value
          }
        )
        break

      case 'files':
        // Upload files and update attachments store
        if (selectedFiles.value.length === 0) {
          throw new Error('No files selected')
        }

        for (const file of selectedFiles.value) {
          const response = await attachmentsStore.upload(currentInquiry.value.id, file, false)
          
          // Update attachments store reactively
          attachmentsStore.attachments.push({
            id: response.id,
            name: response.name,
            size: response.size,
            url: response.url,
            fileId: response.id
          })
        }
        break

      case 'polls':
        // Use the new createPoll method
        await inquiryLinksStore.createPoll(
          currentInquiry.value.id,
          {
            title: resourceTitle.value,
            description: resourceDescription.value
          }
        )
        break

      case 'deck':
        await inquiryLinksStore.createDeckBoard(
          currentInquiry.value.id,
          {
            title: resourceTitle.value,
            description: resourceDescription.value
          }
        )
        break

      case 'cospend':
        // Use the new createCospendProject method
        await inquiryLinksStore.createCospendProject(
          currentInquiry.value.id,
          {
            title: resourceTitle.value,
            description: resourceDescription.value
          }
        )
        break

      case 'collectives':
        // Use the new createCollective method
        await inquiryLinksStore.createCollective(
          currentInquiry.value.id,
          {
            title: resourceTitle.value,
            description: resourceDescription.value
          }
        )
        break

      default:
        throw new Error(`Unknown resource type: ${resourceType.id}`)
    }

    const successMessage = resourceType.id === 'files' 
      ? t('agora', 'Files uploaded successfully')
      : t('agora', '{resource} created and linked successfully', { resource: resourceType.name })

    showSuccess(successMessage)
    closeModal()
    
  } catch (error) {
    console.error(error)
    showError(
      t('agora', 'Failed to create {resource}', 
        { resource: currentResourceType.value?.name || 'resource' })
    )
  } finally {
    isCreating.value = false
  }
}

const linkExistingResource = async () => {
  if (!canLinkResource.value) {
    showError(t('agora', 'Please select a resource'))
    return
  }

  try {
    isCreating.value = true
    const resourceType = currentResourceType.value
    if (!resourceType) throw new Error('No resource type selected')

    // Get the selected resource ID from the selected object
    const resourceData = selectedResource.value?.data
    const resourceId = selectedResource.value?.id || selectedResource.value

    const title = resourceData.title || resourceData.name
   switch (resourceType.id) {
  case 'forms': {
    const formHash = resourceData.hash || resourceData.configuration?.hash
    await inquiryLinksStore.linkForm(currentInquiry.value.id, resourceId, formHash, title)
    break
  }
  case 'polls': {
    await inquiryLinksStore.linkPoll(currentInquiry.value.id, resourceId, resourceData.configuration.title)
    break
  }
  case 'deck': {
    await inquiryLinksStore.linkDeckBoard(currentInquiry.value.id, resourceId, title)
    break
  }
  case 'cospend': {
    await inquiryLinksStore.linkCospendProject(currentInquiry.value.id, resourceId, title)
    break
  }
  case 'collectives': {
    const collectiveTitle = resourceData.title || resourceData.name
    await inquiryLinksStore.linkCollective(currentInquiry.value.id, resourceId, collectiveTitle)
    break
  }
  default: {
    // Fallback for other types
    await inquiryLinksStore.create({
      inquiryId: currentInquiry.value.id,
      targetApp: resourceType.id,
      targetType: resourceType.id === 'forms' ? 'form' : resourceType.id,
      targetId: resourceId,
      url: '',
      sortOrder: 0
    })
  }
  }


    showSuccess(
      t('agora', '{resource} linked successfully', 
        { resource: resourceType.name })
    )
    closeModal()

  } catch (error) {
    console.error(error)
    showError(
      t('agora', 'Failed to link {resource}', 
        { resource: currentResourceType.value?.name || 'resource' })
    )
  } finally {
    isCreating.value = false
  }
}

const closeModal = () => {
  emit('update:open', false)
  isCreating.value = false
  selectedResource.value = null
  selectedResourceType.value = 'files'
  selectedFiles.value = []
}

const handleSubmit = () => {
  if (canLinkResource.value) {
    linkExistingResource()
  } else if (canCreateResource.value) {
    createNewResource()
  }
}

// Handle select change
const handleSelectChange = (selected: SelectOption | null) => {
  if (selected) {
    selectedResource.value = selected
    // Clear creation fields when selecting an existing resource
    resourceTitle.value = ''
    resourceDescription.value = ''
    selectedFiles.value = []
  } else {
    selectedResource.value = null
  }
}

// Handle title input - clear selection when user starts typing
const handleTitleInput = () => {
  if (selectedResource.value) {
    selectedResource.value = null
  }
}
</script>

<template>
    <NcModal
            v-if="open"
            :name="t('agora', 'Add Resource to Inquiry')"
            size="large"
            @close="closeModal"
            >
            <div class="modal-content">
                <div class="modal-header">
                    <h2>{{ t('agora', 'Add Resource to Inquiry') }}</h2>
                    <p class="modal-description">
                    {{ t('agora', 'Link an existing resource or create a new one for this inquiry') }}
                    </p>
                </div>

                <div class="modal-body">
                    <!-- Resource Type Selection -->
                    <div class="resource-type-section">
                        <h3 class="section-title">{{ t('agora', 'Resource Type') }}</h3>
                        <div class="resource-type-grid">
                            <div
                                    v-for="type in availableResourceTypes"
                                    :key="type.id"
                                    class="resource-type-card"
                                    :class="{ active: selectedResourceType === type.id }"
                                    @click="selectedResourceType = type.id"
                                    >
                                    <component :is="type.icon" :size="24" class="type-icon" />
                                    <div class="type-info">
                                        <h4 class="type-name">{{ type.name }}</h4>
                                        <p class="type-description">{{ type.description }}</p>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <!-- Link Existing Resource Section -->
                    <div v-if="!isFileType" class="form-section">
                        <div class="section-header">
                            <component :is="InquiryGeneralIcons.Link" :size="20" class="section-icon" />
                            <h3>{{ t('agora', 'Link Existing {resource}', { resource: currentResourceType?.name }) }}</h3>
                        </div>

                        <NcNoteCard 
                                                                                 v-if="!hasResources && !isLoading" 
                                                                                 type="info" 
                                                                                 class="info-card"
                                                                                 >
                                                                                 {{ t('agora', 'No {resource} found. You can create a new one instead.', { resource: getResourceNameLower(currentResourceType) }) }}
                        </NcNoteCard>

                        <div v-if="isLoading" class="loading-state">
                            <div class="loading-spinner"></div>
                            <span>{{ t('agora', 'Loading your {resource}...', { resource: getResourceNameLower(currentResourceType) }) }}</span>
                        </div>

                        <div v-else-if="hasResources" class="select-wrapper">
                            <label class="select-label">{{ t('agora', 'Choose a {resource} to link', { resource: getResourceNameLower(currentResourceType) }) }}</label>
                            <NcSelect
                                    v-model="selectedResource"
                                    :options="resourceOptions"
                                    :clearable="true"
                                    :placeholder="t('agora', 'Select a {resource}...', { resource: getResourceNameLower(currentResourceType) })"
                                    :disabled="isCreating"
                                    label="label"
                                    @update:model-value="handleSelectChange"
                                    >
                                    <template #option="option">
                                        <div class="select-option">
                                            <div class="option-title">{{ option.label }}</div>
                                            <div v-if="option.description" class="option-description">{{ option.description }}</div>
                                        </div>
                                    </template>
                                    <template #selected="selected">
                                        <div class="selected-option">
                                            <div class="selected-title">{{ selected.label }}</div>
                                        </div>
                                    </template>
                            </NcSelect>
                            <p class="select-hint">
                            {{ t('agora', 'Select a {resource} you own or have access to', { resource: getResourceNameLower(currentResourceType) }) }}
                            </p>
                        </div>
                    </div>

                    <!-- Separator -->
                    <div v-if="!isFileType && hasResources" class="separator">
                        <span class="separator-text">{{ t('agora', 'OR') }}</span>
                    </div>

                    <!-- Create New Resource Section -->
                    <div class="form-section">
                        <div class="section-header">
                            <component :is="InquiryGeneralIcons.Plus" :size="20" class="section-icon" />
                            <h3>
                                <span v-if="isFileType">{{ t('agora', 'Upload Files') }}</span>
                                <span v-else>{{ t('agora', 'Create New {resource}', { resource: getResourceName(currentResourceType) }) }}</span>
                            </h3>
                        </div>

                        <div class="create-resource-fields">
                            <!-- File Upload Section -->
                            <div v-if="isFileType" class="file-upload-section">
                                <input
                                        ref="fileInput"
                                        type="file"
                                        multiple
                                        class="hidden"
                                        accept="*/*"
                                        @change="handleFileSelect"
                                        />
                                <NcButton
                                        type="secondary"
                                        class="file-select-button"
                                        @click="triggerFileInput"
                                        >
                                        <template #icon>
                                            <component :is="InquiryGeneralIcons.Attachment" :size="20" />
                                        </template>
                                {{ t('agora', 'Select Files') }}
                                </NcButton>

                                <!-- Selected Files List -->
                                <div v-if="selectedFiles.length > 0" class="selected-files">
                                    <h4 class="files-title">{{ t('agora', 'Selected Files') }}</h4>
                                    <div class="file-list">
                                        <div
                                                v-for="(file, index) in selectedFiles"
                                                :key="index"
                                                class="file-item"
                                                >
                                                <div class="file-info">
                                                    <component :is="InquiryGeneralIcons.Document" :size="16" class="file-icon" />
                                                    <span class="file-name">{{ file.name }}</span>
                                                    <span class="file-size">{{ formatFileSize(file.size) }}</span>
                                                </div>
                                                <NcButton
                                                        type="error"
                                                        :aria-label="t('agora', 'Remove file')"
                                                        @click="removeSelectedFile(index)"
                                                        >
                                                        <template #icon>
                                                            <component :is="InquiryGeneralIcons.Delete" :size="16" />
                                                        </template>
                                                </NcButton>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Form Fields for other resource types -->
                            <div v-else>
                                <NcTextField
                                        v-model="resourceTitle"
                                        :label="t('agora', '{resource} Title', { resource: getResourceName(currentResourceType) })"
                                        :placeholder="t('agora', 'Enter {resource} title', { resource: getResourceNameLower(currentResourceType) })"
                                        :disabled="isCreating"
                                        :required="true"
                                        class="form-field"
                                        @update:model-value="handleTitleInput"
                                        />

                                <NcTextField
                                        v-model="resourceDescription"
                                        :label="t('agora', 'Description')"
                                        :placeholder="t('agora', 'Enter description (optional)')"
                                        :disabled="isCreating"
                                        type="textarea"
                                        class="form-field"
                                        />

                                <NcNoteCard v-if="currentInquiry.expires && selectedResourceType === 'forms'" type="info" class="info-card">
                                {{ t('agora', 'This form will inherit the inquiry expiration date.') }}
                                </NcNoteCard>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="modal-actions">
                    <NcButton 
                     :disabled="isCreating"
                     class="cancel-button"
                     @click="closeModal"
                     >
                     {{ t('agora', 'Cancel') }}
                    </NcButton>
                    <NcButton
                            type="primary"
                            :disabled="isCreating || !canSubmit"
                            :loading="isCreating"
                            class="submit-button"
                            @click="handleSubmit"
                            >
                            <template #icon>
                                <component :is="InquiryGeneralIcons.Plus" :size="20" />
                            </template>
                    <span v-if="isCreating">
                        {{ isFileType ? t('agora', 'Uploading …') : t('agora', 'Creating …') }}
                    </span>
                    <span v-else-if="canLinkResource">
                        {{ t('agora', 'Link {resource}', { resource: getResourceName(currentResourceType) }) }}
                    </span>
                    <span v-else-if="isFileType">
                        {{ t('agora', 'Upload Files') }}
                    </span>
                    <span v-else>
                        {{ t('agora', 'Create {resource}', { resource: getResourceName(currentResourceType) }) }}
                    </span>
                    </NcButton>
                </div>
            </div>
    </NcModal>
</template>

<style scoped>
.modal-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
}

.modal-header {
    text-align: center;
}

.modal-header h2 {
    margin: 0 0 8px 0;
    font-size: 24px;
    font-weight: 600;
}

.modal-description {
    margin: 0;
    color: var(--color-text-lighter);
    font-size: 14px;
}

.modal-body {
    display: flex;
    flex-direction: column;
    gap: 24px;
    flex: 1;
    overflow-y: auto;
}

.resource-type-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.section-title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
}

.resource-type-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
}

.resource-type-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    border: 2px solid var(--color-border);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.resource-type-card:hover {
    border-color: var(--color-primary);
    background-color: var(--color-background-hover);
}

.resource-type-card.active {
    border-color: var(--color-primary);
    background-color: var(--color-primary-light);
}

.type-icon {
    color: var(--color-primary);
    flex-shrink: 0;
}

.type-info {
    flex: 1;
}

.type-name {
    margin: 0 0 4px 0;
    font-size: 14px;
    font-weight: 600;
}

.type-description {
    margin: 0;
    font-size: 12px;
    color: var(--color-text-lighter);
    line-height: 1.4;
}

.form-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.section-header {
    display: flex;
    align-items: center;
    gap: 8px;
}

.section-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
}

.section-icon {
    color: var(--color-primary);
}

.select-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.select-label {
    font-size: 14px;
    font-weight: 500;
}

.select-hint {
    margin: 0;
    font-size: 12px;
    color: var(--color-text-lighter);
}

.separator {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 16px 0;
}

.separator::before,
.separator::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid var(--color-border);
}

.separator-text {
    padding: 0 16px;
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-lighter);
    text-transform: uppercase;
}

.create-resource-fields {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.file-upload-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.file-select-button {
    align-self: flex-start;
}

.selected-files {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.files-title {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
}

.file-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.file-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background-color: var(--color-background-dark);
}

.file-info {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
}

.file-icon {
    color: var(--color-text-lighter);
    flex-shrink: 0;
}

.file-name {
    font-size: 14px;
    flex: 1;
}

.file-size {
    font-size: 12px;
    color: var(--color-text-lighter);
}

.form-field {
    width: 100%;
}

.info-card {
    margin: 0;
}

.loading-state {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px;
    justify-content: center;
    color: var(--color-text-lighter);
}

.loading-spinner {
    width: 16px;
    height: 16px;
    border: 2px solid var(--color-border);
    border-top: 2px solid var(--color-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }

  .hidden {
      display: none;
  }

  .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid var(--color-border);
  }

  .cancel-button,
  .submit-button {
      min-width: 100px;
  }

  .select-option {
      padding: 8px 12px;
  }

  .option-title {
      font-weight: 500;
      margin-bottom: 4px;
  }

  .option-description {
      font-size: 12px;
      color: var(--color-text-lighter);
  }

  .selected-option {
      padding: 4px 0;
  }

  .selected-title {
      font-weight: 500;
  }
</style>
