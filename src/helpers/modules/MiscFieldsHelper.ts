/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { ref, type Ref } from 'vue'
import { t } from '@nextcloud/l10n'
import type { BaseEntry } from '../../Types/index.ts'

export type MiscValue = string | boolean | number | null | undefined | Date | string[] | object
// Types based on your examples
export interface MiscField {
    key: string
    label: string
    type: 'string' | 'integer' | 'boolean' | 'enum' | 'json' | 'datetime' | 'users' | 'groups' | 'location' | 'category'
    required: boolean
    default: MiscValue
    rules?: Record<string, unknown>
    allowed_values?: string[]  // For enum type
    description?: string
    placeholder?: string
}


export interface MiscFieldValue {
    [key: string]: MiscValue
}

export interface MiscFieldState {
    values: Ref<Record<string, MiscValue>>
    checkboxes: Ref<Record<string, boolean>>
    isSaving: Ref<boolean>
    saveTimeouts: Ref<Record<string, NodeJS.Timeout>>
    errors: Ref<Record<string, string>>
}

export interface HierarchicalOption {
    value: number | string
    label: string
    original: BaseEntry
}

/**
 * Build hierarchical structure for location/category fields
 * @param list
 * @param parentId
 * @param depth
 */
export const buildHierarchy = (list: BaseEntry[], parentId = 0, depth = 0): BaseEntry[] => {
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

/**
 * Parse misc value from storage to display format
 * @param value
 * @param fieldType
 */
export const parseMiscValue = (value: MiscValue, fieldType?: string): MiscValue => {
    if (value === null || value === undefined || value === '') return null

    try {
        // Handle string values that might need parsing
        if (typeof value === 'string') {
            // Remove surrounding quotes if they exist
            let cleanedValue = value
            if (value.startsWith('"') && value.endsWith('"')) {
                cleanedValue = value.slice(1, -1)
            }

            // Handle specific types
            if (fieldType === 'integer' || fieldType === 'number') {
                const num = Number(cleanedValue)
                return isNaN(num) ? null : num
            }

            if (fieldType === 'boolean') {
                return cleanedValue === 'true'
            }

            // Try to parse JSON for json type or if it looks like JSON
            if (fieldType === 'json' || cleanedValue.startsWith('{') || cleanedValue.startsWith('[')) {
                try {
                    return JSON.parse(cleanedValue)
                } catch {
                    // Not valid JSON, return as string
                }
            }

            // Handle boolean strings for non-boolean fields
            if (cleanedValue === 'true') return true
            if (cleanedValue === 'false') return false

            // For location/category, keep as string/number
            if (fieldType === 'location' || fieldType === 'category') {
                // Try to convert to number if it's numeric
                const num = Number(cleanedValue)
                return isNaN(num) ? cleanedValue : num
            }

            return cleanedValue
        }

        return value
    } catch {
        return value
    }
}

/**
 * Format value for storage (convert to string)
 * @param value
 * @param fieldType
 */
export const formatValueForStorage = (value: MiscValue, fieldType: string): string => {
    if (value === null || value === undefined) {
        return ''
    }

    switch (fieldType) {
        case 'boolean':
            return value ? 'true' : 'false'
        case 'json':
            return typeof value === 'object' ? JSON.stringify(value) : String(value)
        case 'datetime':
            if (value instanceof Date) {
                return value.toISOString()
            }
            if (typeof value === 'string') {
                // Try to parse and reformat date string
                try {
                    return new Date(value).toISOString()
                } catch {
                    return value
                }
            }
            return String(value)
        case 'integer':
        case 'number':
            return String(value)
        case 'users':
        case 'groups':
            return Array.isArray(value) ? JSON.stringify(value) : String(value)
        case 'location':
        case 'category':
            return String(value)
        default:
            return String(value)
    }
}

/**
 * Parse form value based on field type
 * @param value
 * @param fieldType
 */
export const parseFormValue = (value: unknown, fieldType: string): unknown => {
    if (value === null || value === undefined) {
        return null
    }

    switch (fieldType) {
        case 'boolean':
            return value === true || value === 'true' || value === 1
        case 'integer':
        case 'number': {
            if (value === '') return null
            const num = Number(value)
            return isNaN(num) ? null : num
        }

        case 'datetime':
            if (value instanceof Date) {
                return value
            }
            if (typeof value === 'string') {
                const date = new Date(value)
                return isNaN(date.getTime()) ? null : date
            }
            return value
        case 'json':
            if (typeof value === 'string') {
                try {
                    return JSON.parse(value)
                } catch {
                    return value
                }
            }
            return value
        case 'enum':
            return String(value)
        case 'users':
        case 'groups':
            if (Array.isArray(value)) {
                return value
            }
            if (typeof value === 'string') {
                try {
                    return JSON.parse(value)
                } catch {
                    return [value]
                }
            }
            return value
        case 'location':
        case 'category':
            // Handle select option objects
            if (value && typeof value === 'object' && 'value' in value) {
                return value.value
            }
            return value
        default:
            return String(value)
    }
}

/**
 * Get formatted date from stored value
 * @param value
 */
export const getFormattedDate = (value: MiscValue): Date | null => {
    if (!value) return null

    try {
        if (value instanceof Date) {
            return value
        }
        if (typeof value === 'string') {
            // Try manual construction for YYYY-MM-DD HH:MM format
            const match = value.match(/^(\d{4})-(\d{2})-(\d{2})(?:\s+(\d{2}):(\d{2}))?/)
            if (match) {
                const [, year, month, day, hours = '00', minutes = '00'] = match
                return new Date(
                    parseInt(year),
                    parseInt(month) - 1,
                    parseInt(day),
                    parseInt(hours),
                    parseInt(minutes)
                )
            }
            // Try ISO format
            const date = new Date(value)
            return isNaN(date.getTime()) ? null : date
        }
        return null
    } catch (e) {
        console.error("Date parsing failed:", e)
        return null
    }
}

/**
 * Check if field should be displayed (has value or has default)
 * @param field
 * @param value
 */
export const shouldDisplayField = (field: MiscField, value: MiscValue): boolean => {
    // Always show fields that have defaults defined
    if (field.default !== undefined && field.default !== null) {
        return true
    }

    if (value === null || value === undefined || value === '') {
        return false
    }

    if (Array.isArray(value) && value.length === 0) {
        return false
    }

    if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) {
        return false
    }

    return true
}

