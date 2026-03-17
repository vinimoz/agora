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
                <p>{{ t('agora', 'Loading option details …') }}</p>
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
                                <div class="fields-grid">
                                    <div
                                        v-for="field in additionalFields"
                                        :key="field.key"
                                        class="field-item"
                                    >
                                        
                                        <!-- Text field -->
                                        <NcTextField
                                            v-if="field.type === 'text' || field.type === 'string'"
                                            :id="`field-${field.key}`"
                                            :model-value="miscFields.getValue(field.key) ?? ''"
                                            type="text"
                                            :placeholder="field.placeholder || ''"
                                            :label="getFieldLabel(field)"
                                            full-width
                                            @update:model-value="(val) => miscFields.updateValue(field.key, val, field.type)"
                                        />

                                        <!-- Number / Integer -->
                                        <NcTextField
                                            v-else-if="field.type === 'number' || field.type === 'integer'"
                                            :id="`field-${field.key}`"
                                            :model-value="miscFields.getValue(field.key) ?? ''"
                                            type="number"
                                            :placeholder="field.placeholder || ''"
                                            :label="getFieldLabel(field)"
                                            full-width
                                            @update:model-value="(val) => miscFields.updateValue(field.key, val, field.type)"
                                        />

                                        <!-- Boolean (switch) -->
                                        <div v-else-if="field.type === 'boolean'" class="checkbox-field">
                                            <NcCheckboxRadioSwitch
                                                :id="`field-${field.key}`"
                                                type="switch"
                                                :checked="miscFields.getCheckboxValue(field.key)"
                                                :label="getFieldLabel(field)"
                                                @update:checked="(val) => miscFields.updateValue(field.key, val, field.type)"
                                            >
                                                {{ field.label || field.key }}
                                            </NcCheckboxRadioSwitch>
                                        </div>

                                        <!-- Textarea -->
                                        <NcTextArea
                                            v-else-if="field.type === 'textarea'"
                                            :id="`field-${field.key}`"
                                            :model-value="miscFields.getValue(field.key) ?? ''"
                                            :placeholder="field.placeholder || ''"
                                            :rows="3"
                                            :label="getFieldLabel(field)"
                                            full-width
                                            @update:model-value="(val) => miscFields.updateValue(field.key, val, field.type)"
                                        />

                                        <!-- JSON -->
                                        <NcTextArea
                                            v-else-if="field.type === 'json'"
                                            :id="`field-${field.key}`"
                                            :model-value="miscFields.getValue(field.key) ?? ''"
                                            :placeholder="field.placeholder || t('agora', 'Enter JSON data')"
                                            :rows="3"
                                            :label="getFieldLabel(field)"
                                            full-width
                                            @update:model-value="(val) => {
                                                try {
                                                    const parsed = val ? JSON.parse(val) : null;
                                                    miscFields.updateValue(field.key, parsed, field.type);
                                                } catch {
                                                    miscFields.updateValue(field.key, val, field.type);
                                                }
                                            }"
                                        />

                                        <!-- Enum / Select -->
                                        <NcSelect
                                            v-else-if="field.type === 'enum' || field.type === 'select'"
                                            :id="`field-${field.key}`"
                                            :model-value="miscFields.getValue(field.key) ?? ''"
                                            :options="field.allowed_values || []"
                                            :reduce="(option: any) => option"
                                            :clearable="true"
                                            :placeholder="t('Select an option')"
                                            :label="getFieldLabel(field)"
                                            :input-label="getFieldLabel(field)"
                                            full-width
                                            @update:model-value="(val) => miscFields.updateValue(field.key, val, field.type)"
                                        />

                                        <!-- Datetime -->
                                        <NcDateTimePickerNative
                                            v-else-if="field.type === 'datetime'"
                                            :id="`field-${field.key}`"
                                            :model-value="getFormattedDateSimple(field.key) ?? ''"
                                            type="date"
                                            :placeholder="field.placeholder || t('Select date')"
                                            :label="getFieldLabel(field)"
                                            :clearable="true"
                                            full-width
                                            @update:model-value="(val) => handleDateTimeUpdateSimple(field.key, val)"
                                        />

                                        <!-- Users -->
                                        <UserSearch
                                            v-else-if="field.type === 'users'"
                                            :id="`field-${field.key}`"
                                            :model-value="getUserObjectForField(field.key)"
                                            :search-types="[99]"
                                            :placeholder="t('Type to search for users')"
                                            :aria-label="getFieldLabel(field)"
                                            :close-on-select="true"
                                            @user-selected="(user) => handleUserSelected(field.key, user)"
                                        />

                                        <!-- Groups -->
                                        <UserSearch
                                            v-else-if="field.type === 'groups'"
                                            :id="`field-${field.key}`"
                                            :model-value="getGroupObjectForField(field.key)"
                                            :search-types="[1]"
                                            :placeholder="t('Type to search for groups')"
                                            :aria-label="getFieldLabel(field)"
                                            :close-on-select="true"
                                            @user-selected="(group) => handleGroupSelected(field.key, group)"
                                        />

                                        <!-- Location -->
                                        <NcSelect
                                            v-else-if="field.type === 'location'"
                                            :id="`field-${field.key}`"
                                            :model-value="getSelectedLocationOption(field.key)"
                                            :options="locationOptions"
                                            :clearable="true"
                                            :label="getFieldLabel(field)"
                                            :input-label="getFieldLabel(field)"
                                            :placeholder="t('Select location')"
                                            full-width
                                            @update:model-value="(val) => handleHierarchicalUpdate(val, 'location', miscFields.updateValue, field.key)"
                                        />

                                        <!-- Category -->
                                        <NcSelect
                                            v-else-if="field.type === 'category'"
                                            :id="`field-${field.key}`"
                                            :model-value="getSelectedCategoryOption(field.key)"
                                            :options="categoryOptions"
                                            :clearable="true"
                                            :label="getFieldLabel(field)"
                                            :input-label="getFieldLabel(field)"
                                            :placeholder="t('Select category')"
                                            full-width
                                            @update:model-value="(val) => handleHierarchicalUpdate(val, 'category', miscFields.updateValue, field.key)"
                                        />

                                        <!-- Default fallback -->
                                        <NcTextField
                                            v-else
                                            :id="`field-${field.key}`"
                                            :model-value="miscFields.getValue(field.key)"
                                            type="text"
                                            :placeholder="field.placeholder || ''"
                                            :label="getFieldLabel(field)"
                                            full-width
                                            @update:model-value="(val) => miscFields.updateValue(field.key, val, 'string')"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-else class="content-display">
                            <div v-if="optionStore.text" class="text-content">
                                <div class="text-text">{{ optionStore.text }}</div>
                            </div>

                            <!-- Additional fields display in view mode -->
                            <div v-if="hasAdditionalFieldsData" class="additional-fields-display">
                                <h4>{{ t('agora', 'Additional Information') }}</h4>
                                <div class="fields-grid">
                                    <div
                                        v-for="field in additionalFields"
                                        :key="field.key"
                                        class="field-item-display"
                                    >
                                        <strong>{{ getFieldLabel(field) }}:</strong>
                                        <span>{{ miscFields.formatForDisplay(field.key) }}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Feature buttons -->
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
    <AddOptionModal
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
import NcTextField from '@nextcloud/vue/components/NcTextField'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import NcRichContenteditable from '@nextcloud/vue/components/NcRichContenteditable'
import NcNoteCard from '@nextcloud/vue/components/NcNoteCard'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcDateTimePickerNative from '@nextcloud/vue/components/NcDateTimePickerNative'
import NcTextArea from '@nextcloud/vue/components/NcTextArea'
import UserSearch from '../User/UserSearch.vue'
import { DateTime } from 'luxon'
import Pencil from 'vue-material-design-icons/Pencil.vue'

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

