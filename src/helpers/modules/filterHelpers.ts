// ============================================================
// ============================================================
// FILTER HELPERS
// ============================================================
// This file implements the filtering logic for the experience architecture.
// @see Complete Vocabulary Definition - Single Source of Truth
// ============================================================

import type { ScopeFilter } from '../Types/experience.types'

/**
 * Apply filters to a data array
 * @param data - Array of items to filter
 * @param filter - Filter criteria
 * @see Complete Vocabulary Definition - Section 13: Filter
 */
export function applyFilters<T extends Record<string, any>>(
  data: T[],
  filter?: ScopeFilter
): T[] {
  if (!filter) return data

  return data.filter(item => {
    // ============================================================
    // INQUIRY TYPE FILTER - for inquiries
    // ============================================================
    if (filter.inquiry_type) {
      const types = Array.isArray(filter.inquiry_type) 
        ? filter.inquiry_type 
        : [filter.inquiry_type]
      const itemType = item.inquiryType || item.type
      if (!types.includes(itemType)) {
        return false
      }
    }

    // ============================================================
    // GROUP TYPE FILTER - for inquiry_groups
    // ============================================================
    if (filter.group_type) {
      const types = Array.isArray(filter.group_type) 
        ? filter.group_type 
        : [filter.group_type]
      const itemType = item.groupType || item.type
      if (!types.includes(itemType)) {
        return false
      }
    }

    // ============================================================
    // GENERIC TYPE FILTER (for backward compatibility)
    // ============================================================
    if (filter.type) {
      const types = Array.isArray(filter.type) ? filter.type : [filter.type]
      const itemType = item.type || item.inquiryType || item.groupType
      if (!types.includes(itemType)) {
        return false
      }
    }

    // ============================================================
    // STATUS FILTER
    // ============================================================
    if (filter.status) {
      const statuses = Array.isArray(filter.status) ? filter.status : [filter.status]
      // Handle nested status (e.g., inquiry.status.inquiryStatus)
      const itemStatus = item.status?.inquiryStatus || item.status || item.statusKey
      if (!statuses.includes(itemStatus)) {
        return false
      }
    }

    // ============================================================
    // FAMILY FILTER (for options)
    // ============================================================
    if (filter.family) {
      const families = Array.isArray(filter.family) ? filter.family : [filter.family]
      const itemFamily = item.family || item.optionFamily
      if (!families.includes(itemFamily)) {
        return false
      }
    }

    // ============================================================
    // DATE FILTER
    // ============================================================
    if (filter.date) {
      const itemDate = item.created || item.createdAt || item.timestamp
      if (filter.date.from && itemDate < filter.date.from) {
        return false
      }
      if (filter.date.to && itemDate > filter.date.to) {
        return false
      }
    }

    // ============================================================
    // DATE RANGE FILTER (alternative using from/to)
    // ============================================================
    if (filter.from || filter.to) {
      const itemDate = item.created || item.createdAt || item.timestamp
      if (filter.from && itemDate < filter.from) {
        return false
      }
      if (filter.to && itemDate > filter.to) {
        return false
      }
    }

    // ============================================================
    // SELECTION FILTER
    // For marketplace, user selections, categories, locations, etc.
    // ============================================================
    if (filter.selection) {
      const selection = filter.selection

      // Filter by userId
      if (selection.userId) {
        const itemUserId = item.owner?.id || item.userId
        if (itemUserId !== selection.userId) {
          return false
        }
      }

      // Filter by groupId
      if (selection.groupId) {
        const itemGroupId = item.groupId || item.inquiryGroupId
        if (itemGroupId !== selection.groupId) {
          return false
        }
      }

      // Filter by category
      if (selection.category) {
        const itemCategory = item.category || item.miscFields?.category
        if (itemCategory !== selection.category) {
          return false
        }
      }

      // Filter by location
      if (selection.location) {
        const itemLocation = item.location || item.miscFields?.location
        // Allow template variables like '{user_selected_location}'
        const locationValue = selection.location
        if (locationValue.startsWith('{') && locationValue.endsWith('}')) {
          // This is a template variable - skip validation at this level
          // The parent component will replace it with the actual value
        } else if (itemLocation !== locationValue) {
          return false
        }
      }

      // Filter by tags
      if (selection.tags && selection.tags.length > 0) {
        const itemTags = item.tags || item.miscFields?.tags || []
        const hasMatchingTag = selection.tags.some(tag => {
          // Skip template variables
          if (tag.startsWith('{') && tag.endsWith('}')) return true
          return itemTags.includes(tag)
        })
        if (!hasMatchingTag) {
          return false
        }
      }

      // Custom selection filters
      if (selection.custom) {
        for (const [key, value] of Object.entries(selection.custom)) {
          const itemValue = item.miscFields?.[key] || item[key]
          if (Array.isArray(value)) {
            if (!value.includes(itemValue)) {
              return false
            }
          } else if (value !== undefined && value !== null) {
            if (itemValue !== value) {
              return false
            }
          }
        }
      }
    }

    // ============================================================
    // CUSTOM FILTERS (via miscFields)
    // ============================================================
    const reservedKeys = [
      'inquiry_type', 'group_type', 'type', 'status', 'family', 
      'date', 'selection', 'from', 'to'
    ]
    
    Object.keys(filter).forEach(key => {
      if (reservedKeys.includes(key)) return
      const filterValue = filter[key]
      const itemValue = item.miscFields?.[key] || item[key]
      if (Array.isArray(filterValue)) {
        if (!filterValue.includes(itemValue)) {
          return false
        }
      } else if (filterValue !== undefined && filterValue !== null) {
        if (itemValue !== filterValue) {
          return false
        }
      }
    })

    return true
  })
}