/**
 * Create reactive state for misc fields
 */
export const createMiscFieldState = () => ({
        values: ref<Record<string, MiscValue>>({}),
        checkboxes: ref<Record<string, boolean>>({}),
        isSaving: ref(false),
        saveTimeouts: ref<Record<string, NodeJS.Timeout>>({}),
        errors: ref<Record<string, string>>({})
    })

/**
 * Initialize misc fields with defaults
 * @param fields
 * @param existingValues
 */
export const initializeMiscFields = (
    fields: MiscField[],
    existingValues: Record<string, MiscValue> = {},
): Record<string, MiscValue> => {
    const initialized: Record<string, MiscValue> = { ...existingValues }

    fields.forEach(field => {
        if (initialized[field.key] === undefined) {
            // Set default value if field doesn't exist
            let defaultValue = field.default

            if (defaultValue === null || defaultValue === undefined) {
                defaultValue = ''
            } else {
                defaultValue = parseFormValue(defaultValue, field.type)
            }

            initialized[field.key] = defaultValue
        } else {
            // Parse existing value based on field type
            initialized[field.key] = parseMiscValue(initialized[field.key], field.type)
        }
    })

    return initialized
}

/**
 * Initialize checkboxes for boolean fields
 * @param fields
 * @param values
 */
export const initializeCheckboxes = (
    fields: MiscField[],
    values: Record<string, MiscValue>
): Record<string, boolean> => {
    const checkboxes: Record<string, boolean> = {}

    fields.forEach(field => {
        if (field.type === 'boolean') {
            const value = values[field.key]
            checkboxes[field.key] = value === true || value === 'true' || value === 1
        }
    })

    return checkboxes
}

/**
 * Sanitize value to prevent VNode storage (utility function)
 * @param value
 */
export const sanitizeValue = (value: unknown): string => {
    if (value === null || value === undefined) {
        return '';
    }

    // Handle VNode arrays
    if (Array.isArray(value) && value.length > 0) {
        // Check if it's a VNode array
        if (value[0]?.__v_isVNode) {
            // Extract text content from the first VNode
            return String(value[0].children || '');
        }
        // If it's an array of strings, take the first
        return String(value[0] || '');
    }

    // Handle objects with id property
    if (value && typeof value === 'object') {
        if ('id' in value) {
            return String(value.id);
        }
        if ('userId' in value) {
            return String(value.userId);
        }
        // Try to stringify, but avoid storing complex objects
        try {
            return JSON.stringify(value);
        } catch {
            return String(value);
        }
    }

    // Default to string conversion
    return String(value);
}

