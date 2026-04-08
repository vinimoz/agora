<!--
    SPDX-FileCopyrightText: 2024 Nextcloud contributors
    SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
    <div class="misc-fields-editor">
        <div v-if="fields.length === 0" class="no-fields">
            <p>{{ t('agora', 'No additional fields for this option type') }}</p>
        </div>

        <div v-else-if="!editable" class="view-mode">
            <div class="fields-grid view-grid">
                <div
                    v-for="field in fields"
                    :key="field.key"
                    class="field-card"
                    :class="{ 'inline-field': field.key === 'priority' || field.key === 'due_date' }"
                >
                    <div class="field-header">
                        <span class="field-icon" :style="{ backgroundColor: getFieldColor(field) }">
                            <component :is="getFieldIcon(field.type)" :size="12" />
                        </span>
                        <span class="field-label">{{ getFieldLabel(field) }}</span>
                    </div>
                    <div class="field-value" :class="getValueClass(field.key, field.type)">
                        {{ formatDisplayValue(field) }}
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="edit-mode">
            <div class="fields-grid edit-grid">
                <div
                    v-for="field in fields"
                    :key="field.key"
                    class="field-item"
                >
                    <label :for="`field-${field.key}`" class="field-label-edit">
                        {{ getFieldLabel(field) }}
                        <span v-if="field.required" class="required">*</span>
                        <span class="field-type-badge">({{ field.type }})</span>
                    </label>

                    <!-- Text field -->
                    <NcRichContenteditable
                        v-if="field.type === 'text' || field.type === 'string'"
                        :id="`field-${field.key}`"
                        :model-value="getSafeStringValue(field.key)"
                        :autolink="true"
                        :use-markdown="true"
                        :emoji-autocomplete="true"
                        :link-autocomplete="true"
                        :placeholder="field.placeholder || ''"
                        :required="field.required"
                        full-width
                        @update:model-value="(val) => updateValue(field.key, val, field.type)"
                    />

                    <SearchSelect
                        v-else-if="field.type === 'option'"
                        :model-value="getSafeSelectValue(field.key)"
                        type="options"
                        :placeholder="field.placeholder || t('Search for an option…')"
                        clearable
                        @selected="(opt) => updateValue(field.key, opt, field.type)"
                    />

                    <SearchSelect
                        v-else-if="field.type === 'inquiry'"
                        :model-value="getSafeSelectValue(field.key)"
                        type="inquiries"
                        :placeholder="field.placeholder || t('Search for an inquiry…')"
                        clearable
                        @selected="(opt) => updateValue(field.key, opt, field.type)"
                    />

                    <!-- Textarea -->
                    <NcTextArea
                        v-else-if="field.type === 'textarea'"
                        :id="`field-${field.key}`"
                        :model-value="getSafeStringValue(field.key)"
                        :placeholder="field.placeholder || ''"
                        :rows="3"
                        :required="field.required"
                        full-width
                        @update:model-value="(val) => updateValue(field.key, val, field.type)"
                    />

                    <!-- Boolean (switch) -->
                    <div v-else-if="field.type === 'boolean'" class="checkbox-field">
                        <NcCheckboxRadioSwitch
                            :id="`field-${field.key}`"
                            type="switch"
                            :checked="getBooleanValue(field.key)"
                            @update:checked="(val) => updateValue(field.key, val, field.type)"
                        />
                        <label :for="`field-${field.key}`">{{ field.label || field.key }}</label>
                    </div>

                    <!-- Number / Integer - FIXED: handle null values -->
                    <NcTextField
                        v-else-if="field.type === 'number' || field.type === 'integer'"
                        :id="`field-${field.key}`"
                        :model-value="getSafeNumberString(field.key)"
                        type="number"
                        :label="getFieldLabel(field)"
                        :placeholder="field.placeholder || ''"
                        :required="field.required"
                        full-width
                        @update:model-value="(val) => updateNumberValue(field.key, val, field.type)"
                    />

                    <!-- JSON -->
                    <div v-else-if="field.type === 'json'">
                        <NcTextArea
                            :id="`field-${field.key}`"
                            :model-value="getJsonString(field.key)"
                            :placeholder="field.placeholder || t('Enter JSON data')"
                            :rows="3"
                            :required="field.required"
                            full-width
                            @update:model-value="(val) => {
                                try {
                                    const parsed = val ? JSON.parse(val) : null;
                                    updateValue(field.key, parsed, field.type);
                                } catch {
                                    updateValue(field.key, val, field.type);
                                }
                            }"
                        />
                        <div class="field-hint">
                            {{ t('Enter valid JSON data (e.g., {"key": "value"})') }}
                        </div>
                    </div>

                    <!-- Enum / Select -->
                    <NcSelect
                        v-else-if="field.type === 'enum'"
                        :id="`field-${field.key}`"
                        :model-value="getSelectedEnumValue(field)"
                        :options="getEnumOptions(field)"
                        :clearable="!field.required"
                        :placeholder="field.placeholder || t('Select an option')"
                        :required="field.required"
                        :label-outside="true"
                        :input-label="getFieldLabel(field)"
                        full-width
                        @update:model-value="(val) => updateValue(field.key, val?.value || '', field.type)"
                    />

                    <!-- Datetime -->
                    <div v-else-if="field.type === 'datetime'">
                        <NcDateTimePickerNative
                            :id="`field-${field.key}`"
                            :model-value="getDateTimeValue(field.key)"
                            type="date"
                            :placeholder="field.placeholder || t('Select date and time')"
                            :required="field.required"
                            :label="getFieldLabel(field)"
                            :clearable="!field.required"
                            full-width
                            @update:model-value="(val) => handleDateTimeUpdate(field.key, val)"
                        />
                    </div>

                    <!-- Users -->
                    <div v-else-if="field.type === 'users'" class="user-field-container">
                        <UserSearch
                            :id="`field-${field.key}`"
                            :model-value="getUserObjectForField(field.key)"
                            :search-types="[99]"
                            :placeholder="field.placeholder || t('Type to search for users')"
                            :aria-label="getFieldLabel(field)"
                            :close-on-select="true"
                            @user-selected="(user) => handleUserSelected(field.key, user)"
                        />
                    </div>

                    <!-- Groups -->
                    <div v-else-if="field.type === 'groups'" class="user-field-container">
                        <UserSearch
                            :id="`field-${field.key}`"
                            :model-value="getGroupObjectForField(field.key)"
                            :search-types="[1]"
                            :placeholder="field.placeholder || t('Type to search for groups')"
                            :aria-label="getFieldLabel(field)"
                            :close-on-select="true"
                            @user-selected="(group) => handleGroupSelected(field.key, group)"
                        />
                    </div>

                    <!-- Location field -->
                    <div v-else-if="field.type === 'location'">
                        <NcSelect
                            :id="`field-${field.key}`"
                            :model-value="getSelectedLocationOption(field.key)"
                            :options="locationOptions"
                            :clearable="!field.required"
                            :label-outside="true"
                            :input-label="getFieldLabel(field)"
                            :placeholder="field.placeholder || t('Select location')"
                            :required="field.required"
                            full-width
                            @update:model-value="(val) => handleHierarchicalUpdate(
                                val,
                                'location',
                                updateValue,
                                field.key
                            )"
                        />
                    </div>

                    <!-- Category field -->
                    <div v-else-if="field.type === 'category'">
                        <NcSelect
                            :id="`field-${field.key}`"
                            :model-value="getSelectedCategoryOption(field.key)"
                            :options="categoryOptions"
                            :clearable="!field.required"
                            :label-outside="true"
                            :input-label="getFieldLabel(field)"
                            :placeholder="field.placeholder || t('Select category')"
                            :required="field.required"
                            full-width
                            @update:model-value="(val) => handleHierarchicalUpdate(
                                val,
                                'category',
                                updateValue,
                                field.key
                            )"
                        />
                    </div>

                    <!-- Default fallback - FIXED: handle null values and add label -->
                    <NcTextField
                        v-else
                        :id="`field-${field.key}`"
                        :model-value="getSafeStringValue(field.key)"
                        type="text"
                        :label="getFieldLabel(field)"
                        :placeholder="field.placeholder || ''"
                        :required="field.required"
                        full-width
                        @update:model-value="(val) => updateValue(field.key, val, 'string')"
                    />

                    <!-- Field description -->
                    <div v-if="field.description" class="field-description">
                        {{ field.description }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { t } from '@nextcloud/l10n'
import NcRichContenteditable from '@nextcloud/vue/components/NcRichContenteditable'
import NcTextField from '@nextcloud/vue/components/NcTextField'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import NcSelect from '@nextcloud/vue/components/NcSelect'
import NcTextArea from '@nextcloud/vue/components/NcTextArea'
import NcDateTimePickerNative from '@nextcloud/vue/components/NcDateTimePickerNative'
import UserSearch from '../User/UserSearch.vue'
import SearchSelect from '../Base/modules/SearchSelect.vue'
import type { Component } from 'vue'
import { User } from '../../Types/index.ts'
import { Location, Category } from '../../stores/appSettings.ts'
import { useSessionStore } from '../../stores/session'
import { InquiryOptionIcons } from '../../utils/icons.ts'
import {
    useMiscFields,
    type MiscField,
    type MiscValue,
    getHierarchicalOptions,
    formatMiscValueForDisplay,
    getFieldLabel as getFieldLabelHelper,
    handleHierarchicalUpdate as baseHandleHierarchicalUpdate
} from '../../helpers/modules/MiscFieldsHelper'

// Props
const props = defineProps<{
    fields: MiscField[]
    initialValues?: Record<string, MiscValue>
    editable?: boolean
    optionId?: number | null
    // inquiryId?: number
    locationItems?: Location[]
    categoryItems?: Category[]
    users?: Record<string, { displayName: string }>
    // options?: Option[]
    // inquiries?: Inquiry[]
}>()

// Emits
const emit = defineEmits<{
    update: [values: Record<string, unknown>]
}>()

// Stores
const sessionStore = useSessionStore()

// State for user/group selections
const selectedUsers = ref<Record<string, User>>({})
const selectedGroups = ref<Record<string, User>>({})

// Create a ref for initial values to track changes
const initialValuesRef = ref(props.initialValues || {})

// Initialize misc fields handler
const miscFields = useMiscFields(
    computed(() => props.fields),
    props.optionId ? { id: props.optionId } as number : null,
    initialValuesRef,
    {
        saveImmediateTypes: ['boolean', 'enum', 'datetime', 'users', 'groups', 'location', 'category'],
        locationItems: computed(() => props.locationItems || sessionStore.appSettings.locationTab || []),
        categoryItems: computed(() => props.categoryItems || sessionStore.appSettings.categoryTab || [])
    }
)

// Computed for hierarchical options
const locationOptions = computed(() => getHierarchicalOptions(
    props.locationItems || sessionStore.appSettings.locationTab || [],
    t('Select location')
))

const categoryOptions = computed(() => getHierarchicalOptions(
    props.categoryItems || sessionStore.appSettings.categoryTab || [],
    t('Select category')
))

// Helper methods
const getFieldLabel = (field: MiscField): string => getFieldLabelHelper(field)

// FIXED: Safe method to get string value (never returns null)
const getSafeStringValue = (key: string): string => {
    const value = miscFields.getValue(key)
    if (value === null || value === undefined) {
        return ''
    }
    if (typeof value === 'object') {
        return JSON.stringify(value)
    }
    return String(value)
}

// FIXED: Safe method for select values (returns null for empty)
const getSafeSelectValue = (key: string): unknown => {
    const value = miscFields.getValue(key)
    if (value === null || value === undefined || value === '') {
        return null
    }
    return value
}

// FIXED: Safe method for number fields
const getSafeNumberString = (key: string): string => {
    const value = miscFields.getValue(key)
    if (value === null || value === undefined || value === '') {
        return ''
    }
    // If it's a number, convert to string
    if (typeof value === 'number') {
        return String(value)
    }
    // If it's a string that can be parsed as number
    const num = parseFloat(String(value))
    if (!isNaN(num)) {
        return String(num)
    }
    return ''
}

// FIXED: Update method for number fields
const updateNumberValue = (key: string, value: unknown, type: string) => {
    let parsedValue: number | null = null
    
    if (value !== null && value !== undefined && value !== '') {
        parsedValue = type === 'integer' ? parseInt(value, 10) : parseFloat(value)
        if (isNaN(parsedValue)) {
            parsedValue = null
        }
    }
    
    miscFields.updateValue(key, parsedValue, type)
    emit('update', miscFields.values.value)
}

const getValue = (key: string) => miscFields.getValue(key)

const getBooleanValue = (key: string): boolean => {
    const value = getValue(key)
    // Handle different boolean representations
    if (typeof value === 'boolean') return value
    if (value === 'true') return true
    if (value === 'false') return false
    if (value === 1) return true
    if (value === 0) return false
    return false
}

const updateValue = (key: string, value: unknown, type: string) => {
    miscFields.updateValue(key, value, type)
    // Emit the updated values
    emit('update', miscFields.values.value)
}

const getJsonString = (key: string): string => {
    const value = miscFields.getValue(key)
    if (value === undefined || value === null) return ''
    if (typeof value === 'object') {
        try {
            return JSON.stringify(value, null, 2)
        } catch {
            return String(value)
        }
    }
    return String(value)
}

// Enum methods
const getSelectedEnumValue = (field: MiscField) => {
    const value = miscFields.getValue(field.key)
    if (!value && value !== 0) return null
    const options = getEnumOptions(field)
    return options.find(opt => opt.value === String(value)) || null
}

const getEnumOptions = (field: MiscField) => {
    if (!field.allowed_values) return []
    return field.allowed_values.map(val => ({
        value: val,
        label: val.charAt(0).toUpperCase() + val.slice(1).replace(/_/g, ' ')
    }))
}

// Location/Category methods
const getSelectedLocationOption = (key: string) => {
    const value = miscFields.getValue(key)
    if (!value && value !== 0) return null
    return locationOptions.value.find(opt => String(opt.value) === String(value)) || null
}

const getSelectedCategoryOption = (key: string) => {
    const value = miscFields.getValue(key)
    if (!value && value !== 0) return null
    return categoryOptions.value.find(opt => String(opt.value) === String(value)) || null
}

// DateTime methods - Fixed to handle both string and Date
const getDateTimeValue = (key: string): Date | null => {
    const value = miscFields.getValue(key)
    if (!value) return null
    
    // If it's already a Date object
    if (value instanceof Date && !isNaN(value.getTime())) {
        return value  // Return the Date object directly
    }

    // If it's a string
    if (typeof value === 'string') {
        try {
            // Try to parse as ISO string
            const date = new Date(value)
            if (!isNaN(date.getTime())) {
                return date  // Return Date object
            }
        } catch {
            // If parsing fails, try to extract from format "YYYY-MM-DD HH:MM" or "YYYY-MM-DD"
            const match = value.match(/^(\d{4})-(\d{2})-(\d{2})(?:\s+(\d{2}):(\d{2}))?/)
            if (match) {
                const [, year, month, day, hours = '00', minutes = '00'] = match
                // Create Date object (month is 0-indexed in Date constructor)
                const date = new Date(
                    parseInt(year), 
                    parseInt(month) - 1, 
                    parseInt(day), 
                    parseInt(hours), 
                    parseInt(minutes)
                )
                if (!isNaN(date.getTime())) {
                    return date
                }
            }
        }
    }
    
    // Handle numbers (timestamps)
    if (typeof value === 'number' && !isNaN(value)) {
        const date = new Date(value)
        if (!isNaN(date.getTime())) {
            return date
        }
    }

    return null
}


const handleDateTimeUpdate = (fieldKey: string, value: string | null) => {
    let storageValue: string | null = null
    if (value) {
        // Convert from datetime-local format to storage format
        const date = new Date(value)
        if (!isNaN(date.getTime())) {
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            const hours = String(date.getHours()).padStart(2, '0')
            const minutes = String(date.getMinutes()).padStart(2, '0')
            storageValue = `${year}-${month}-${day} ${hours}:${minutes}`
        }
    }
    miscFields.updateValue(fieldKey, storageValue, 'datetime')
    emit('update', miscFields.values.value)
}

// User/Group methods
const getUserObjectForField = (fieldKey: string): User => {
    const value = miscFields.getValue(fieldKey)
    if (!value) return null

    if (selectedUsers.value[fieldKey]?.id === value) {
        return selectedUsers.value[fieldKey]
    }

    return {
        id: String(value),
        displayName: String(value),
        userRole: 'member'
    }
}

const handleUserSelected = (fieldKey: string, user: User) => {
    const valueToStore = user?.id || ''
    selectedUsers.value[fieldKey] = user
    miscFields.updateValue(fieldKey, valueToStore, 'users')
    emit('update', miscFields.values.value)
}

const getGroupObjectForField = (fieldKey: string): unknown => {
    const value = miscFields.getValue(fieldKey)
    if (!value) return null

    if (selectedGroups.value[fieldKey]?.id === value) {
        return selectedGroups.value[fieldKey]
    }

    return {
        id: String(value),
        displayName: String(value),
        userRole: 'group'
    }
}

const handleGroupSelected = (fieldKey: string, group: User) => {
    const valueToStore = group?.id || ''
    selectedGroups.value[fieldKey] = group
    miscFields.updateValue(fieldKey, valueToStore, 'groups')
    emit('update', miscFields.values.value)
}

// Hierarchical update
const handleHierarchicalUpdate = (val: unknown, fieldType: string, updateCallback: unknown, fieldKey: string) => {
    baseHandleHierarchicalUpdate(val, fieldType, updateCallback, fieldKey)
    emit('update', miscFields.values.value)
}

// Format display value for view mode
const formatDisplayValue = (field: MiscField): string => {
    const value = miscFields.getValue(field.key)

    if (value === undefined || value === null || value === '') {
        return '—'
    }

    const context = {
        locationItems: props.locationItems || sessionStore.appSettings.locationTab || [],
        categoryItems: props.categoryItems || sessionStore.appSettings.categoryTab || [],
        users: props.users || sessionStore.appSettings.users || {}
    }

    return formatMiscValueForDisplay(value, field, context)
}

// Get CSS class for value
const getValueClass = (key: string, type: string): string => {
    const value = miscFields.getValue(key)
    if (type === 'boolean') {
        return value ? 'value-true' : 'value-false'
    }
    if (type === 'datetime') {
        return 'value-datetime'
    }
    if (type === 'json') {
        return 'value-json'
    }
    if (type === 'number' || type === 'integer') {
        return 'value-number'
    }
    return ''
}

// Get icon for field type
const getFieldIcon = (type: string): Component => {
    const icons: Record<string, Component> = {
        text: InquiryOptionIcons.Text,
        number: InquiryOptionIcons.Numeric,
        integer: InquiryOptionIcons.Numeric,
        boolean: InquiryOptionIcons.CheckCircle,
        datetime: InquiryOptionIcons.Calendar,
        json: InquiryOptionIcons.Code,
        users: InquiryOptionIcons.Account,
        groups: InquiryOptionIcons.AccountGroup,
        location: InquiryOptionIcons.MapMarker,
        category: InquiryOptionIcons.ViewDashboard,
        option: InquiryOptionIcons.MessageText,
        inquiry: InquiryOptionIcons.Forum
    }
    return icons[type] || InquiryOptionIcons.Text
}

// Get color for field icon
const getFieldColor = (field: MiscField): string => {
    const colors = {
        text: 'var(--color-primary-element)',
        number: 'var(--color-success)',
        integer: 'var(--color-success)',
        boolean: 'var(--color-warning)',
        datetime: 'var(--color-info)',
        json: 'var(--color-error)',
        users: 'var(--color-primary-element)',
        groups: 'var(--color-primary-element)',
        location: 'var(--color-success)',
        category: 'var(--color-warning)',
        option: 'var(--color-primary-element)',
        inquiry: 'var(--color-primary-element)'
    }
    return colors[field.type as keyof typeof colors] || 'var(--color-text-lighter)'
}

// Initialize on mount
onMounted(() => {
    miscFields.reinitialize()
    // Emit initial values
    setTimeout(() => {
        emit('update', miscFields.values.value)
    }, 0)
})

// Cleanup
onUnmounted(() => {
    miscFields.clearTimeouts()
})
</script>

<style scoped lang="scss">
.misc-fields-editor {
    .no-fields {
        text-align: center;
        padding: 20px;
        color: var(--color-text-lighter);
        font-style: italic;
    }

    // View Mode - Beautiful card design
    .view-mode {
        .fields-grid.view-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 16px;

            .field-card {
                background: var(--color-background-dark);
                border: 1px solid var(--color-border);
                border-radius: 12px;
                padding: 14px;
                transition: all 0.2s ease;

                &:hover {
                    border-color: var(--color-primary-element);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .field-header {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 10px;

                    .field-icon {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 24px;
                        height: 24px;
                        border-radius: 6px;
                        color: white;

                        :deep(svg) {
                            width: 12px;
                            height: 12px;
                        }
                    }

                    .field-label {
                        font-size: 11px;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        color: var(--color-text-lighter);
                    }
                }

                .field-value {
                    font-size: 14px;
                    color: var(--color-main-text);
                    line-height: 1.5;
                    word-break: break-word;
                    padding-left: 4px;

                    &.value-true {
                        color: var(--color-success);
                        font-weight: 500;

                        &::before {
                            content: '✓ ';
                        }
                    }

                    &.value-false {
                        color: var(--color-error);

                        &::before {
                            content: '✗ ';
                        }
                    }

                    &.value-datetime {
                        font-family: monospace;
                        font-size: 12px;
                        background: var(--color-background-darker);
                        padding: 2px 8px;
                        border-radius: 4px;
                        display: inline-block;
                    }

                    &.value-json {
                        font-family: monospace;
                        font-size: 11px;
                        background: var(--color-background-darker);
                        padding: 8px;
                        border-radius: 6px;
                        white-space: pre-wrap;
                        display: block;
                        max-height: 150px;
                        overflow-y: auto;
                    }

                    &.value-number {
                        font-family: monospace;
                        font-weight: 600;
                        color: var(--color-primary-element);
                    }
                }

                &.inline-field {
                    // No special styling needed
                }
            }
        }
    }

    // Edit Mode
    .edit-mode {
        .fields-grid.edit-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            gap: 20px;

            .field-item {
                .field-label-edit {
                    display: block;
                    margin-bottom: 8px;
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--color-main-text);

                    .required {
                        color: var(--color-error);
                        margin-left: 2px;
                    }

                    .field-type-badge {
                        margin-left: 8px;
                        font-size: 10px;
                        font-weight: normal;
                        color: var(--color-text-lighter);
                        background: var(--color-background-darker);
                        padding: 2px 4px;
                        border-radius: 4px;
                    }
                }

                .checkbox-field {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 8px 0;

                    label {
                        margin: 0;
                        font-weight: normal;
                        cursor: pointer;
                        color: var(--color-text-light);
                    }
                }

                .field-hint,
                .field-description {
                    font-size: 12px;
                    color: var(--color-text-lighter);
                    margin-top: 6px;
                    padding-left: 4px;
                    border-left: 2px solid var(--color-primary-element);
                }

                .user-field-container {
                    :deep(.user-search) {
                        width: 100%;
                    }
                }
            }
        }
    }

    @media (max-width: 768px) {
        .view-mode .fields-grid.view-grid {
            grid-template-columns: 1fr;
        }

        .edit-mode .fields-grid.edit-grid {
            grid-template-columns: 1fr;
        }
    }
}
</style>
