<!--
    SPDX-FileCopyrightText: 2024 Nextcloud contributors
    SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
    <NcModal
        v-if="show && optionId"
        :name="modalTitle"
        size="large"
        @close="closeModal"
    >
        <div class="option-detail-modal">
            <!-- Loading state -->
            <div v-if="isLoading" class="loading-state">
                <NcLoadingIcon :size="48" />
                <p>{{ t('agora', 'Loading option details …') }}</p>
            </div>

            <!-- Error state -->
            <div v-else-if="error" class="error-state">
                <NcNoteCard type="error">
                    {{ error }}
                </NcNoteCard>
                <NcButton @click="loadOption">
                    {{ t('agora', 'Retry') }}
                </NcButton>
            </div>

            <!-- Content -->
            <div v-else-if="optionStore.id !== 0" class="modal-content">
                <!-- Header with option type and actions -->
                <div class="modal-header">
                    <div class="header-left">
                        <div class="option-type-indicator" :style="{ color: optionTypeColor }">
                            <component :is="optionIcon" :size="24" />
                        </div>
                        <div class="header-text">
                            <h2 class="option-title">{{ optionStore.title || optionStore.label }}</h2>
                            <div class="option-meta">
                                <span class="option-type">{{ optionTypeLabel }}</span>
                                <span class="option-date">{{ formatDate(optionStore.status.created) }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="header-right">
                        <!-- Edit/Save/Cancel buttons -->
                        <template v-if="!isEditing">
                            <NcButton v-if="canEdit" @click="editOption">
                                <template #icon>
                                    <Pencil :size="20" />
                                </template>
                                {{ t('agora', 'Edit') }}
                            </NcButton>
                        </template>
                        <template v-else>
                            <NcButton @click="cancelEdit">
                                {{ t('agora', 'Cancel') }}
                            </NcButton>
                            <NcButton type="primary" :disabled="!canSaveEdit" @click="saveEdit">
                                {{ t('agora', 'Save') }}
                            </NcButton>
                        </template>

                        <!-- Main actions menu -->
                        <NcActions
                            v-if="canEditOrDelete || hasAllowedResponses"
                            :force-menu="true"
                            :aria-label="t('agora', 'Option actions')"
                        >
                            <!-- Add Response toggle button -->
                            <NcActionButton
                                v-if="hasAllowedResponses"
                                is-menu
                                :name="t('agora', 'Add Response')"
                                @click="toggleSubMenu('addResponse')"
                            >
                                <template #icon>
                                    <component :is="InquiryOptionIcons.Plus" :size="20" />
                                </template>
                            </NcActionButton>

                            <!-- Response types submenu -->
                            <template v-if="subMenu === 'addResponse'">
                                <NcActionButton
                                    v-for="responseType in availableResponseTypes"
                                    :key="responseType.option_type"
                                    :close-after-click="true"
                                    :name="responseType.label"
                                    :description="getOptionTypeDescription(responseType.option_type)"
                                    @click="openAddResponseModal(responseType.option_type); subMenu = null"
                                >
                                    <template #icon>
                                        <component :is="getOptionTypeIcon(responseType.option_type)" :size="20" />
                                    </template>
                                </NcActionButton>
                            </template>

                            <!-- Delete action -->
                            <NcActionButton
                                v-if="canDelete"
                                :close-after-click="true"
                                @click="confirmDelete"
                            >
                                <template #icon>
                                    <component :is="InquiryOptionIcons.Delete" :size="20" />
                                </template>
                                {{ t('agora', 'Delete') }}
                            </NcActionButton>
                        </NcActions>
                    </div>
                </div>

                <!-- Main content area -->
                <div class="main-content">
                    <!-- Option text/content -->
                    <div class="content-section">
                        <div v-if="isEditing" class="editor-container">
                            <NcRichContenteditable
                                v-if="useTitle"
                                v-model="editForm.title"
                                :emoji-autocomplete="true"
                                :link-autocomplete="true"
                                :autolink="true"
                                :use-markdown="true"
                                :label="t('agora', 'Title')"
                                :placeholder="t('agora', 'Enter option title')"
                                full-width
                            />
                            <NcRichContenteditable
                                v-model="editForm.text"
                                :label="t('agora', 'Description')"
                                :placeholder="t('agora', 'Enter option text')"
                                :emoji-autocomplete="true"
                                :link-autocomplete="true"
                                :autolink="true"
                                :use-markdown="true"
                                :maxlength="400"
                                required
                                :multiline="true"
                                full-width
                            />

                            <!-- Additional fields in edit mode -->
                            <div v-if="hasAdditionalFields" class="additional-fields">
                                <h4>{{ t('agora', 'Additional Information') }}</h4>
                                <MiscFieldsEditor
                                    :fields="additionalFields"
                                    :initial-values="miscFieldsValues"
                                    :editable="true"
                                    :option-id="optionStore.id"
                                    :inquiry-id="inquiryId"
                                    :location-items="sessionStore.appSettings?.locationTab || []"
                                    :category-items="sessionStore.appSettings?.categoryTab || []"
                                    :users="sessionStore.appSettings?.users || {}"
                                    :options="optionsStore.options"
                                    :inquiries="sessionStore.appSettings?.inquiries || []"
                                    @update="handleMiscFieldsUpdate"
                                />
                            </div>
                        </div>

                        <div v-else class="content-display">
                            <div v-if="optionStore.text" class="text-content">
                                <div class="text-text">{{ optionStore.text }}</div>
                            </div>

                            <!-- Additional fields display in view mode -->
                            <div v-if="hasAdditionalFieldsData" class="additional-fields-display">
                                <h4>{{ t('agora', 'Additional Information') }}</h4>
                                <MiscFieldsEditor
                                    :key="optionStore.id + '-' + JSON.stringify(optionStore.miscFields)"  
                                    :fields="additionalFields"
                                    :initial-values="optionStore.miscFields || {}"
                                    :editable="false"
                                    :location-items="sessionStore.appSettings?.locationTab || []"
                                    :category-items="sessionStore.appSettings?.categoryTab || []"
                                    :users="sessionStore.appSettings?.users || {}"
                                    :options="optionsStore.options"
                                    :inquiries="sessionStore.appSettings?.inquiries || []"
                                />                     
                            </div>

                            <!-- Feature buttons container - Fixed alignment -->
                            <div class="feature-buttons-container">
                                <!-- Left side: Support and comment features -->
                                <div class="features-left">
                                    <!-- Support feature -->
                                    <div v-if="hasSupportFeature" class="feature-group">
                                        <SupportFeature
                                            :item="optionStore"
                                            item-type="option"
                                            :context="optionContext"
                                            :show-quorum="true"
                                            :show-details-on-hover="true"
                                            :icon-size="14"
                                        />
                                    </div>

                                    <!-- Comment features -->
                                    <div v-if="allowComment" class="feature-group">
                                        <div class="comment-container">
                                            <div class="comment-count-badge">
                                                <component :is="InquiryOptionIcons.Comment" :size="16" />
                                                <span>{{ optionStore.status.countComments || 0 }}</span>
                                            </div>
                                            <NcButton
                                                type="tertiary"
                                                class="add-comment-btn"
                                                @click="showCommentForm = !showCommentForm"
                                            >
                                                <template #icon>
                                                    <component :is="showCommentForm ? InquiryOptionIcons.Close : InquiryOptionIcons.Comment" :size="16" />
                                                </template>
                                                {{ showCommentForm ? t('agora', 'Cancel') : t('agora', 'Add comment') }}
                                            </NcButton>
                                        </div>
                                    </div>
                                </div>

                                <!-- Right side: Owner section -->
                                <div class="owner-section-right">
                                    <div class="owner-details-right">
                                        <NcAvatar
                                            v-if="optionStore.owner?.id"
                                            :user="optionStore.owner.id"
                                            :display-name="optionStore.owner.displayName"
                                            :size="22"
                                        />
                                        <div class="owner-text">
                                            <span class="owner-name">{{ optionStore.owner?.displayName || t('agora', 'Unknown owner') }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Child options display -->
                    <div v-if="hasChildOptions" class="children-section">
                        <div class="section-header">
                            <h3>{{ t('agora', 'Child Options') }}</h3>
                        </div>
                        <div class="children-list">
                            <div v-if="filteredChildOptions.length === 0" class="empty-children">
                                <component :is="InquiryOptionIcons.MessageText" :size="48" />
                                <h4>{{ t('agora', 'No child options yet') }}</h4>
                                <p>{{ t('agora', 'Child options will appear here when created') }}</p>
                            </div>

                            <div v-else class="children-grid">
                                <OptionCard
                                    v-for="child in filteredChildOptions"
                                    :key="child.id"
                                    :option="child"
                                    :inquiry-id="inquiryId"
                                    :compact="false"
                                    :inline="true"
                                    @click="openChildModal(child.id)"
                                    @comment="handleChildComment"
                                    @delete="handleChildDeleted"
                                    @updated="handleChildUpdated"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Comments section -->
                    <div ref="commentsSection" class="comments-section">
                        <!-- Comment form -->
                        <transition name="fade">
                            <div v-if="showCommentForm" class="comment-form">
                                <CommentAdd
                                    :inquiry-id="inquiryId"
                                    :option-id="optionId"
                                    @comment-added="handleCommentAdded"
                                />
                            </div>
                        </transition>

                        <!-- Comments list -->
                        <div v-if="optionStore.status.countComments > 0" class="comments-list">
                            <Comments
                                :inquiry-only="false"
                                :option-id="optionId"
                                @comment-count-updated="handleCommentCountUpdated"
                            />
                        </div>

                        <div v-else-if="!showCommentForm" class="no-comments">
                            <component :is="InquiryOptionIcons.Comment" :size="48" />
                            <h4>{{ t('agora', 'No comments yet') }}</h4>
                            <p>{{ t('agora', 'Start the discussion') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NcModal>

    <!-- Child modal -->
    <OptionDetailModal
        v-if="showChildModal"
        :option-id="selectedChildId"
        :inquiry-id="inquiryId"
        @close="closeChildModal"
        @updated="handleChildUpdated"
        @deleted="handleChildDeleted"
    />

    <!-- Add child modal -->
    <OptionAddModal
        v-if="showAddChildModal"
        :inquiry-id="inquiryId"
        :option-type="selectedChildType"
        :parent-id="optionStore?.id"
        @close="closeAddChildModal"
        @created="handleChildCreated"
    />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { t } from '@nextcloud/l10n'
import NcModal from '@nextcloud/vue/components/NcModal'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import NcActions from '@nextcloud/vue/components/NcActions'
import NcActionButton from '@nextcloud/vue/components/NcActionButton'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import NcRichContenteditable from '@nextcloud/vue/components/NcRichContenteditable'
import NcNoteCard from '@nextcloud/vue/components/NcNoteCard'
import { DateTime } from 'luxon'
import Pencil from 'vue-material-design-icons/Pencil.vue'
import MiscFieldsEditor from './MiscFieldsEditor.vue'

import { useCommentsStore } from '../../stores/comments'
import { useOptionsStore } from '../../stores/options'
import { useOptionStore } from '../../stores/option'
import { useSessionStore } from '../../stores/session'
import { InquiryOptionIcons } from '../../utils/icons.ts'
import SupportFeature from '../../helpers/modules/SupportFeature.vue'
import OptionCard from './OptionCard.vue'
import {
    getOptionTypeLabel as getOptionTypeLabelHelper,
    getOptionTypeIconComponent,
    getOptionTypeColor,
    getOptionTypeDescription as getOptionTypeDescriptionHelper,
    getAllowedResponses,
    getAvailableResponseTypes,
    getOptionTypeFields,
    hasSupportFeature as hasSupportFeatureHelper,
    allowsComments,
    usesTitle
} from '../../helpers/modules/InquiryOptionHelper'

// Import components
import Comments from '../Comments/Comments.vue'
import CommentAdd from '../Comments/CommentAdd.vue'
import OptionAddModal from './OptionAddModal.vue'

// Types
import type { Option, MiscField } from '../../Types/index.ts'
import {
    createOptionContext,
    canEditOption,
    canDeleteOption,
} from '../../utils/permissions.ts'

// Props
const props = defineProps<{
    optionId: number | null
    inquiryId: number
}>()

// Emits
const emit = defineEmits<{
    close: []
    updated: [option: Option]
    deleted: [optionId: number]
}>()

// Stores
const optionsStore = useOptionsStore()
const optionStore = useOptionStore()
const sessionStore = useSessionStore()
const commentsStore = useCommentsStore()

// State
const show = ref(true)
const isLoading = ref(false)
const error = ref<string | null>(null)
const showCommentForm = ref(false)
const isEditing = ref(false)
const editForm = ref({
    title: '',
    text: ''
})
const showChildModal = ref(false)
const selectedChildId = ref<number | null>(null)
const showAddChildModal = ref(false)
const selectedChildType = ref<string | null>(null)
const subMenu = ref<string | null>(null)
const commentsSection = ref<HTMLElement | null>(null)
const activeFilter = ref<string | null>(null)
const miscFieldsValues = ref<Record<string, MiscField>>({})

// Get all option types from session store
const allOptionTypes = computed(() => sessionStore.appSettings?.inquiryOptionTypeTab || [])

// Get additional fields as MiscField type - filter out special fields
const SPECIAL_FIELDS = ['force_layouts']

const additionalFields = computed<MiscField[]>(() => {
    const fields = getOptionTypeFields(optionStore.type, allOptionTypes.value) as MiscField[]
    // Filter out special fields that shouldn't be displayed in misc fields editor
    return fields.filter(field => !SPECIAL_FIELDS.includes(field.key))
})

// Handle misc fields updates from editor
const handleMiscFieldsUpdate = (values: Record<string, MiscField>) => {
    miscFieldsValues.value = { ...values }
}

// Computed properties from helpers
const optionTypeLabel = computed(() =>
    getOptionTypeLabelHelper(optionStore.type, allOptionTypes.value, t('agora', 'Option'))
)

const optionIcon = computed(() =>
    getOptionTypeIconComponent(optionStore.type, allOptionTypes.value)
)

const optionTypeColor = computed(() =>
    getOptionTypeColor(optionStore.type, allOptionTypes.value)
)

const allowComment = computed(() =>
    allowsComments(optionStore.type, allOptionTypes.value)
)

const hasSupportFeature = computed(() =>
    hasSupportFeatureHelper(optionStore.type, allOptionTypes.value)
)

const useTitle = computed(() =>
    usesTitle(optionStore.type, allOptionTypes.value)
)

const allowedResponses = computed(() => {
    if (!optionStore?.type || isLoading.value) {
        return []
    }
    return getAllowedResponses(optionStore.type, allOptionTypes.value)
})

const hasAllowedResponses = computed(() => allowedResponses.value.length > 0)

const availableResponseTypes = computed(() =>
    getAvailableResponseTypes(optionStore.type, allOptionTypes.value)
)

// Create context once as computed
const optionContext = computed(() => {
    if (!optionStore) return null
    return createOptionContext(optionStore)
})

// Permission checks as computed properties
const canEdit = computed(() => canEditOption(optionContext.value))
const canDelete = computed(() => canDeleteOption(optionContext.value))

// Computed properties
const modalTitle = computed(() => optionStore.title || t('agora', 'Option Details'))

const canEditOrDelete = computed(() => canEdit.value || canDelete.value)

const canSaveEdit = computed(() => editForm.value.text.trim().length > 0)

// Get actual child options
const childOptions = computed(() => {
    if (!optionStore?.id) return []
    return optionsStore.options.filter(opt => opt.parentId === optionStore.id)
})

const hasChildOptions = computed(() => childOptions.value.length > 0)

const hasAdditionalFields = computed(() => additionalFields.value.length > 0)

const hasAdditionalFieldsData = computed(() => {
    if (!optionStore.miscFields) return false
    // Check if there are any non-special fields with values
    return Object.keys(optionStore.miscFields).some(key => 
        !SPECIAL_FIELDS.includes(key) && optionStore.miscFields?.[key] !== undefined && optionStore.miscFields[key] !== null && optionStore.miscFields[key] !== ''
    )
})

// Filtered child options
const filteredChildOptions = computed(() => {
    if (!activeFilter.value) return childOptions.value
    return childOptions.value.filter(child => child.type === activeFilter.value)
})

// Methods
const formatDate = (timestamp: number) =>
    DateTime.fromMillis(timestamp * 1000).toLocaleString(DateTime.DATE_SHORT)

const getOptionTypeDescription = (type: string) => getOptionTypeDescriptionHelper(type, allOptionTypes.value)

const getOptionTypeIcon = (type: string) => getOptionTypeIconComponent(type, allOptionTypes.value)

const loadOption = async () => {
    if (!props.optionId) return
    isLoading.value = true
    error.value = null

    try {
        await optionStore.load(props.optionId)
        if (optionStore) {
            // Initialize edit form with current values
            editForm.value = {
                title: optionStore.title || '',
                text: optionStore.text || ''
            }
            
            // Initialize misc fields values with proper defaults
            const currentMiscFields = optionStore.miscFields || {}
            const initializedMiscFields: Record<string, MiscField> = {}
            
            // Set default values for all fields that have defaults
            additionalFields.value.forEach(field => {
                // Use existing value if present, otherwise use default
                if (currentMiscFields[field.key] !== undefined && currentMiscFields[field.key] !== null) {
                    initializedMiscFields[field.key] = currentMiscFields[field.key]
                } else if (field.default !== undefined && field.default !== null && field.default !== '') {
                    initializedMiscFields[field.key] = field.default
                } else {
                    // Initialize with appropriate empty value based on type
                    switch (field.type) {
                        case 'boolean':
                            initializedMiscFields[field.key] = false
                            break
                        case 'integer':
                        case 'number':
                            initializedMiscFields[field.key] = null
                            break
                        case 'json':
                            initializedMiscFields[field.key] = {}
                            break
                        default:
                            initializedMiscFields[field.key] = ''
                    }
                }
            })
            
            miscFieldsValues.value = initializedMiscFields
            
        } else {
            error.value = t('agora', 'Error loading option store')
        }
    } catch (err) {
        console.error('Error loading option:', err)
        error.value = t('agora', 'Failed to load option details')
    } finally {
        isLoading.value = false
    }
}

const closeModal = () => {
    show.value = false
    setTimeout(() => {
        emit('close')
    }, 300)
}

const editOption = () => {
    isEditing.value = true
}

const cancelEdit = () => {
    isEditing.value = false
    // Reset to original values
    if (optionStore) {
        editForm.value = {
            title: optionStore.title || '',
            text: optionStore.text || ''
        }
        // Reset misc fields to original values
        const originalMiscFields: Record<string, MiscField> = {}
        additionalFields.value.forEach(field => {
            if (optionStore.miscFields?.[field.key] !== undefined) {
                originalMiscFields[field.key] = optionStore.miscFields[field.key]
            } else if (field.default !== undefined && field.default !== null && field.default !== '') {
                originalMiscFields[field.key] = field.default
            }
        })
        miscFieldsValues.value = originalMiscFields
    }
}

const saveEdit = async () => {
    if (!optionStore || !canSaveEdit.value) return

    try {
        // Prepare misc fields for storage - only include fields that have values
        const miscFieldsForStorage: Record<string, string> = {}
        additionalFields.value.forEach(field => {
            const value = miscFieldsValues.value[field.key]
            // Only save if value is not empty/undefined/null
            if (value !== undefined && value !== null && value !== '') {
                // Convert to string for storage based on type
                let stringValue = ''
                if (field.type === 'boolean') {
                    stringValue = value ? 'true' : 'false'
                } else if (field.type === 'json') {
                    stringValue = typeof value === 'object' ? JSON.stringify(value) : String(value)
                } else if (field.type === 'datetime' || field.type === 'date' ) {
                    stringValue = value instanceof Date ? value.toISOString() : String(value)
                } else {
                    stringValue = String(value)
                }
                miscFieldsForStorage[field.key] = stringValue
            }
        })

        // Preserve special fields (start_date, end_date, force_layouts) if they exist
        if (optionStore.miscFields) {
            SPECIAL_FIELDS.forEach(field => {
                if (optionStore.miscFields?.[field] !== undefined) {
                    miscFieldsForStorage[field] = optionStore.miscFields[field]
                }
            })
        }

        const updatedOption = await optionStore.update({
            id: props.optionId,
            title: editForm.value.title,
            text: editForm.value.text,
            miscFields: miscFieldsForStorage
        })

        isEditing.value = false
        emit('updated', updatedOption)
        
        // Reload to refresh view
        await loadOption()
    } catch (err) {
        console.error('Error saving edit:', err)
        error.value = t('agora', 'Failed to save changes')
    }
}

const confirmDelete = () => {
    if (confirm(t('agora', 'Are you sure you want to delete this option?'))) {
        deleteOption()
    }
}

const deleteOption = async () => {
    if (!optionStore) return

    try {
        await optionStore.delete(optionStore.id)

        const index = optionsStore.options.findIndex(opt => opt.id === optionStore?.id)
        if (index >= 0) {
            optionsStore.options.splice(index, 1)
        }

        emit('deleted', optionStore.id)
        closeModal()
    } catch (err) {
        console.error('Error deleting option:', err)
        error.value = t('agora', 'Failed to delete option')
    }
}

const toggleSubMenu = (menu: string | null = null) => {
    subMenu.value = subMenu.value === menu ? null : menu
}

const handleChildComment = (option: Option) => {
    openChildModal(option.id)
}

const openAddResponseModal = (responseType: string) => {
    if (!responseType) {
        console.error('Cannot open modal: responseType is undefined or empty')
        return
    }
    selectedChildType.value = responseType
    showAddChildModal.value = true
}

const closeAddChildModal = () => {
    showAddChildModal.value = false
    selectedChildType.value = null
}

const handleChildCreated = (newChild: Option) => {
    optionsStore.options.push(newChild)
    closeAddChildModal()
    loadOption() // Refresh option to update child counts
}

const openChildModal = (childId: number) => {
    selectedChildId.value = childId
    showChildModal.value = true
}

const closeChildModal = () => {
    showChildModal.value = false
    selectedChildId.value = null
}

const handleChildUpdated = (updatedChild: Option) => {
    const index = optionsStore.options.findIndex(opt => opt.id === updatedChild.id)
    if (index >= 0) {
        optionsStore.options[index] = updatedChild
    }
}

const handleChildDeleted = (deletedChildId: number) => {
    const index = optionsStore.options.findIndex(opt => opt.id === deletedChildId)
    if (index >= 0) {
        optionsStore.options.splice(index, 1)
    }
    loadOption() // Refresh current option to update child counts
}

const handleCommentAdded = () => {
    if (optionStore.id) {
        const count = commentsStore.comments.filter(
            comment => comment.inquiryId === props.inquiryId &&
                      comment.optionId === optionStore.id &&
                      comment.deleted === 0
        ).length

        optionsStore.updateOptionCommentCount(optionStore.id, count)

        if (optionStore.status) {
            optionStore.status.countComments = count
        }
    }

    showCommentForm.value = false

    if (commentsSection.value) {
        commentsSection.value.scrollIntoView({ behavior: 'smooth' })
    }
}

const handleCommentCountUpdated = (newCount: number) => {
    if (optionStore) {
        optionStore.status.countComments = newCount
        emit('updated', { ...optionStore })
    }
}

// Lifecycle
onMounted(() => {
    loadOption()
})

onUnmounted(() => {
    // Cleanup if needed
})

watch(() => props.optionId, (newId) => {
    if (newId) {
        loadOption()
    }
}, { immediate: true })

watch(() => commentsStore.comments, (newComments) => {
    if (optionStore.id) {
        const count = newComments.filter(
            comment => comment.inquiryId === props.inquiryId && 
                      comment.optionId === optionStore.id && 
                      comment.deleted === 0
        ).length

        optionsStore.updateOptionCommentCount(optionStore.id, count)

        if (optionStore.status) {
            optionStore.status.countComments = count
        }
    }
}, { deep: true })
</script>

<style scoped lang="scss">
.option-detail-modal {
    display: flex;
    flex-direction: column;
    height: 80vh;
    max-height: 800px;

    .loading-state,
    .error-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        padding: 40px;
        text-align: center;

        p {
            margin-top: 16px;
            color: var(--color-text-lighter);
        }
    }

    .modal-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow: hidden;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;
        border-bottom: 1px solid var(--color-border);
        background: var(--color-main-background);
        flex-shrink: 0;

        .header-left {
            display: flex;
            align-items: center;
            gap: 16px;
            flex: 1;
            min-width: 0;

            .option-type-indicator {
                flex-shrink: 0;
                width: 48px;
                height: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--color-background-darker);
                border-radius: 10px;
            }

            .header-text {
                flex: 1;
                min-width: 0;

                .option-title {
                    margin: 0 0 4px 0;
                    font-size: 20px;
                    font-weight: 700;
                    color: var(--color-main-text);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .option-meta {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 14px;
                    color: var(--color-text-lighter);

                    .option-type {
                        background: var(--color-background-dark);
                        padding: 2px 8px;
                        border-radius: 8px;
                        font-weight: 600;
                    }
                }
            }
        }

        .header-right {
            display: flex;
            align-items: center;
            gap: 12px;
        }
    }

    .main-content {
        flex: 1;
        overflow-y: auto;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 32px;

        .content-section {
            .editor-container {
                display: flex;
                flex-direction: column;
                gap: 20px;
                padding: 20px;
                background: var(--color-background-dark);
                border-radius: 12px;
                border: 1px solid var(--color-border);

                .additional-fields {
                    margin-top: 20px;
                    padding-top: 20px;
                    border-top: 1px solid var(--color-border);

                    h4 {
                        margin: 0 0 16px 0;
                        font-size: 16px;
                        font-weight: 600;
                        color: var(--color-main-text);
                    }
                }
            }

            .content-display {
                .text-content {
                    margin-bottom: 24px;

                    .text-text {
                        font-size: 16px;
                        line-height: 1.6;
                        color: var(--color-main-text);
                        white-space: pre-wrap;
                    }
                }

                .additional-fields-display {
                    margin-bottom: 24px;

                    h4 {
                        margin: 0 0 20px 0;
                        font-size: 16px;
                        font-weight: 600;
                        color: var(--color-main-text);
                        display: flex;
                        align-items: center;
                        gap: 8px;

                        &::before {
                            content: '';
                            width: 3px;
                            height: 20px;
                            background: var(--color-primary-element);
                            border-radius: 2px;
                        }
                    }
                }

                /* Feature buttons container - FIXED ALIGNMENT */
                .feature-buttons-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    gap: 16px;
                    padding: 16px 0;
                    border-top: 1px solid var(--color-border-light);
                    border-bottom: 1px solid var(--color-border-light);

                    .features-left {
                        display: flex;
                        align-items: center;
                        gap: 24px;
                        flex-wrap: wrap;

                        .feature-group {
                            display: flex;
                            align-items: center;
                        }
                    }

                    .owner-section-right {
                        .owner-details-right {
                            display: flex;
                            align-items: center;
                            gap: 12px;
                            padding: 8px 12px;
                            background: var(--color-background-dark);
                            border-radius: 24px;

                            .owner-text {
                                .owner-name {
                                    font-size: 13px;
                                    font-weight: 500;
                                    color: var(--color-text-light);
                                }
                            }
                        }
                    }
                }
            }
        }

        /* Comment container alignment fix */
        .comment-container {
            display: flex;
            align-items: center;
            gap: 12px;

            .comment-count-badge {
                display: flex;
                align-items: center;
                gap: 4px;
                background: var(--color-background-darker);
                padding: 4px 8px;
                border-radius: 16px;
                font-size: 12px;
                font-weight: 500;
                color: var(--color-text-light);
            }
        }

        /* Children section */
        .children-section {
            .section-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;

                h3 {
                    margin: 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: var(--color-main-text);
                }
            }

            .children-list {
                .empty-children {
                    text-align: center;
                    padding: 40px 20px;
                    background: var(--color-background-dark);
                    border: 2px dashed var(--color-border);
                    border-radius: 16px;

                    svg {
                        color: var(--color-text-lighter);
                        margin-bottom: 16px;
                    }

                    h4 {
                        margin: 0 0 8px 0;
                        color: var(--color-main-text);
                        font-size: 16px;
                    }

                    p {
                        margin: 0;
                        color: var(--color-text-lighter);
                        font-style: italic;
                    }
                }

                .children-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;

                    @media (min-width: 768px) {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                        gap: 8px;

                        :deep(.option-card.inline) {
                            height: 100%;
                        }
                    }
                }
            }
        }

        /* Comments section */
        .comments-section {
            .comment-form {
                margin-bottom: 24px;
                padding: 20px;
                background: var(--color-background-dark);
                border-radius: 12px;
                border: 1px solid var(--color-border);
            }

            .no-comments {
                text-align: center;
                padding: 40px 20px;
                background: var(--color-background-dark);
                border: 2px dashed var(--color-border);
                border-radius: 16px;

                svg {
                    color: var(--color-text-lighter);
                    margin-bottom: 16px;
                }

                h4 {
                    margin: 0 0 8px 0;
                    color: var(--color-main-text);
                    font-size: 16px;
                }

                p {
                    margin: 0;
                    color: var(--color-text-lighter);
                    font-style: italic;
                }
            }
        }
    }

    // Fade transition for comment form
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }

    @media (max-width: 768px) {
        height: 90vh;

        .modal-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;

            .header-left {
                width: 100%;
            }

            .header-right {
                width: 100%;
                justify-content: space-between;
            }
        }

        .main-content {
            padding: 16px;

            .content-section {
                .content-display {
                    .feature-buttons-container {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 16px;

                        .features-left {
                            width: 100%;
                            justify-content: space-between;
                        }

                        .owner-section-right {
                            width: 100%;

                            .owner-details-right {
                                max-width: 100%;
                                width: 100%;
                                justify-content: center;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