/**
 * Create a composable for handling misc fields in a component
 * @param fields
 * @param store
 * @param existingValues
 * @param options
 * @param options.saveImmediateTypes
 * @param options.locationItems
 * @param options.categoryItems
 * @param options.users
 */
export function useMiscFields(
    fields: Ref<MiscField[]>,
    store: unknown, // The store with updateMiscField method
    existingValues: Ref<Record<string, MiscValue>>,
    options?: {
        saveImmediateTypes?: string[]
        locationItems?: Ref<BaseEntry[]>
        categoryItems?: Ref<BaseEntry[]>
        users?: Ref<Record<string, { displayName: string }>>
    }
) {
    const state = createMiscFieldState()
    const saveImmediateTypes = options?.saveImmediateTypes || ['boolean', 'enum', 'datetime', 'users', 'groups', 'location', 'category']

    // Initialize values and checkboxes
    const init = () => {
        state.values.value = initializeMiscFields(fields.value, existingValues.value)
        state.checkboxes.value = initializeCheckboxes(fields.value, state.values.value)
    }

    // Watch for field changes and reinitialize
    const reinitialize = () => {
        init()
    }

    // Get value for a field
    const getValue = (key: string): MiscValue => state.values.value[key] ?? null

    // Get checkbox value
    const getCheckboxValue = (key: string): boolean => state.checkboxes.value[key] || false

    // Get hierarchical options for location/category fields - MOVED INSIDE
    const getHierarchicalOptionsForField = (fieldKey: string): HierarchicalOption[] => {
        const field = fields.value.find(f => f.key === fieldKey)
        if (!field) return []

        if (field.type === 'location' && options?.locationItems?.value) {
            return getHierarchicalOptions(options.locationItems.value, t('Select location'))
        }

        if (field.type === 'category' && options?.categoryItems?.value) {
            return getHierarchicalOptions(options.categoryItems.value, t('Select category'))
        }

        return []
    }

    // Update a field value
    const updateValue = async (
        fieldKey: string,
        value: unknown,
        fieldType: string,
        saveCallback?: (key: string, value: string) => Promise<void>
    ) => {
        // Clear any existing timeout
        if (state.saveTimeouts.value[fieldKey]) {
            clearTimeout(state.saveTimeouts.value[fieldKey])
        }

        // Parse value based on field type
        const processedValue = parseFormValue(value, fieldType)
        
        // For boolean, update checkbox state
        if (fieldType === 'boolean') {
            state.checkboxes.value[fieldKey] = processedValue === true
        }

        // Update local state
        state.values.value[fieldKey] = processedValue

        const saveFn = saveCallback || saveToStore

        // Different save strategies based on field type
        if (saveImmediateTypes.includes(fieldType)) {
            await saveFn(fieldKey, processedValue)
        } else {
            state.saveTimeouts.value[fieldKey] = setTimeout(() => {
                saveFn(fieldKey, processedValue)
            }, 1000)
        }
    }

    // Save to store
    const saveToStore = async (fieldKey: string, value: unknown) => {
        if (!store) return

        state.isSaving.value = true
        state.errors.value[fieldKey] = ''

        try {
            // Get field to determine type
            const field = fields.value.find(f => f.key === fieldKey)
            const stringValue = formatValueForStorage(value, field?.type || 'string')

            // Call store method
            if (typeof store.updateMiscField === 'function') {
                console.log(" SAVE TO STORE FIELD KEY ",fieldKey)
                console.log(" SAVE TO STORE STRING VALUE ",stringValue)

                await store.updateMiscField(fieldKey, stringValue)
            }
        } catch (e) {
            console.error(`Error saving misc field ${fieldKey}:`, e)
            state.errors.value[fieldKey] = String(e)
        } finally {
            state.isSaving.value = false
        }
    }

    // Save all fields at once
    const saveAll = async () => {
        state.isSaving.value = true
        state.errors.value = {}

        try {
            const promises = Object.entries(state.values.value).map(([key, value]) => {
                const field = fields.value.find(f => f.key === key)
                const stringValue = formatValueForStorage(value, field?.type || 'string')
                console.log(" SAVE ALL FIELD KEY ",key)
                console.log(" SAVE ALL STRING VALUE ",stringValue)
                return store.updateMiscField(key, stringValue)
            })

            await Promise.all(promises)
        } catch (e) {
            console.error('Error saving all misc fields:', e)
        } finally {
            state.isSaving.value = false
        }
    }

    // Reset to defaults
    const resetToDefaults = () => {
        state.values.value = initializeMiscFields(fields.value, {})
        state.checkboxes.value = initializeCheckboxes(fields.value, state.values.value)
    }

    // Clear all timeouts
    const clearTimeouts = () => {
        Object.values(state.saveTimeouts.value).forEach(timeout => {
            clearTimeout(timeout)
        })
        state.saveTimeouts.value = {}
    }

    // Get enum display label
    const getEnumLabel = (fieldKey: string, value: string): string => {
        const field = fields.value.find(f => f.key === fieldKey)
        if (!field || field.type !== 'enum' || !field.allowed_values) {
            return value
        }

        // Try to find a matching label
        const found = field.allowed_values.find(v => v === value)
        if (found) {
            return found.charAt(0).toUpperCase() + found.slice(1).replace(/_/g, ' ')
        }
        return value
    }

    // Get display path for location/category
    const getDisplayPath = (fieldKey: string): string => {
        const field = fields.value.find(f => f.key === fieldKey)
        if (!field) return ''

        const value = getValue(fieldKey)
        if (!value) return t('Not set')

        if (field.type === 'location' && options?.locationItems?.value) {
            const path = getHierarchyPath(options.locationItems.value, value as string | number)
            return path || String(value)
        }

        if (field.type === 'category' && options?.categoryItems?.value) {
            const path = getHierarchyPath(options.categoryItems.value, value as string | number)
            return path || String(value)
        }

        return String(value)
    }

    return {
        // State
        values: state.values,
        checkboxes: state.checkboxes,
        isSaving: state.isSaving,
        errors: state.errors,

        // Methods
        init,
        reinitialize,
        getValue,
        getCheckboxValue,
        getHierarchicalOptionsForField, // NOW INCLUDED
        updateValue,
        saveAll,
        resetToDefaults,
        clearTimeouts,
        getEnumLabel,
        getDisplayPath,
        parseValue: parseMiscValue,
        formatForDisplay: (fieldKey: string) => {
            const field = fields.value.find(f => f.key === fieldKey)
            if (!field) return String(getValue(fieldKey))

            const context = {
                locationItems: options?.locationItems?.value,
                categoryItems: options?.categoryItems?.value,
                users: options?.users?.value
            }

            return formatMiscValueForDisplay(getValue(fieldKey), field, context)
        },
        getFormattedDate: (key: string) => getFormattedDate(getValue(key)),
        
        // Utility function
        sanitizeValue
    }
}
/*
// Get display path for location/category
const getDisplayPath = (fieldKey: string): string => {
    const field = fields.value.find(f => f.key === fieldKey)
    if (!field) return ''

    const value = getValue(fieldKey)
    if (!value) return t('Not set')

    if (field.type === 'location' && options?.locationItems?.value) {
        const path = getHierarchyPath(options.locationItems.value, value as string | number)
        return path || String(value)
    }

    if (field.type === 'category' && options?.categoryItems?.value) {
        const path = getHierarchyPath(options.categoryItems.value, value as string | number)
        return path || String(value)
    }

    return String(value)
}

*/
/**
 * Format value for display
 * @param value
 * @param field
 * @param context
 * @param context.locationItems
 * @param context.categoryItems
 * @param context.users
 */
