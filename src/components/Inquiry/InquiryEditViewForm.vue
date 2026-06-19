<!--
  - SPDX-FileCopyrightText: 2018 Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted, toRaw } from 'vue'
import { subscribe, unsubscribe } from '@nextcloud/event-bus'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { useInquiryStore } from '../../stores/inquiry'
import { useCommentsStore } from '../../stores/comments'
import { useSessionStore } from '../../stores/session'
import { useAttachmentsStore } from '../../stores/attachments'
import { BaseEntry, Event } from '../../Types/index.ts'
import { DateTime } from 'luxon'
import { t } from '@nextcloud/l10n'
import { useRoute } from 'vue-router'
import {
  getInquiryTypeData,
} from '../../helpers/modules/InquiryHelper.ts'
import {
  getFamiliesWithOptionTypes,
    getLayoutForFamily,
} from '../../helpers/modules/InquiryOptionHelper'
import { SupportFeature } from '../Base/index.ts'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcTextField from '@nextcloud/vue/components/NcTextField'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import NcCounterBubble from '@nextcloud/vue/components/NcCounterBubble'

import { NcTextArea } from '@nextcloud/vue'
import NcRichContenteditable from '@nextcloud/vue/components/NcRichContenteditable'

import InquiryEditor from '../Editor/InquiryEditor.vue'
import OptionEditView from '../Options/OptionEditView.vue'
import { InquiryGeneralIcons, StatusIcons } from '../../utils/icons.ts'
import {
  canSupport,
  canComment,
  createInquiryContext,
} from '../../utils/permissions.ts'


// Props
const props = defineProps<{
  isReadonly: boolean
}>()


// Store declarations
const sessionStore = useSessionStore()
const commentsStore = useCommentsStore()
const inquiryStore = useInquiryStore()
const route = useRoute()
const attachmentsStore = useAttachmentsStore()

const imageFileInput = ref(null)
const currentCoverUrl = ref('')

const triggerImageUpload = () => {
  imageFileInput.value?.click()
}

const isStoreReady = computed(() => inquiryStore && 
         inquiryStore.id && 
         sessionStore && 
         sessionStore.appSettings && 
         Object.keys(sessionStore.appSettings).length > 0)


// Context for permissions
const context = computed(() => {
  if (!isStoreReady.value) return null
  return createInquiryContext(inquiryStore, sessionStore.appSettings)
})


// Form fields
const selectedCategory = ref(inquiryStore.categoryId || 0)
const selectedLocation = ref(inquiryStore.locationId || 0)

const isLoaded = ref(false)

// Get current inquiry type data
const inquiryTypeData = computed(() => {
  const data = getInquiryTypeData(inquiryStore.type, sessionStore.appSettings.inquiryTypeTab || [])
  return data
})



// Computed for families and options
const allInquiryTypes = computed<InquiryType[]>(() =>
    sessionStore.appSettings?.inquiryTypeTab || []
)

const allOptionTypes = computed<OptionType[]>(() =>
    sessionStore.appSettings?.inquiryOptionTypeTab || []
)


const hasVisibleFamilies = computed(() => getFamiliesWithOptionTypes(
        inquiryStore.type,
        allInquiryTypes.value,
        allOptionTypes.value
    ).length > 0)


const availableInquiryStatuses = computed(() => {
  const statusesFromSettings = sessionStore.appSettings.inquiryStatusTab
    ?.filter((status) => status.inquiryType === inquiryStore.type)
    ?.sort((a, b) => a.order - b.order) || [];

  if (inquiryStore.status.inquiryStatus === 'draft') {
    statusesFromSettings.unshift({
      statusKey: 'draft',
      label: 'Draft',
      icon: 'draft',
      inquiryType: inquiryStore.type,
      order: 0,
    });
  }

  if (inquiryStore.status.inquiryStatus === 'waiting_approval') {
    statusesFromSettings.unshift({
      statusKey: 'waiting_approval',
      label: 'Waiting Approval',
      icon: 'waitingapproval',
      inquiryType: inquiryStore.type,
      order: 1,
    });
  }

  return statusesFromSettings;
});

const currentInquiryStatus = computed(
  () => {
    const specialStatuses = {
      'draft': {
	statusKey: 'draft',
	label: 'Draft',
	icon: 'draft',
	inquiryType: inquiryStore.type,
	order: 0,
      },
      'waiting_approval': {
	statusKey: 'waiting_approval',
	label: 'Waiting Approval',
	icon: 'waitingapproval',
	inquiryType: inquiryStore.type,
	order: 1,
      }
    };

    const currentStatus = inquiryStore.status.inquiryStatus;

    if (specialStatuses[currentStatus]) {
      return specialStatuses[currentStatus];
    }

    return availableInquiryStatuses.value.find(
      (status) => status.statusKey === currentStatus
    ) || specialStatuses.draft; 
  }
)

const selectedInquiryStatusKey = ref(currentInquiryStatus.value?.statusKey)
const currentInquiryStatusLabel = computed(() => currentInquiryStatus.value?.label || 'Draft')
const currentInquiryStatusIcon = computed(() => {
	const iconName = currentInquiryStatus.value?.icon || 'draft'
	return StatusIcons[iconName] || StatusIcons.Draft
})

const selectedInquiryStatus = computed({
  get: () => statusInquiryOptions.value.find(option => option.id === selectedInquiryStatusKey.value),
  set: (newValue) => {
    if (newValue) {
      selectedInquiryStatusKey.value = newValue.id
    }
  }
})

