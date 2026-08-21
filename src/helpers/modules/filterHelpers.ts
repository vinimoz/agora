// ============================================================

import type { ScopeFilter } from '../Types/experience.types'

/**
 * Apply filters to a data array
 * @param data
 * @param filter
 * @see La séparation est maintenant claire.txt - Section 13: scope.filter
 */
export function applyFilters<T extends Record<string, any>>(
  data: T[],
  filter?: ScopeFilter
): T[] {
  if (!filter) return data

  return data.filter(item => {
    // ============================================================
    // TYPE FILTER
    // ============================================================
    if (filter.type) {
      const types = Array.isArray(filter.type) ? filter.type : [filter.type]
      if (!types.includes(item.type)) {
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
      if (!families.includes(item.family)) {
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
    // SELECTION FILTER - NEW!
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
        if (itemLocation !== selection.location) {
          return false
        }
      }

      // Filter by tags
      if (selection.tags && selection.tags.length > 0) {
        const itemTags = item.tags || item.miscFields?.tags || []
        const hasMatchingTag = selection.tags.some(tag => itemTags.includes(tag))
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
    const reservedKeys = ['type', 'status', 'family', 'date', 'selection', 'from', 'to']
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
 * @param data
 * @param sort
 * @param sort.field
 * @param sort.direction
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
 * @param data
 * @param pagination
 * @param pagination.limit
 * @param pagination.offset
 */
export function applyPagination<T>(
  data: T[],
  pagination?: { limit: number; offset: number }
): T[] {
  if (!pagination) return data
  return data.slice(pagination.offset, pagination.offset + pagination.limit)
}

/**
 * Process data through all scope filters
 * Combines filter, sort, and pagination
 * @param data
 * @param scope
 * @param scope.filter
 * @param scope.sort
 * @param scope.sort.field
 * @param scope.sort.direction
 * @param scope.pagination
 * @param scope.pagination.limit
 * @param scope.pagination.offset
 */
export function processScopeData<T extends Record<string, any>>(
  data: T[],
  scope: {
    filter?: ScopeFilter
    sort?: { field: string; direction: 'asc' | 'desc' }
    pagination?: { limit: number; offset: number }
  }
): T[] {
  let result = data
  result = applyFilters(result, scope.filter)
  result = applySort(result, scope.sort)
  result = applyPagination(result, scope.pagination)
  return result
}