export const formatMiscValueForDisplay = (
    value: MiscValue, 
    field: MiscField,
    context?: {
        locationItems?: BaseEntry[],
        categoryItems?: BaseEntry[],
        users?: Record<string, { displayName: string }>
    }
): string => {
    if (value === null || value === undefined || value === '') {
        return t('Not set')
    }

    try {
        const parsed = parseMiscValue(value, field.type)

        switch (field.type) {
            case 'boolean':
                return parsed ? t('Yes') : t('No')
            case 'datetime':
                if (parsed instanceof Date) {
                    return parsed.toLocaleString()
                }
                if (typeof parsed === 'string') {
                    return new Date(parsed).toLocaleString()
                }
                return String(parsed)
            case 'json': {
                if (typeof parsed === 'object') {
                    return JSON.stringify(parsed, null, 2)
                }
                return String(parsed)
            }
            case 'integer':
            case 'number':
                return String(parsed)
            case 'enum':
                // Try to find a matching label if available
                if (field.allowed_values) {
                    const found = field.allowed_values.find(v => v === parsed)
                    if (found) {
                        return found.charAt(0).toUpperCase() + found.slice(1).replace(/_/g, ' ')
                    }
                }
                return String(parsed).charAt(0).toUpperCase() + String(parsed).slice(1).replace(/_/g, ' ')
            case 'users':
            case 'groups':
                if (Array.isArray(parsed)) {
                    if (context?.users) {
                        return parsed.map(id => context.users[id]?.displayName || id).join(', ')
                    }
                    return parsed.join(', ')
                }
                if (typeof parsed === 'string') {
                    // Try to parse if it's a JSON string
                    try {
                        const arr = JSON.parse(parsed)
                        if (Array.isArray(arr)) {
                            if (context?.users) {
                                return arr.map(id => context.users[id]?.displayName || id).join(', ')
                            }
                            return arr.join(', ')
                        }
                    } catch {
                        // Not JSON, return as is
                    }
                }
                return String(parsed)
            case 'location':
                if (context?.locationItems) {
                    const path = getHierarchyPath(context.locationItems, parsed as string | number)
                    return path || String(parsed)
                }
                return String(parsed)
            case 'category':
                if (context?.categoryItems) {
                    const path = getHierarchyPath(context.categoryItems, parsed as string | number)
                    return path || String(parsed)
                }
                return String(parsed)
            default:
                return String(parsed)
        }
    } catch {
        return String(value)
    }
}