const onStatusChange = async (newStatus: string) => {
  try {
    const statusId = newStatus?.id || newStatus
    await inquiryStore.setInquiryStatus(statusId)
    showSuccess(t('agora', 'Inquiry status of this inquiry has been updated'))
  } catch {
    selectedInquiryStatusKey.value = currentInquiryStatus.value.statusKey
  }
}

const statusInquiryOptions = computed(() => 
  availableInquiryStatuses.value.map(status => ({
    id: status.statusKey,
    label: t('agora', status.label),
  }))
)

// Get hierarchy path for location and category display
function getHierarchyPath(items, targetId) {
  const itemMap = {}
  items.forEach((item) => {
    itemMap[item.id] = item
  })

  if (!itemMap[targetId]) {
    return 'ID not found'
  }

  function buildPath(item) {
    if (item.parentId === 0) {
      return item.name
    }
    const parent = itemMap[item.parentId]
    if (parent) {
      return `${buildPath(parent)} -> ${item.name}`
    }
    return item.name
  }

  return buildPath(itemMap[targetId])
}
// Watchers for the image
watch(() => inquiryStore.coverId, (newCoverId) => {
  if (newCoverId) {
    currentCoverUrl.value = getNextcloudPreviewUrl(newCoverId)
  } else {
    currentCoverUrl.value = ''
  }
}, { immediate: true })



// Watchers for location and category
watch(
  selectedLocation,
  (newVal) => {
    const rawValue = toRaw(newVal)
    if (rawValue) {
      inquiryStore.locationId = rawValue.value
    }
  },
  { deep: true }
)

watch(
  selectedCategory,
  (newVal) => {
    const rawValue = toRaw(newVal)
    if (rawValue) {
      inquiryStore.categoryId = rawValue.value
    }
  },
  { deep: true }
)

// Build hierarchy for location and category dropdowns
function buildHierarchy(list: BaseEntry[], parentId = 0, depth = 0): BaseEntry[] {
  if (!Array.isArray(list)) return []
  return list
    .filter((item) => item?.parentId === parentId)
    .map((item) => {
      const children = buildHierarchy(list, item.id, depth + 1)
      return {
	...item,
	depth,
	children,
      }
    })
    .flatMap((item) => [item, ...item.children])
}

const hierarchicalLocation = computed(() => {
  if (!Array.isArray(sessionStore.appSettings.locationTab)) return []
  return buildHierarchy(sessionStore.appSettings.locationTab).map((item) => ({
    value: item.id,
    label: `${'— '.repeat(item.depth ?? 0)}${item.name ?? '[no name]'}`,
    original: item,
  }))
})

const hierarchicalCategory = computed(() => {
  if (!Array.isArray(sessionStore.appSettings.categoryTab)) return []
  return buildHierarchy(sessionStore.appSettings.categoryTab).map((item) => ({
    value: item.id,
    label: `${'— '.repeat(item.depth ?? 0)}${item.name ?? '[no name]'}`,
    original: item,
  }))
})

// Initialize location and category
watch(
  hierarchicalLocation,
  (locations) => {
    if (!locations.length) return
    if (inquiryStore.locationId === 0) {
      selectedLocation.value = locations[0]
      inquiryStore.locationId = locations[0].value
    } else {
      const selected = locations.find((loc) => loc.value === inquiryStore.locationId)
      selectedLocation.value = selected || locations[0]
      inquiryStore.locationId = selected?.value || locations[0].value
    }
  },
  { immediate: true }
)

watch(
  hierarchicalCategory,
  (categories) => {
    if (!categories.length) return
    if (inquiryStore.categoryId === 0) {
      selectedCategory.value = categories[0]
      inquiryStore.categoryId = categories[0].value
    } else {
      const selected = categories.find((loc) => loc.value === inquiryStore.categoryId)
      selectedCategory.value = selected || categories[0]
      inquiryStore.categoryId = selected?.value || categories[0].value
    }
  },
  { immediate: true }
)

// Event subscriptions
onMounted(() => {

  if (inquiryStore.coverId) { 
        currentCoverUrl.value = getNextcloudPreviewUrl(inquiryStore.coverId)
   }
  subscribe(Event.UpdateComments, () => commentsStore.load())
  isLoaded.value = true
})

onUnmounted(() => {
  isLoaded.value = false
  unsubscribe(Event.UpdateComments, () => commentsStore.load())
})

// Determine if category/location should be shown as select or label
const showCategoryAsLabel = computed(() => {
  const result =  props.isReadonly
  return result
})

const showLocationAsLabel = computed(() => {
  const result = props.isReadonly
  return result
})

// Image URL function
function getNextcloudPreviewUrl(fileId, x = 1920, y = 1080, autoScale = true) {
  const baseUrl = window.location.origin
  return `${baseUrl}/index.php/core/preview?fileId=${fileId}&x=${x}&y=${y}&a=${autoScale}`
}

/**
 * Upload a single file and add to attachments list
 * @param event
 */
