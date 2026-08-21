/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { type Component } from 'vue'
import { InquiryOptionIcons, InquiryGeneralIcons } from '../../utils/icons.ts'
import type { Option, Inquiry } from '../../Types/index.ts'

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type GenericItem = Option | Inquiry

export interface GenericItemWithMiscFields extends GenericItem {
  miscFields?: Record<string, unknown>
}

// ============================================================================
// ITEM PROPERTY GETTERS
// ============================================================================

/**
 * Get the title of an item (works for both Option and Inquiry)
 * @param item
 */
export function getItemTitle(item: GenericItem | null | undefined): string {
  if (!item) return ''
  if ('title' in item && item.title) return item.title
  if ('label' in item && item.label) return item.label
  return `Item #${item.id}`
}

/**
 * Get the status of an item (works for both Option and Inquiry)
 * @param item
 */
export function getItemStatus(item: GenericItem | null | undefined): string {
  if (!item) return 'draft'
  
  if ('status' in item && item.status) {
    if (typeof item.status === 'object' && 'optionStatus' in item.status) {
      return item.status.optionStatus || 'draft'
    }
    if (typeof item.status === 'string') {
      return item.status
    }
  }
  return 'draft'
}

/**
 * Get the type of an item (works for both Option and Inquiry)
 * @param item
 */
export function getItemType(item: GenericItem | null | undefined): string {
  if (!item) return 'text'
  if ('type' in item && item.type) return item.type
  if ('inquiry_type' in item && item.inquiry_type) return item.inquiry_type
  return 'text'
}

/**
 * Get the family of an item (works for both Option and Inquiry)
 * @param item
 */
export function getItemFamily(item: GenericItem | null | undefined): string {
  if (!item) return 'default'
  if ('family' in item && item.family) return item.family
  return 'default'
}

/**
 * Get the ID of an item (works for both Option and Inquiry)
 * @param item
 */
export function getItemId(item: GenericItem | null | undefined): number | null {
  if (!item) return null
  return item.id
}

// ============================================================================
// LAYOUT HELPERS
// ============================================================================

/**
 * Get force_layouts from an item's miscFields (works for both Option and Inquiry)
 * @param item
 */
export function getForceLayouts(item: GenericItemWithMiscFields | null | undefined): string[] {
  if (!item?.miscFields?.force_layouts) return []
  
  const forceLayouts = item.miscFields.force_layouts
  
  if (typeof forceLayouts === 'string') {
    try {
      const parsed = JSON.parse(forceLayouts)
      if (Array.isArray(parsed)) return parsed
      if (typeof parsed === 'string') return [parsed]
      return []
    } catch {
      return [forceLayouts]
    }
  }
  
  if (Array.isArray(forceLayouts)) {
    return forceLayouts
  }
  
  return []
}

/**
 * Add a layout to an item's force_layouts
 * @param item
 * @param layout
 */
export function addLayoutToItem<T extends GenericItemWithMiscFields>(
  item: T,
  layout: string
): T {
  const miscFields = { ...(item.miscFields || {}) }
  const currentLayouts = getForceLayouts(item)
  
  if (!currentLayouts.includes(layout)) {
    currentLayouts.push(layout)
    miscFields.force_layouts = JSON.stringify(currentLayouts)
  }
  
  return {
    ...item,
    miscFields
  }
}

/**
 * Remove a layout from an item's force_layouts
 * @param item
 * @param layout
 */
export function removeLayoutFromItem<T extends GenericItemWithMiscFields>(
  item: T,
  layout: string
): T {
  const miscFields = { ...(item.miscFields || {}) }
  const currentLayouts = getForceLayouts(item)
  const updatedLayouts = currentLayouts.filter(l => l !== layout)
  
  if (updatedLayouts.length === 0) {
    delete miscFields.force_layouts
  } else {
    miscFields.force_layouts = JSON.stringify(updatedLayouts)
  }
  
  return {
    ...item,
    miscFields
  }
}

/**
 * Check if an item has a specific layout
 * @param item
 * @param layout
 */
export function hasLayout(item: GenericItemWithMiscFields | null | undefined, layout: string): boolean {
  if (!item) return false
  const layouts = getForceLayouts(item)
  return layouts.includes(layout)
}

/**
 * Filter items by layout
 * Shows items that:
 * 1. Belong to the target family (if specified), OR
 * 2. Have force_layouts containing this layout
 * @param items
 * @param layout
 * @param targetFamily
 */
export function filterItemsByLayout<T extends GenericItemWithMiscFields>(
  items: T[],
  layout: string,
  targetFamily?: string
): T[] {
  return items.filter(item => {
    const forceLayouts = getForceLayouts(item)
    const hasForceLayout = forceLayouts.includes(layout)

    // Check if item belongs to target family
    const isTargetFamily = targetFamily ? (getItemFamily(item) === targetFamily) : false

    return isTargetFamily || hasForceLayout
  })
}