/**
 * Utility function to get field label
 * @param field
 */
export const getFieldLabel = (field: MiscField): string => {
    if (field.label) return field.label
    return field.key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
}

/**
 * Get hierarchy path for display
 * @param items
 * @param targetId
 */
export const getHierarchyPath = (items: BaseEntry[], targetId: number | string): string => {
  if (!items || !Array.isArray(items) || !targetId) return ''
  
  const itemMap: Record<string | number, BaseEntry> = {}
  items.forEach((item) => {
    itemMap[item.id] = item
  })

  if (!itemMap[targetId]) {
    return String(targetId)
  }

  function buildPath(item: BaseEntry): string {
    if (item.parentId === 0 || !item.parentId) {
      return item.name || String(item.id)
    }
    const parent = itemMap[item.parentId]
    if (parent) {
      return `${buildPath(parent)} -> ${item.name || String(item.id)}`
    }
    return item.name || String(item.id)
  }

  return buildPath(itemMap[targetId])
}

/**
 * Get hierarchical options for select dropdown
 * @param items
 * @param emptyLabel
 */
export const getHierarchicalOptions = (
  items: BaseEntry[],
  emptyLabel?: string
): Array<{ value: number | string; label: string; original: BaseEntry }> => {
  if (!Array.isArray(items)) return []
  
  const hierarchical = buildHierarchy(items)
  const options = hierarchical.map((item) => ({
    value: item.id,
    label: `${'— '.repeat(item.depth ?? 0)}${item.name ?? '[no name]'}`,
    original: item,
  }))

  if (emptyLabel) {
    options.unshift({
      value: '',
      label: emptyLabel,
      original: { id: '', name: emptyLabel, parentId: 0 } as BaseEntry
    })
  }

  return options
}

/**
 * Handle hierarchical select update (extract ID from option)
 * @param value
 * @param fieldType
 * @param updateCallback
 * @param fieldKey
 */
export const handleHierarchicalUpdate = (
  value: unknown,
  fieldType: string,
  updateCallback: (key: string, value: unknown, type: string) => void,
  fieldKey: string
): void => {
  
  // Extract the ID from the selected option
  let idToStore = ''
  if (value && typeof value === 'object' && 'value' in value) {
    idToStore = String(value.value)
  } else if (value) {
    idToStore = String(value)
  }
  
  updateCallback(fieldKey, idToStore, fieldType)
}

/**
 * Validate field value against rules
 * @param field
 * @param value
 */
export const validateField = (field: MiscField, value: unknown): string | null => {
    if (!field.rules) return null

    // Required validation
    if (field.required && (value === null || value === undefined || value === '')) {
        return t('This field is required')
    }

    // Max length validation
    if (field.rules.maxLength && typeof value === 'string' && value.length > field.rules.maxLength) {
        return t('Maximum length is {max} characters', { max: field.rules.maxLength })
    }

    // Min length validation
    if (field.rules.minLength && typeof value === 'string' && value.length < field.rules.minLength) {
        return t('Minimum length is {min} characters', { min: field.rules.minLength })
    }

    // Pattern validation
    if (field.rules.pattern && typeof value === 'string') {
        const regex = new RegExp(field.rules.pattern)
        if (!regex.test(value)) {
            return field.rules.message || t('Invalid format')
        }
    }

    return null
}