const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    showError(t('agora', 'Please select an image file'))
    return
  }

  // Check image size 5Mb max
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    showError(t('agora', 'Image size should be less than 5MB'))
    return
  }

  try {

    const response = await attachmentsStore.upload(inquiryStore.id, file,true)

    const attachment = {
      id: response.id ?? `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: response.name ?? file.name,
      size: response.size ?? file.size,
      fileId: response.fileId ?? undefined,
      mimeType: response.mimeType ?? undefined,
    }

    // Use immutable update for better reactivity
    attachmentsStore.attachments = [...attachmentsStore.attachments, attachment]
    currentCoverUrl.value = getNextcloudPreviewUrl(attachment.fileId)
    inquiryStore.coverId=attachment.fileId
    showSuccess(t('agora', '{file} uploaded', { file: response.name ?? file.name }))
  } catch (error) {
    showError(t('agora', 'Failed to upload {file}', { file: file.name }))
    throw error // Re-throw to handle in parent function
    }

}

const timeExpirationRelative = computed(() => {
  if (inquiryStore.configuration.expire) {
    return DateTime.fromMillis(inquiryStore.configuration.expire * 1000).toRelative()
  }
  return t('agora', 'never')
})

const canCommentOnInquiry = computed(() => context.value ? canComment(context.value) : false)

// Add this with your other computed properties
const canSupportInquiry = computed(() =>
  // You might have a context or permission check here
   context.value ? canSupport(context.value) : false
)


// Format date
const formatDate = (timestamp: number) => new Date(timestamp * 1000).toLocaleDateString()

const viewOnlySupportInquiry = computed(() => {
    // Check if user can support based on route
  const isPublicRoute = ['publicInquiry', 'public-view'].includes(route.name as string)
  // If it's a public route, users cannot support
return isPublicRoute
})


</script>

<template>
	<div v-if="isLoaded" class="inquiry-edit-view">
		<!-- Cover Image Section -->

		<div v-if="inquiryStore.currentUserStatus?.isOwner" class="cover-image-section">
			<input
				id="cover-upload-input"
				ref="imageFileInput"
				type="file"
				class="hidden"
				accept="image/*"
				:aria-label="t('agora', 'Select cover image')"
				@change="handleImageUpload"
			/>

			<div 
				v-if="currentCoverUrl" 
				class="cover-image-container"
				@click="triggerImageUpload"
			>
				<img
					:src="currentCoverUrl"
					:alt="t('agora', 'Inquiry cover image')"
					class="cover-image"
				/>
				<div class="cover-image-overlay">
					<NcButton type="primary" class="change-cover-btn">
						<template #icon>
							<component :is="InquiryGeneralIcons.Edit" :size="20" />
						</template>
						{{ t('agora', 'Change cover image') }}
					</NcButton>
				</div>
			</div>

			<div 
				v-else 
				class="cover-image-placeholder"
				@click="triggerImageUpload"
			>
				<div class="placeholder-content">
					<component :is="InquiryGeneralIcons.Image" :size="48" class="placeholder-icon" />
					<NcButton type="primary" class="add-cover-btn">
						{{ t('agora', 'Add cover image') }}
					</NcButton>
					<p class="placeholder-text">{{ t('agora', 'Click to add a cover image') }}</p>
				</div>
			</div>
		</div>

		<!-- Cover Image for non-owners (but editable if not readonly) -->
		<div
			v-else-if="currentCoverUrl"
			class="cover-image-section"
			:class="{ 'clickable': !props.isReadonly }"
			@click="!props.isReadonly && triggerImageUpload()"
		>
			<img
				:src="currentCoverUrl"
				:alt="t('agora', 'Inquiry cover image')"
				class="cover-image"
			/>
			<div v-if="!props.isReadonly" class="cover-image-overlay">
				<NcButton type="primary" class="change-cover-btn">
					<template #icon>
						<component :is="InquiryGeneralIcons.Edit" :size="20" />
					</template>
					{{ t('agora', 'Change cover image') }}
				</NcButton>
			</div>
		</div>

		<!-- Main content section -->
		<div class="main-content-section">
        <div class="section-id-badge">[#{{ inquiryStore.id }}]</div>
			<!-- User info section -->
			<div class="user-info-section">
				<div class="user-avatar">
					<component
						:is="NcAvatar"
						v-if="inquiryStore.ownedGroup !== ''"
						:display-name="inquiryStore.ownedGroup"
						:show-user-status="false"
						:size="56"
					/>
					<component
						:is="NcAvatar"
						v-else
						:user="inquiryStore.owner.id"
						:display-name="inquiryStore.owner.displayName"
						:size="56"
					/>
				</div>
				<div class="user-details">
					<h3 class="user-name">
						{{ inquiryStore.ownedGroup !== '' ? inquiryStore.ownedGroup : inquiryStore.owner.displayName }}
					</h3>
					<div class="inquiry-type-badge">
						<component :is="inquiryTypeData.icon" :size="16" />
						<span>{{ t('agora', inquiryTypeData.label) }}</span>
					</div>
				</div>
			</div>

            <!-- Title row with counters -->
            <div class="title-section">
                <div class="title-header">
                    <!-- Conditional rendering based on readonly -->
                    <template v-if="props.isReadonly">
                        <h1 class="inquiry-title">{{ inquiryStore.title }}</h1>
                    </template>
                    <template v-else>
                        <div class="title-field-container">
                            <NcTextField
                                    v-model="inquiryStore.title"
                                    :label="t('agora', 'Inquiry title')"
                                    :success="inquiryStore.title.length > 0"
                                    :helper-text="t('agora', 'Enter a descriptive title for your inquiry')"
                                    >
                                    <template #icon>
                                        <component :is="InquiryGeneralIcons.Edit" :size="20" />
                                    </template>
                            </NcTextField>
                        </div>
                    </template>
                </div>

                <!-- Counters section - ensure it's always displayed -->
                <div class="counters-section">
                    <div v-if="canCommentOnInquiry" class="counter-item">
                        <div class="counter-icon">
                            <component :is="InquiryGeneralIcons.Comment" :size="20" />
                        </div>
                        <div class="counter-content">
                            <NcCounterBubble :count="inquiryStore.status.countComments || 0" :raw="true" />
                            <span class="counter-label">{{ t('agora', 'Comments') }}</span>
                        </div>
                    </div>

                    <div v-if="canSupportInquiry" class="counter-item supports">
                        <SupportFeature
                                :item="inquiryStore"
                                item-type="inquiry"
                                :context="context"
                                :view-only="viewOnlySupportInquiry"
                                :show-quorum="true"
                                :show-details-on-hover="true"
                                :icon-size="20"
                                />
                    </div>
                </div>
            </div>
            <!-- Metadata section -->
            <div class="metadata-section">
                <h3 class="section-subtitle">{{ t('agora', 'INQUIRY DETAILS') }}</h3>
                <div class="metadata-grid">
                    <div class="metadata-item">
                        <div class="metadata-icon">
                            <component :is="InquiryGeneralIcons.Location" :size="18" />
                        </div>
                        <div class="metadata-content">
                            <span class="metadata-label">{{ t('agora', 'Location') }}</span>
                            <div v-if="!showLocationAsLabel" class="select-container">
                                <NcSelect
                                        v-model="selectedLocation"
                                        :options="hierarchicalLocation"
                                        :clearable="false"
                                        class="metadata-select"
                                        :input-label="t('agora','Locations')"
                                        required
                                        />
                            </div>
                            <span v-else class="metadata-value">
                                {{ getHierarchyPath(sessionStore.appSettings.locationTab, inquiryStore.locationId) || t('agora', 'Inherited from parent') }}
                            </span>
                        </div>
                    </div>

                    <div class="metadata-item">
                        <div class="metadata-icon">
                            <component :is="InquiryGeneralIcons.Category" :size="18" />
                        </div>
                        <div class="metadata-content">
                            <span class="metadata-label">{{ t('agora', 'Category') }}</span>
                            <div v-if="!showCategoryAsLabel" class="select-container">
                                <NcSelect
                                        v-model="selectedCategory"
                                        :options="hierarchicalCategory"
                                        :clearable="false"
                                        class="metadata-select"
                                        :input-label="t('agora','Categories')"
                                        required
                                        />
                            </div>
                            <span v-else class="metadata-value">
                                {{ getHierarchyPath(sessionStore.appSettings.categoryTab, inquiryStore.categoryId) || t('agora', 'Inherited from parent') }}
                            </span>
                        </div>
                    </div>

                    <div class="metadata-item">
                        <div class="metadata-icon">
                            <component :is="StatusIcons.Calendar" :size="18" />
                        </div>
                        <div class="metadata-content">
                            <span class="metadata-label">{{ t('agora', 'Created') }}</span>
                            <span class="metadata-value">{{ formatDate(inquiryStore.status.created) }}</span>
                        </div>
                    </div>

                    <div class="metadata-item">
                        <div class="metadata-icon">
                            <component :is="StatusIcons.Updated" :size="18" />
                        </div>
                        <div class="metadata-content">
                            <span class="metadata-label">{{ t('agora', 'Last interaction') }}</span>
                            <span class="metadata-value">{{ formatDate(inquiryStore.status.lastInteraction) }}</span>
                        </div>
                    </div>

                    <div class="metadata-item highlight">
                        <div class="metadata-icon">
                            <component :is="currentInquiryStatusIcon" :size="18" />
                        </div>
                        <div class="metadata-content">
                            <span class="metadata-label">{{ t('agora', 'Status') }}</span>
                            <template v-if="sessionStore.currentUser.isModerator">
                                <div class="select-container">
                                    <NcSelect
                                            v-model="selectedInquiryStatus"
                                            :options="statusInquiryOptions"
                                            :clearable="false"
                                            class="status-select"
                                            :input-label="t('agora','Status')"
                                            @update:model-value="onStatusChange"
                                            />
                                </div>
                            </template>
                            <template v-else>
                                <span class="metadata-value">{{ t('agora', currentInquiryStatusLabel) }}</span>
                            </template>
                        </div>
                    </div>

                    <div v-if="inquiryStore.configuration.expire" class="metadata-item">
                        <div class="metadata-icon">
                            <component :is="InquiryGeneralIcons.Expiration" :size="18" />
                        </div>
                        <div class="metadata-content">
                            <span class="metadata-label">{{ t('agora', 'Expires') }}</span>
                            <span class="metadata-value">{{ timeExpirationRelative }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Description section -->
            <div class="description-section">
                <div class="section-header-with-icon">
                    <div class="section-icon">
                        <component :is="InquiryGeneralIcons.Description" :size="24" />
                    </div>
                    <div>
                        <h3 class="section-subtitle">{{ t('agora', 'DESCRIPTION') }}</h3>
                        <p class="section-description">{{ t('agora', 'Detailed information about this inquiry') }}</p>
                    </div>
                </div>

                <div class="description-content">
                    <div
                            v-if="sessionStore.appSettings?.inquiryTypeRights[inquiryStore.type]?.editorType === 'wysiwyg'"
                            class="editor-container"
                            >
                            <InquiryEditor v-model="inquiryStore.description" :readonly="props.isReadonly" />
                    </div>

                        <div
                                v-else-if="sessionStore.appSettings?.inquiryTypeRights[inquiryStore.type]?.editorType === 'texteditor'"
                                class="editor-container"
                                >
                                <NcRichContenteditable
                                        v-model="inquiryStore.description"
                                        :autolink="true"
                                        :use-markdown="true"
                                        :emoji-autocomplete="true"
                                        :link-autocomplete="true"
                                        :multiline="true"
                                        :disabled="props.isReadonly"
                                        class="rich-text-editor"
                                        />
                        </div>

                            <div v-else class="editor-container">
                                <NcTextArea
                                        v-model="inquiryStore.description"
                                        :disabled="props.isReadonly"
                                        class="text-area-editor"
                                        :rows="8"
                                        />
                            </div>
                </div>
            </div>
        </div>

        <OptionEditView v-if="hasVisibleFamilies" :has-visible-families="hasVisibleFamilies"/>
    </div>
</template>

<style scoped lang="scss">
:root {
    --squareux-primary: #0078d4;
    --squareux-primary-light: #e1f5fe;
    --squareux-success: #107c10;
    --squareux-success-light: #dff6dd;
    --squareux-neutral-bg: #f3f2f1;
    --squareux-border: #edebe9;
    --squareux-card-shadow: 0 2.4px 7.2px rgba(0, 0, 0, .08), 0 0.2px 0.6px rgba(0, 0, 0, .04);
    --squareux-elevation-shadow: 0 6.4px 28.8px rgba(0, 0, 0, .12), 0 1.2px 3.6px rgba(0, 0, 0, .08);
}


.inquiry-edit-view {
    padding: 24px;
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
}


.main-content-section {
    background: linear-gradient(135deg, var(--color-main-background) 0%, var(--color-background-dark) 100%);
    border: 2px solid var(--color-border);
    border-radius: 24px;
    padding: 32px;
    margin-bottom: 32px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    position: relative; 
}

.section-id-badge {
    position: absolute;
    top: 16px;
    right: 24px; 
    z-index: 5;
    font-family: 'Monaco', 'Consolas', monospace;
    font-size: 13px;
    color: var(--color-text-lighter);
    background: var(--color-background-darker);
    padding: 6px 14px;
    border-radius: 20px;
    font-weight: 600;
    letter-spacing: 0.3px;
    border: 1px solid var(--color-border);
    box-shadow: var(--squareux-card-shadow);
    backdrop-filter: blur(4px);
    background-color: rgba(var(--color-background-darker-rgb), 0.9);
}

    @media (max-width: 768px) {
        .inquiry-edit-view {
            padding: 16px;
        }

        .main-content-section {
            padding: 24px;
        }

        .section-id-badge {
            top: 12px;
            right: 16px;  // ← Aussi corrigé ici
                padding: 4px 12px;
            font-size: 12px;
        }
    }


    .cover-image-section {
        position: relative;
        z-index: 1;
    }

    @media (max-width: 768px) {
        .inquiry-edit-view {
            padding: 16px;
        }

        .global-id-badge {
            top: 12px;
            right: 16px;
            padding: 4px 12px;
            font-size: 12px;
        }
    }

    .cover-image-section {
        position: relative;
        z-index: 1;
    }

    .cover-image-section {
        width: 100%;
        margin-bottom: 32px;
        border-radius: 24px;
        overflow: hidden;
        position: relative;
        transition: all 0.3s ease;

        &:not(.readonly) {
            cursor: pointer;
            border: 3px dashed var(--color-border);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

            &:hover {
                border-color: var(--color-primary);
                transform: translateY(-4px);
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);

                .cover-image-overlay {
                    opacity: 1;
                }
            }
        }
    }

    .cover-image-container {
        position: relative;
        width: 100%;
        height: 400px;

        .cover-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .cover-image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4));
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;

            .change-cover-btn {
                padding: 12px 24px;
                border-radius: 12px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
                background: var(--color-primary-element);
                border: 2px solid var(--color-primary-element);

                &:hover {
                    background: var(--color-primary-element-hover);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                }
            }
        }
    }

    .cover-image-placeholder {
        width: 100%;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, var(--color-background-dark), var(--color-background-darker));
        border-radius: 24px;
        transition: background-color 0.3s ease;

        &:hover {
            background: linear-gradient(135deg, var(--color-primary-light), var(--color-background-dark));
        }

        .placeholder-content {
            text-align: center;

            .placeholder-icon {
                color: var(--color-primary-element);
                margin-bottom: 16px;
            }

            .add-cover-btn {
                padding: 12px 24px;
                border-radius: 12px;
                font-weight: 600;
                background: var(--color-primary-element);
                border: 2px solid var(--color-primary-element);
                margin-bottom: 12px;

                &:hover {
                    background: var(--color-primary-element-hover);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
            }

            .placeholder-text {
                margin-top: 8px;
                color: var(--color-text-lighter);
                font-size: 14px;
                font-style: italic;
            }
        }
    }

    .hidden {
        display: none;
    }

    .main-content-section {
        background: linear-gradient(135deg, var(--color-main-background) 0%, var(--color-background-dark) 100%);
        border: 2px solid var(--color-border);
        border-radius: 24px;
        padding: 32px;
        margin-bottom: 32px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .user-info-section {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 32px;
        padding-bottom: 24px;
        border-bottom: 2px solid var(--color-border);

        .user-avatar {
            :deep(.avatardiv) {
                width: 56px;
                height: 56px;
                border: 3px solid var(--color-primary-light);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
        }

        .user-details {
            flex: 1;

            .user-name {
                font-size: 20px;
                font-weight: 700;
                margin-bottom: 8px;
                color: var(--color-main-text);
            }

            .inquiry-type-badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 8px 16px;
                background: linear-gradient(135deg, var(--color-primary-light), var(--color-background-dark));
                border: 2px solid var(--color-primary-element);
                border-radius: 16px;
                font-size: 14px;
                font-weight: 600;
                color: var(--color-primary-element);
            }
        }
    }

    // Title section with counters
.title-section {
    margin-bottom: 32px;
    padding-bottom: 24px;
    border-bottom: 2px solid var(--color-border);

    .title-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 24px;
        width: 100%;

        .title-field-container {
            flex: 1;
            min-width: 0;

            :deep(.nc-input) {
                width: 100%;

                .input-field {
                    margin-bottom: 0;

                    input {
                        font-size: 28px;
                        font-weight: 700;
                        padding: 12px 16px;
                        height: auto;
                        min-height: 56px;
                        width: 100%;
                        border: 2px solid transparent;
                        background: transparent;
                        transition: all 0.3s ease;
                        line-height: 1.3;

                        &:not(:disabled) {
                            border-color: var(--color-border);
                            background: var(--color-main-background);

                            &:hover {
                                border-color: var(--color-primary-element);
                            }

                            &:focus {
                                border-color: var(--color-primary-element);
                                box-shadow: 0 0 0 2px var(--color-primary-light);
                            }
                        }

                        &:disabled {
                            color: var(--color-main-text);
                            -webkit-text-fill-color: var(--color-main-text);
                            opacity: 1;
                            background: transparent;

                            &::placeholder {
                                color: transparent;
                            }
                        }
                    }

                    .input-field__icon {
                        color: var(--color-primary-element);
                        margin-left: 12px;

                        svg {
                            width: 20px;
                            height: 20px;
                        }
                    }

                    .input-field__label {
                        font-size: 12px;
                        font-weight: 600;
                        color: var(--color-text-lighter);
                        margin-left: 12px;
                        margin-bottom: 2px;
                    }

                    .input-field__helper-text {
                        margin-left: 12px;
                        margin-top: 2px;
                        font-size: 11px;
                        color: var(--color-text-lighter);
                    }
                }
            }
        }

        .inquiry-title {
            flex: 1;
            font-size: 32px;
            font-weight: 700;
            color: var(--color-main-text);
            margin: 0;
            line-height: 1.3;
            padding: 8px 0;
            word-break: break-word;
        }

        .inquiry-id {
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 13px;
            color: var(--color-text-lighter);
            background: var(--color-background-darker);
            padding: 4px 10px;
            border-radius: 20px;
            font-weight: 500;
            white-space: nowrap;
            letter-spacing: 0.3px;
            height: fit-content;
            line-height: 1.4;
            border: 1px solid var(--color-border);
        }
    }

    // Counters section - FIXED ALIGNMENT
    .counters-section {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 16px;
        margin-top: 16px;

        .counter-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 16px;
            background: var(--color-main-background);
            border: 2px solid var(--color-border);
            border-radius: 40px; // More pill-like shape
            transition: all 0.2s ease;
            min-width: 120px;
            flex: 0 1 auto;

            &:hover {
                border-color: var(--color-primary-element);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
            }

            &.supports {
                border-left: 3px solid var(--squareux-success);
                
                &:deep(.support-feature) {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    width: 100%;
                }
            }

            .counter-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 28px;
                height: 28px;
                background: var(--color-background-dark);
                border-radius: 50%;
                flex-shrink: 0;

                :deep(svg) {
                    width: 16px;
                    height: 16px;
                    color: var(--color-primary-element);
                }
            }

            .counter-content {
                display: flex;
                align-items: baseline;
                gap: 4px;
                flex-wrap: wrap;

                .counter-value {
                    font-size: 11px;
                    font-weight: 600;
                    color: var(--color-main-text);
                    line-height: 1.2;
                }

                .counter-label {
                    font-size: 10px;
                    color: var(--color-text-lighter);
                    font-weight: 400;
                    text-transform: uppercase;
                    letter-spacing: 0.3px;
                }
            }

            // Special styling for SupportFeature integration
            :deep(.support-feature) {
                display: flex;
                align-items: center;
                gap: 8px;
                width: 100%;

                .support-count {
                    font-size: 16px;
                    font-weight: 700;
                    color: var(--color-main-text);
                }

                .support-label {
                    font-size: 13px;
                    color: var(--color-text-lighter);
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 0.3px;
                }

                .support-icon {
                    width: 28px;
                    height: 28px;
                    background: var(--color-background-dark);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    svg {
                        width: 16px;
                        height: 16px;
                        color: var(--color-primary-element);
                    }
                }
            }
        }
    }
}

// Mobile responsiveness
@media (max-width: 768px) {
    .title-section {
        .title-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;

            .title-field-container {
                width: 100%;

                :deep(.nc-input) {
                    .input-field {
                        input {
                            font-size: 24px;
                            padding: 10px 12px;
                            min-height: 48px;
                        }

                        .input-field__icon svg {
                            width: 18px;
                            height: 18px;
                        }
                    }
                }
            }

            .inquiry-title {
                font-size: 26px;
                width: 100%;
            }

            .inquiry-id {
                align-self: flex-start;
                font-size: 12px;
                padding: 3px 8px;
            }
        }

        .counters-section {
            flex-direction: column;
            width: 100%;
            gap: 12px;

            .counter-item {
                width: 100%;
                min-width: auto;
                justify-content: flex-start;
            }
        }
    }
}

// Small mobile devices
@media (max-width: 480px) {
    .title-section {
        .counters-section {
            .counter-item {
                padding: 8px 12px;
                
                .counter-content {
                    .counter-value {
                        font-size: 14px;
                    }
                    
                    .counter-label {
                        font-size: 12px;
                    }
                }
                
                :deep(.support-feature) {
                    .support-count {
                        font-size: 14px;
                    }
                    
                    .support-label {
                        font-size: 12px;
                    }
                }
            }
        }
    }
}
    // Mobile responsiveness
@media (max-width: 768px) {
        .title-section {
            .title-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;

                .title-field-container {
                    width: 100%;

                    :deep(.nc-input) {
                        .input-field {
                            input {
                                font-size: 24px;
                                padding: 10px 12px;
                                min-height: 48px;
                            }

                            .input-field__icon svg {
                                width: 18px;
                                height: 18px;
                            }
                        }
                    }
                }

                .inquiry-title {
                    font-size: 26px;
                    width: 100%;
                }

                .inquiry-id {
                    align-self: flex-start;
                    font-size: 12px;
                    padding: 3px 8px;
                }
            }

            .counters-section {
                flex-direction: column;
                width: 100%;
                gap: 12px;

                .counter-item {
                    width: 100%;
                    min-width: auto;
                }
            }
        }
    }

    .metadata-section {
        margin-bottom: 32px;
        background: white;
        border: 1px solid var(--squareux-border);
        border-radius: 4px;
        padding: 24px;
        box-shadow: var(--squareux-card-shadow);

        .section-subtitle {
            font-size: 12px;
            color: #605e5c;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 20px;
            font-weight: 600;
            padding-bottom: 12px;
            border-bottom: 1px solid var(--squareux-border);
        }

        .metadata-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 16px;

            .metadata-item {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 16px;
                background: white;
                border: 1px solid var(--squareux-border);
                border-radius: 2px;
                transition: all 0.2s ease;

                &:hover {
                    background: #faf9f8;
                    border-color: var(--squareux-primary);
                    box-shadow: var(--squareux-card-shadow);
                }

                &.highlight {
                    background: #e1f5fe;
                    border-left: 3px solid var(--squareux-primary);
                }

                .metadata-icon {
                    width: 32px;
                    height: 32px;
                    background: #f3f2f1;
                    border-radius: 2px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    margin-top: 2px;

                    &:deep(svg) {
                        color: var(--squareux-primary);
                    }
                }

                .metadata-content {
                    flex: 1;
                    min-width: 0;

                    .metadata-label {
                        display: block;
                        font-size: 11px;
                        color: #605e5c;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin-bottom: 6px;
                        font-weight: 600;
                        white-space: nowrap;
                    }

                    .metadata-value {
                        display: block;
                        font-size: 14px;
                        color: #323130;
                        font-weight: 400;
                        line-height: 1.4;
                        word-break: break-word;
                    }

                    .select-container {
                        width: 100%;

                        .metadata-select,
                        .status-select {
                            width: 100%;

                            :deep(.v-select) {
                                .vs__dropdown-toggle {
                                    border: 1px solid var(--squareux-border);
                                    border-radius: 2px;
                                    padding: 6px 8px;
                                    background: white;
                                    min-height: 32px;
                                    font-size: 14px;

                                    &:hover {
                                        border-color: var(--squareux-primary);
                                    }
                                }

                                .vs__selected {
                                    font-weight: 400;
                                    color: #323130;
                                    font-size: 14px;
                                    line-height: 1.4;
                                    padding: 0;
                                }

                                .vs__search,
                                .vs__search:focus {
                                    font-size: 14px;
                                    padding: 0;
                                    margin: 0;
                                    min-height: auto;
                                }

                                .vs__dropdown-menu {
                                    border: 1px solid var(--squareux-border);
                                    border-radius: 2px;
                                    margin-top: 4px;
                                    box-shadow: var(--squareux-card-shadow);
                                    max-height: 280px;
                                }

                                .vs__dropdown-option {
                                    padding: 8px 12px;
                                    font-size: 14px;

                                    &--highlight {
                                        background: #e1f5fe;
                                        color: #323130;
                                    }
                                }
                            }
                        }

                        .status-select {
                            :deep(.v-select) {
                                .vs__dropdown-toggle {
                                    background: #e1f5fe;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .description-section {
        background: white;
        border: 1px solid var(--squareux-border);
        border-radius: 4px;
        padding: 24px;
        box-shadow: var(--squareux-card-shadow);

        .section-header-with-icon {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 20px;
            padding-bottom: 16px;
            border-bottom: 1px solid var(--squareux-border);

            .section-icon {
                width: 40px;
                height: 40px;
                background: var(--squareux-primary);
                border-radius: 2px;
                display: flex;
                align-items: center;
                justify-content: center;

                &:deep(svg) {
                    color: white;
                }
            }

            h3.section-subtitle {
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 4px;
                color: #323130;
            }

            .section-description {
                font-size: 12px;
                color: #605e5c;
                margin: 0;
                font-weight: 400;
            }
        }

        .description-content {
            border: 1px solid var(--squareux-border);
            border-radius: 2px;
            background: white;
            min-height: 200px;
            overflow: hidden;
            transition: border-color 0.2s ease;

            &:hover {
                border-color: var(--squareux-primary);
            }

            .editor-container {
                width: 100%;
                border: none;
                border-radius: 0;

                &:deep(.ProseMirror) {
                    min-height: 200px;
                    padding: 16px;
                    font-size: 14px;
                    line-height: 1.5;
                    color: #323130;

                    &:focus {
                        outline: none;
                    }
                }
            }

            .rich-text-editor,
            .text-area-editor {
                width: 100%;
                border: none;
                border-radius: 0;
                min-height: 200px;
                padding: 16px;
                font-size: 14px;
                line-height: 1.5;
                color: #323130;
                background: white;
                font-family: inherit;
                resize: vertical;
                transition: border-color 0.2s ease;

                &:focus {
                    outline: none;
                }

                &:disabled {
                    background: #faf9f8;
                    color: #a19f9d;
                }
            }

            .rich-text-editor {
                &:deep(.ProseMirror) {
                    padding: 0;
                }
            }
        }
    }

    /* Keep original dropdown styling for other sections */
    .metadata-section .metadata-grid .metadata-item {
        .metadata-content {
            .select-container {
                .metadata-select,
                .status-select {
                    :deep(.v-select) {
                        .vs__dropdown-toggle {
                            border: 2px solid var(--color-border);
                            border-radius: 12px;
                            padding: 8px 12px;
                            background: var(--color-main-background);
                            min-height: 40px;

                            &:hover {
                                border-color: var(--color-primary-element);
                            }
                        }

                        .vs__selected {
                            font-weight: 600;
                            color: var(--color-main-text);
                            font-size: 14px;
                            line-height: 1.4;
                            white-space: normal;
                            word-break: break-word;
                        }

                        .vs__search,
                        .vs__search:focus {
                            font-size: 14px;
                            padding: 0;
                            margin: 0;
                            line-height: 1.4;
                            min-height: auto;
                        }

                        .vs__dropdown-menu {
                            border: 2px solid var(--color-border);
                            border-radius: 12px;
                            margin-top: 4px;
                            max-height: 300px;
                            overflow-y: auto;
                            width: auto;
                            min-width: 100%;
                        }

                        .vs__dropdown-option {
                            padding: 8px 12px;
                            font-size: 14px;
                            line-height: 1.4;

                            &--highlight {
                                background: var(--color-primary-light);
                                color: var(--color-primary-element);
                            }
                        }

                        .vs__actions {
                            align-self: center;
                        }
                    }
                }
            }
        }
    }

    /* Keep original media queries for dropdowns */
    @media (min-width: 768px) {
        .metadata-section .metadata-grid {
            .metadata-item {
                &:has(.select-container) {
                    grid-column: span 2;
                    min-height: 100px;

                    .metadata-content {
                        .select-container {
                            .metadata-select,
                            .status-select {
                                :deep(.v-select) {
                                    .vs__dropdown-toggle {
                                        min-width: 100%;
                                    }

                                    .vs__dropdown-menu {
                                        min-width: 100%;
                                        width: 100%;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    /* Keep original media queries for other elements */
    @media (max-width: 1024px) {
        .inquiry-edit-view {
            padding: 16px;
        }

        .main-content-section {
            padding: 24px;
        }

        .title-section .counters-section {
            flex-wrap: wrap;
        }

        .metadata-section .metadata-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (max-width: 768px) {
        .title-section {
            .title-header {
                flex-direction: column;
                align-items: flex-start;
                gap: 12px;

                .inquiry-title {
                    font-size: 24px;
                }
            }
        }

        .user-info-section {
            flex-direction: column;
            text-align: center;
            gap: 16px;

            .user-details .user-name {
                text-align: center;
            }
        }

        .cover-image-container {
            height: 300px;
        }

        .cover-image-placeholder {
            height: 150px;
        }

        .counter-item {
            width: 100%;
            justify-content: space-between;
        }

        .description-content {
            .rich-text-editor,
            .text-area-editor,
            .editor-container:deep(.ProseMirror) {
                padding: 16px;
                min-height: 200px;
            }
        }
    }

    @media (max-width: 767px) {
        .metadata-section .metadata-grid {
            .metadata-item {
                &:has(.select-container) {
                    min-height: 100px;

                    .metadata-content {
                        .select-container {
                            .metadata-select,
                            .status-select {
                                :deep(.v-select) {
                                    .vs__dropdown-toggle {
                                        min-width: 100%;
                                    }

                                    .vs__dropdown-menu {
                                        min-width: calc(100vw - 80px);
                                        max-width: calc(100vw - 80px);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @media (min-width: 1024px) {
        .metadata-section .metadata-grid {
            grid-template-columns: repeat(2, 1fr);

            .metadata-item {
                &:has(.select-container) {
                    grid-column: span 1;
                    min-height: 100px;

                    .metadata-content {
                        .select-container {
                            .metadata-select,
                            .status-select {
                                :deep(.v-select) {
                                    .vs__dropdown-toggle {
                                        min-width: 100%;
                                    }

                                    .vs__dropdown-menu {
                                        min-width: 100%;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @media (min-width: 1400px) {
        .metadata-section .metadata-grid {
            grid-template-columns: repeat(3, 1fr);

            .metadata-item {
                &:has(.select-container) {
                    grid-column: span 1;

                    .metadata-content {
                        .select-container {
                            .metadata-select,
                            .status-select {
                                :deep(.v-select) {
                                    .vs__dropdown-toggle {
                                        min-width: 100%;
                                    }

                                    .vs__dropdown-menu {
                                        min-width: 100%;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    @media (max-width: 480px) {
        .main-content-section {
            padding: 20px;
        }

        .title-section .counters-section {
            flex-direction: column;
        }
    }
</style>