// ============================================================================
// TIMELINE HELPERS
// ============================================================================

/**
 * Format a date to YYYY-MM-DD string
 * @param date
 */
export function formatDateToISO(date: Date | string | null): string | null {
  if (!date) return null

  let dateObj: Date

  if (date instanceof Date) {
    dateObj = date
  } else if (typeof date === 'string') {
    dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) return null
  } else {
    return null
  }

  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Set timeline dates on an item
 * @param item
 * @param startDate
 * @param endDate
 */
export function setTimelineDates<T extends GenericItemWithMiscFields>(
  item: T,
  startDate: Date | string | null,
  endDate?: Date | string | null
): T {
  const miscFields = { ...(item.miscFields || {}) }
  
  // Set start date
  if (startDate) {
    const formattedStart = formatDateToISO(startDate)
    if (formattedStart) {
      miscFields.start_date = formattedStart
    }
  } else if (startDate === null) {
    delete miscFields.start_date
  }
  
  // Set end date (if provided)
  if (endDate !== undefined) {
    if (endDate === null) {
      delete miscFields.end_date
    } else {
      const formattedEnd = formatDateToISO(endDate)
      if (formattedEnd) {
        miscFields.end_date = formattedEnd
      }
    }
  }
  
  return {
    ...item,
    miscFields
  }
}

/**
 * Get timeline start date from an item
 * @param item
 */
export function getTimelineStartDate(item: GenericItemWithMiscFields | null | undefined): Date | null {
  if (!item) return null
  
  const miscFields = item.miscFields || {}
  
  // Check multiple possible date fields
  const dateStr = miscFields.start_date || 
                  miscFields.voting_start || 
                  miscFields.support_start
  
  if (!dateStr) return null
  
  try {
    if (typeof dateStr === 'string') {
      const date = new Date(dateStr)
      return isNaN(date.getTime()) ? null : date
    }
    if (typeof dateStr === 'number') {
      const timestamp = dateStr < 10000000000 ? dateStr * 1000 : dateStr
      const date = new Date(timestamp)
      return isNaN(date.getTime()) ? null : date
    }
    if (dateStr instanceof Date) {
      return isNaN(dateStr.getTime()) ? null : dateStr
    }
    return null
  } catch {
    return null
  }
}

/**
 * Get timeline end date from an item
 * @param item
 */
export function getTimelineEndDate(item: GenericItemWithMiscFields | null | undefined): Date | null {
  if (!item) return null
  
  const miscFields = item.miscFields || {}
  const dateStr = miscFields.end_date
  
  if (!dateStr) return null
  
  try {
    if (typeof dateStr === 'string') {
      const date = new Date(dateStr)
      return isNaN(date.getTime()) ? null : date
    }
    if (typeof dateStr === 'number') {
      const timestamp = dateStr < 10000000000 ? dateStr * 1000 : dateStr
      const date = new Date(timestamp)
      return isNaN(date.getTime()) ? null : date
    }
    if (dateStr instanceof Date) {
      return isNaN(dateStr.getTime()) ? null : dateStr
    }
    return null
  } catch {
    return null
  }
}

/**
 * Check if an item has timeline dates set
 * @param item
 */
export function hasTimelineDates(item: GenericItemWithMiscFields | null | undefined): boolean {
  return getTimelineStartDate(item) !== null
}

/**
 * Add an item to timeline (sets dates and adds to force_layouts)
 * @param item
 * @param startDate
 * @param endDate
 */
export function addToTimeline<T extends GenericItemWithMiscFields>(
  item: T,
  startDate: Date | string,
  endDate?: Date | string | null
): T {
  let updatedItem = setTimelineDates(item, startDate, endDate)
  updatedItem = addLayoutToItem(updatedItem, 'timeline')
  return updatedItem
}

/**
 * Remove an item from timeline (removes timeline from force_layouts)
 * @param item
 */
export function removeFromTimeline<T extends GenericItemWithMiscFields>(item: T): T {
  return removeLayoutFromItem(item, 'timeline')
}

// ============================================================================
// ICON HELPERS
// ============================================================================

/**
 * Get the icon name for an item type
 * @param type
 * @param optionTypes
 */