// Import MiscFields helper
import { 
    useMiscFields, 
    getFieldLabel as getMiscFieldLabel,
    formatValueForStorage,
    getHierarchicalOptions,
    handleHierarchicalUpdate,
    type MiscField 
} from '../../helpers/modules/MiscFieldsHelper'

// Import components
import Comments from '../Comments/Comments.vue'
import CommentAdd from '../Comments/CommentAdd.vue'
import AddOptionModal from './AddOptionModal.vue'

// Types
import type { Option, User } from '../../Types/index.ts'
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
const commentUpdateTrigger = ref(0)

// State for user/group selections
const selectedUsers = ref<Record<string, User | null>>({})
const selectedGroups = ref<Record<string, User | null>>({})

// Toggle submenu
const toggleSubMenu = (menu: string | null = null) => {
    subMenu.value = subMenu.value === menu ? null : menu
}

// Get all option types from session store
const allOptionTypes = computed(() => sessionStore.appSettings?.inquiryOptionTypeTab || [])

// Get additional fields as MiscField type
const additionalFields = computed<MiscField[]>(() => 
    getOptionTypeFields(optionStore.type, allOptionTypes.value) as MiscField[]
)

// Initialize misc fields handler
const miscFields = useMiscFields(
    additionalFields,
    optionStore,
    computed(() => optionStore.miscFields || {}),
    {
        locationItems: computed(() => sessionStore.appSettings.locationTab || []),
        categoryItems: computed(() => sessionStore.appSettings.categoryTab || [])
    }
)