/**
 * Apply sorting to filtered data
 * @param data - Array of items to sort
 * @param sort - Sorting criteria
 */
export function applySort<T extends Record<string, any>>(
  data: T[],
  sort?: { field: string; direction: 'asc' | 'desc' }
): T[] {
  if (!sort) return data

  return [...data].sort((a, b) => {
    let aVal = a[sort.field]
    let bVal = b[sort.field]

    // Handle nested properties (e.g., status.created)
    if (sort.field.includes('.')) {
      const parts = sort.field.split('.')
      aVal = parts.reduce((obj, key) => obj?.[key], a)
      bVal = parts.reduce((obj, key) => obj?.[key], b)
    }

    // Handle null/undefined values
    if (aVal == null && bVal == null) return 0
    if (aVal == null) return sort.direction === 'asc' ? -1 : 1
    if (bVal == null) return sort.direction === 'asc' ? 1 : -1

    // Numeric comparison
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sort.direction === 'asc' ? aVal - bVal : bVal - aVal
    }

    // Date comparison
    if (aVal instanceof Date && bVal instanceof Date) {
      return sort.direction === 'asc' 
        ? aVal.getTime() - bVal.getTime() 
        : bVal.getTime() - aVal.getTime()
    }

    // String comparison
    const aStr = String(aVal || '').toLowerCase()
    const bStr = String(bVal || '').toLowerCase()
    return sort.direction === 'asc' 
      ? aStr.localeCompare(bStr) 
      : bStr.localeCompare(aStr)
  })
}

/**
 * Apply pagination to filtered and sorted data
 * @param data - Array of items to paginate
 * @param pagination - Pagination criteria
 */
export function applyPagination<T>(
  data: T[],
  pagination?: { limit: number; offset: number }
): T[] {
  if (!pagination) return data
  if (pagination.limit <= 0) return []
  
  const start = pagination.offset || 0
  const end = start + pagination.limit
  return data.slice(start, end)
}

/**
 * Process data through all scope filters
 * Combines filter, sort, and pagination
 * 
 * @param data - Raw data array
 * @param options - Processing options
 * @param options.filter - Filter criteria
 * @param options.sort - Sorting criteria
 * @param options.pagination - Pagination criteria
 * 
 * @see Complete Vocabulary Definition - Section 10-12: Matrix CONTENT × SOURCE
 */
export function processScopeData<T extends Record<string, any>>(
  data: T[],
  options: {
    filter?: ScopeFilter
    sort?: { field: string; direction: 'asc' | 'desc' }
    pagination?: { limit: number; offset: number }
  }
): T[] {
  let result = data
  
  // Apply filters first
  result = applyFilters(result, options.filter)
  
  // Then sort
  result = applySort(result, options.sort)
  
  // Finally paginate
  result = applyPagination(result, options.pagination)
  
  return result
}

/**
 * Process data for a specific zone in display_architecture
 * 
 * @param data - Raw data array
 * @param zone - The zone configuration
 * @param zone.scope - Scope configuration
 * @param zone.filter - Filter configuration (at zone level)
 * 
 * @see Complete Vocabulary Definition - Section 16: ValidatedUIDefinition
 */
export function processZoneData<T extends Record<string, any>>(
  data: T[],
  zone: {
    scope?: {
      source?: string
      sort?: { field: string; direction: 'asc' | 'desc' }
      pagination?: { limit: number; offset: number }
    }
    filter?: ScopeFilter
  }
): T[] {
  return processScopeData(data, {
    filter: zone.filter,
    sort: zone.scope?.sort,
    pagination: zone.scope?.pagination
  })
}