export function getItemTypeIcon(
  type: string | null | undefined,
  optionTypes: Array<{ option_type: string; icon?: string }>
): string {
  if (!type) return 'File'
  
  // Try to find in option types first
  const found = optionTypes.find(opt => opt.option_type === type)
  if (found?.icon) {
    return found.icon
  }
  
  // Fallback based on type
  const typeIcons: Record<string, string> = {
    'text': 'FileText',
    'date': 'Calendar',
    'location': 'MapPin',
    'user': 'User',
    'group': 'AccountGroup',
    'file': 'File',
    'link': 'Link',
    'number': 'Number',
    'boolean': 'Checkbox',
    'color': 'Palette',
    'image': 'Image',
    'debate': 'Discussion',
    'structure': 'Settings',
    'consensus': 'ThumbUp',
    'decision': 'Checkmark',
    'proposal': 'Lightbulb',
    'workflow': 'BarChart2',
    'process': 'Timeline',
    'vote': 'Vote'
  }
  
  return typeIcons[type] || 'File'
}

/**
 * Get the icon component for an item type
 * @param type
 * @param optionTypes
 */
export function getItemTypeIconComponent(
  type: string | null | undefined,
  optionTypes: Array<{ option_type: string; icon?: string }>
): Component {
  const iconName = getItemTypeIcon(type, optionTypes)
  return InquiryOptionIcons[iconName] || InquiryGeneralIcons[iconName] || InquiryGeneralIcons.File
}

// ============================================================================
// STATUS HELPERS
// ============================================================================

/**
 * Get available statuses for an item type
 * @param itemType
 * @param optionTypes
 */
export function getAvailableStatuses(
  itemType: string | null | undefined,
  optionTypes: Array<{ option_type: string; statuses?: string[] | string }>
): string[] {
  if (!itemType) return ['draft', 'active', 'completed', 'cancelled']
  
  const found = optionTypes.find(opt => opt.option_type === itemType)
  if (!found?.statuses) return ['draft', 'active', 'completed', 'cancelled']
  
  if (typeof found.statuses === 'string') {
    try {
      const parsed = JSON.parse(found.statuses)
      return Array.isArray(parsed) ? parsed : ['draft', 'active', 'completed', 'cancelled']
    } catch {
      return ['draft', 'active', 'completed', 'cancelled']
    }
  }
  
  return Array.isArray(found.statuses) ? found.statuses : ['draft', 'active', 'completed', 'cancelled']
}

/**
 * Get status color
 * @param status
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    draft: '#949494',
    active: '#3498db',
    completed: '#27ae60',
    cancelled: '#e74c3c',
    pending: '#f39c12',
    approved: '#2ecc71',
    rejected: '#e74c3c',
    archived: '#95a5a6'
  }
  return colors[status] || '#949494'
}

// ============================================================================
// GROUPING HELPERS
// ============================================================================

/**
 * Group items by family
 * @param items
 */
export function groupItemsByFamily<T extends GenericItem>(items: T[]): Record<string, T[]> {
  const grouped: Record<string, T[]> = {}
  
  items.forEach(item => {
    const family = getItemFamily(item) || 'default'
    if (!grouped[family]) {
      grouped[family] = []
    }
    grouped[family].push(item)
  })
  
  return grouped
}

/**
 * Group items by status
 * @param items
 */
export function groupItemsByStatus<T extends GenericItem>(items: T[]): Record<string, T[]> {
  const grouped: Record<string, T[]> = {}
  
  items.forEach(item => {
    const status = getItemStatus(item)
    if (!grouped[status]) {
      grouped[status] = []
    }
    grouped[status].push(item)
  })
  
  return grouped
}

/**
 * Group items by type
 * @param items
 */
export function groupItemsByType<T extends GenericItem>(items: T[]): Record<string, T[]> {
  const grouped: Record<string, T[]> = {}
  
  items.forEach(item => {
    const type = getItemType(item)
    if (!grouped[type]) {
      grouped[type] = []
    }
    grouped[type].push(item)
  })
  
  return grouped
}

// ============================================================================
// SEARCH/FILTER HELPERS
// ============================================================================

/**
 * Search items by title
 * @param items
 * @param searchTerm
 */
export function searchItemsByTitle<T extends GenericItem>(
  items: T[],
  searchTerm: string
): T[] {
  if (!searchTerm) return items
  
  const term = searchTerm.toLowerCase()
  return items.filter(item => {
    const title = getItemTitle(item).toLowerCase()
    return title.includes(term)
  })
}

/**
 * Filter items by status
 * @param items
 * @param statuses
 */
export function filterItemsByStatus<T extends GenericItem>(
  items: T[],
  statuses: string[]
): T[] {
  if (!statuses || statuses.length === 0) return items
  
  return items.filter(item => {
    const status = getItemStatus(item)
    return statuses.includes(status)
  })
}

/**
 * Filter items by type
 * @param items
 * @param types
 */
export function filterItemsByType<T extends GenericItem>(
  items: T[],
  types: string[]
): T[] {
  if (!types || types.length === 0) return items
  
  return items.filter(item => {
    const type = getItemType(item)
    return types.includes(type)
  })
}