// Computed for location/category options
const locationOptions = computed(() => getHierarchicalOptions(
        sessionStore.appSettings.locationTab || [], 
        t('Select location')
    ))

const categoryOptions = computed(() => getHierarchicalOptions(
        sessionStore.appSettings.categoryTab || [], 
        t('Select category')
    ))

// Get selected option for location/category
const getSelectedLocationOption = (fieldKey: string) => {
    const value = miscFields.getValue(fieldKey)
    if (!value) return null
    return locationOptions.value.find(opt => String(opt.value) === String(value)) || null
}

const getSelectedCategoryOption = (fieldKey: string) => {
    const value = miscFields.getValue(fieldKey)
    if (!value) return null
    return categoryOptions.value.find(opt => String(opt.value) === String(value)) || null
}

// Computed properties from helpers
const optionTypeLabel = computed(() =>
    getOptionTypeLabel(optionStore.type, allOptionTypes.value, t('agora', 'Option'))
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

const hasAdditionalFieldsData = computed(() => Object.keys(miscFields.values.value).length > 0)

// Filtered child options
const filteredChildOptions = computed(() => {
    if (!activeFilter.value) return childOptions.value
    return childOptions.value.filter(child => child.type === activeFilter.value)
})

// Methods
const formatDate = (timestamp: number) =>
    DateTime.fromMillis(timestamp * 1000).toLocaleString(DateTime.DATE_SHORT)

const getFieldLabel = (field: MiscField) => getMiscFieldLabel(field)

const getOptionTypeDescription = (type: string) => getOptionTypeDescriptionHelper(type, allOptionTypes.value)

const getOptionTypeIcon = (type: string) => getOptionTypeIconComponent(type, allOptionTypes.value)

const getOptionTypeLabel = (type: string) => getOptionTypeLabelHelper(type, allOptionTypes.value, type)

const loadOption = async () => {
    if (!props.optionId) return
    isLoading.value = true
    error.value = null
    
    try {
        await optionStore.load(props.optionId)
        if (optionStore) {
            editForm.value = {
                title: optionStore.title || '',
                text: optionStore.text || ''
            }
            // Reinitialize misc fields with loaded data
            miscFields.reinitialize()
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
    miscFields.clearTimeouts()
    setTimeout(() => {
        emit('close')
    }, 300)
}

const editOption = () => {
    isEditing.value = true
}

const cancelEdit = () => {
    isEditing.value = false
    if (optionStore) {
        editForm.value = {
            title: optionStore.title || '',
            text: optionStore.text || ''
        }
        miscFields.reinitialize()
    }
}

const saveEdit = async () => {
    if (!optionStore || !canSaveEdit.value) return

    try {
        // Format misc fields for saving
        const miscFieldsForStorage: Record<string, string> = {}
        additionalFields.value.forEach(field => {
            const value = miscFields.values.value[field.key]
            if (value !== undefined && value !== null && value !== '') {
                miscFieldsForStorage[field.key] = formatValueForStorage(value, field.type)
            }
        })

        const updatedOption = await optionStore.update({
            id: props.optionId,
            title: editForm.value.title,
            text: editForm.value.text,
            miscFields: miscFieldsForStorage
        })

        isEditing.value = false
        emit('updated', updatedOption)
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

// UserSearch methods
const getUserObjectForField = (fieldKey: string): User | null => {
    const value = miscFields.getValue(fieldKey)
    if (!value) return null
    
    if (selectedUsers.value[fieldKey]?.id === value) {
        return selectedUsers.value[fieldKey]
    }
    
    return {
        id: String(value),
        displayName: String(value),
        userRole: 'member'
    } as User
}

const handleUserSelected = (fieldKey: string, user: User | null) => {
    const valueToStore = user?.id || ''
    selectedUsers.value[fieldKey] = user
    miscFields.updateValue(fieldKey, valueToStore, 'users')
}

const getGroupObjectForField = (fieldKey: string): User | null => {
    const value = miscFields.getValue(fieldKey)
    if (!value) return null
    
    if (selectedGroups.value[fieldKey]?.id === value) {
        return selectedGroups.value[fieldKey]
    }
    
    return {
        id: String(value),
        displayName: String(value),
        userRole: 'group'
    } as User
}

const handleGroupSelected = (fieldKey: string, group: User | null) => {
    const valueToStore = group?.id || ''
    selectedGroups.value[fieldKey] = group
    miscFields.updateValue(fieldKey, valueToStore, 'groups')
}

// DateTime methods
const getFormattedDateSimple = (key: string): Date | null => {
    const value = miscFields.getValue(key)
    if (!value || typeof value !== 'string') return null

    try {
        const year = parseInt(value.substring(0,4))
        const month = parseInt(value.substring(5,7)) - 1
        const day = parseInt(value.substring(8,10))
        const hours = parseInt(value.substring(11,13)) || 0
        const minutes = parseInt(value.substring(14,16)) || 0
        
        return new Date(year, month, day, hours, minutes)
    } catch {
        return null
    }
}

const handleDateTimeUpdateSimple = (fieldKey: string, value: Date | null) => {
    let storageValue = ''
    if (value instanceof Date && !isNaN(value.getTime())) {
        const year = value.getFullYear()
        const month = String(value.getMonth() + 1).padStart(2, '0')
        const day = String(value.getDate()).padStart(2, '0')
        const hours = String(value.getHours()).padStart(2, '0')
        const minutes = String(value.getMinutes()).padStart(2, '0')
        
        storageValue = `${year}-${month}-${day} ${hours}:${minutes}`
    }
    
    miscFields.updateValue(fieldKey, storageValue, 'datetime')
}

// Lifecycle
onMounted(() => {
    loadOption()
})

onUnmounted(() => {
    miscFields.clearTimeouts()
})

watch(() => props.optionId, (newId) => {
    if (newId) {
        loadOption()
        commentUpdateTrigger.value = 0
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
        
        commentUpdateTrigger.value = commentUpdateTrigger.value + 1
    }
}, { deep: true })

const handleCommentAdded = () => {
    commentUpdateTrigger.value = commentUpdateTrigger.value + 1

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
        commentUpdateTrigger.value = commentUpdateTrigger.value + 1
        emit('updated', { ...optionStore })
    }
}
</script>

<style scoped lang="scss">
.option-actions-menu {
    position: relative;
}

.response-count-badge {
    margin-left: auto;
    background: var(--color-primary-element);
    color: var(--color-primary-text);
    border-radius: 12px;
    padding: 2px 8px;
    font-size: 0.85em;
    font-weight: 600;
    min-width: 24px;
    text-align: center;
}

/* Make sure the action button has enough width */
:deep(.nc-action-button) {
    min-width: 240px;
}

/* Style the description text to show properly */
:deep(.nc-action-button__description) {
    color: var(--color-text-maxcontrast);
    font-size: 0.9em;
    opacity: 0.8;
    line-height: 1.3;
    margin-top: 2px;
}

/* Children hover icons section */
.children-hover-icons {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
    margin-bottom: 16px;
    border-bottom: 1px solid var(--color-border);

    .hover-icon-group {
        position: relative;

        .hover-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            background: var(--color-background-dark);
            border: 2px solid var(--color-border);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;

            svg {
                width: 16px;
                height: 16px;
                color: var(--color-text-lighter);
                transition: color 0.2s ease;
            }

            &:hover {
                transform: translateY(-2px);
                border-color: var(--color-primary-element);
                background: var(--color-primary-light);

                svg {
                    color: var(--color-primary-element);
                }
            }

            &.has-children {
                border-color: var(--color-primary-element);
                background: var(--color-primary-light);

                svg {
                    color: var(--color-primary-element);
                }

                .child-count-badge {
                    background: var(--color-primary-element);
                    color: var(--color-primary-text);
                }
            }

            .child-count-badge {
                position: absolute;
                top: -6px;
                right: -6px;
                min-width: 16px;
                height: 16px;
                background: var(--color-background-darker);
                border: 2px solid var(--color-main-background);
                border-radius: 10px;
                font-size: 9px;
                font-weight: 600;
                color: var(--color-text-light);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 3px;
            }
        }
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(-5px);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}

/* Submenu container - appears at right */
.response-submenu-container {
    position: absolute;
    left: 100%;
    top: 0;
    margin-left: 8px;
    background: var(--color-main-background);
    border-radius: var(--border-radius-large);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--color-border);
    width: 320px;
    z-index: 1000;
    animation: slideInRight 0.2s ease-out;
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(-10px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Submenu header */
.response-submenu-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--color-border-light);
    background: var(--color-background-dark);
    border-radius: var(--border-radius-large) var(--border-radius-large) 0 0;
}

.response-submenu-header h4 {
    margin: 0 0 4px 0;
    font-weight: 600;
    color: var(--color-text-light);
}

.response-submenu-header p {
    margin: 0;
    font-size: 0.9em;
    color: var(--color-text-maxcontrast);
}

/* Vignettes grid */
.response-vignettes {
    padding: 12px;
    display: grid;
    gap: 8px;
}

/* Individual vignette */
.response-vignette {
    padding: 12px !important;
    border-radius: var(--border-radius) !important;
    border: 1px solid var(--color-border) !important;
    background: var(--color-background-hover) !important;
    transition: all 0.2s ease !important;
    width: 100% !important;
    text-align: left !important;
}

.response-vignette:hover {
    background: var(--color-background-dark) !important;
    border-color: var(--color-primary-element) !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Vignette content layout */
.vignette-content {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
}

/* Vignette icon */
.vignette-icon {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-primary-element);
    color: var(--color-primary-text);
    border-radius: var(--border-radius);
}

/* Vignette text */
.vignette-text {
    flex: 1;
    min-width: 0;
}

.vignette-text strong {
    display: block;
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--color-text-light);
}

.vignette-description {
    margin: 0;
    font-size: 0.85em;
    color: var(--color-text-maxcontrast);
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Count badge */
.vignette-count {
    flex-shrink: 0;
    align-self: flex-start;
}

.count-badge {
    background: var(--color-primary-element);
    color: var(--color-primary-text);
    border-radius: 12px;
    padding: 4px 10px;
    font-size: 0.85em;
    font-weight: 600;
    min-width: 24px;
    text-align: center;
    display: inline-block;
}

/* Toggle button styling */
.add-response-toggle {
    position: relative;
}

/* Arrow indicator */
.add-response-toggle::after {
    content: '';
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid currentColor;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    opacity: 0.5;
}

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

            :deep(.response-count-badge) {
                background: var(--color-background-darker);
                padding: 2px 6px;
                border-radius: 10px;
                font-size: 11px;
                font-weight: 600;
                margin-left: 6px;
                color: var(--color-text-light);
            }
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

                    .fields-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                        gap: 16px;
                    }
                }

                .edit-actions {
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
                    margin-top: 20px;
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
                    h4 {
                        margin: 0 0 16px 0;
                        font-size: 16px;
                        font-weight: 600;
                        color: var(--color-main-text);
                    }

                    .fields-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                        gap: 16px;
                        background: var(--color-background-dark);
                        border: 1px solid var(--color-border);
                        border-radius: 12px;
                        padding: 20px;

                        .field-item-display {
                            display: flex;
                            flex-direction: column;
                            gap: 4px;

                            strong {
                                font-size: 14px;
                                color: var(--color-text-light);
                            }

                            span {
                                font-size: 14px;
                                color: var(--color-main-text);
                                word-break: break-word;
                            }
                        }
                    }
                }

                /* Feature buttons container with owner aligned to right */
                .feature-buttons-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 24px;
                    padding-top: 24px;
                    border-top: 1px solid var(--color-border);
                    width: 100%;

                    .features-left {
                        display: flex;
                        align-items: center;
                        gap: 32px;
                        flex-shrink: 0;
                    }

                    .feature-group {
                        display: flex;
                        align-items: center;
                        gap: 12px;

                        .support-container {
                            display: flex;
                            align-items: center;
                            gap: 8px;

                            .support-icon-large {
                                cursor: pointer;
                                color: var(--color-text-light);
                                transition: color 0.2s ease;

                                &:hover {
                                    color: var(--color-primary-element);
                                }
                            }
                        }

                        .support-count-display {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            gap: 2px;

                            .support-count-number {
                                font-size: 16px;
                                font-weight: 600;
                                color: var(--color-main-text);
                            }

                            .support-count-label {
                                font-size: 11px;
                                color: var(--color-text-lighter);
                                text-transform: uppercase;
                            }
                        }

                        .comment-container {
                            display: flex;
                            align-items: center;
                            gap: 8px;

                            .comment-count-badge {
                                display: flex;
                                align-items: center;
                                gap: 4px;
                                padding: 4px 8px;
                                background: var(--color-background-dark);
                                border-radius: 8px;
                                font-size: 14px;
                                font-weight: 600;
                                color: var(--color-text-lighter);
                            }

                            .add-comment-btn {
                                display: flex;
                                align-items: center;
                                gap: 4px;
                            }
                        }
                    }

                    /* Owner section on the right */
                    .owner-section-right {
                        flex-shrink: 0;
                        margin-left: auto;

                        .owner-details-right {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            padding: 8px 12px;
                            background: var(--color-background-dark);
                            border-radius: 12px;
                            border: 1px solid var(--color-border);
                            max-width: 300px;

                            .owner-text {
                                display: flex;
                                flex-direction: column;
                                gap: 2px;

                                .owner-name {
                                    font-size: 12px;
                                    font-weight: 600;
                                    color: var(--color-main-text);
                                }
                            }
                        }
                    }
                }

                @media (max-width: 768px) {
                    .feature-buttons-container {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 16px;

                        .features-left {
                            width: 100%;
                            justify-content: space-between;
                            gap: 16px;
                        }

                        .owner-section-right {
                            margin-left: 0;
                            width: 100%;

                            .owner-details-right {
                                max-width: 100%;
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }

        /* Children section - using OptionCard */
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

            .filter-controls {
                margin-bottom: 16px;
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

                    // Inline cards in column layout
                    :deep(.option-card.inline) {
                        width: 100%;
                        margin-bottom: 0;
                        // Subtle styling to distinguish from main cards
                        background: var(--color-background-dark);
                        border-width: 1px;

                        &:hover {
                            background: var(--color-background-hover);
                            border-color: var(--color-primary-element);
                        }
                    }
                }
            }
        }

        /* Responsive adjustments for children grid */
        @media (min-width: 768px) {
            .children-section {
                .children-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 8px;

                    :deep(.option-card.inline) {
                        // Cards will stretch to fill grid cells
                        height: 100%;
                    }
                }
            }
        }

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
}

// Fade transition for comment form
.fade-enter-ctive,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@media (max-width: 768px) {
    .option-detail-modal {
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
                            }
                        }
                    }
                }

                .editor-container {
                    .fields-grid {
                        grid-template-columns: 1fr;
                    }
                }

                .content-display {
                    .additional-fields-display {
                        .fields-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                }
            }

            .children-section {
                .children-grid {
                    grid-template-columns: 1fr;
                }
            }
        }
    }
}
.clear-filter-btn {
    margin-left: auto;
}
</style>
