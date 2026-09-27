/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { computed, type Ref } from 'vue'
import { InquiryGeneralIcons, StatusIcons } from '../../utils/icons.ts'
import type { useInquiryStore } from '../../stores/inquiry.ts'
import type { useAppSettingsStore } from '../../stores/appSettings.ts'
import type { InquiryStatus, InquiryType } from '../../Types/index.ts'
import type { InquiryGroupType } from '../stores/inquiryGroups.types.ts'

export interface InquiryFamily {
  id: number | string
  label: string
  inquiry_type: string
  icon?: string
  description?: string
}

export {
  getItemTitle,
  getItemStatus,
  getItemType,
  getItemFamily,
  getItemId,
  getForceLayouts,
  addLayoutToItem,
  removeLayoutFromItem,
  hasLayout,
  filterItemsByLayout,
  formatDateToISO,
  setTimelineDates,
  getTimelineStartDate,
  getTimelineEndDate,
  hasTimelineDates,
  addToTimeline,
  removeFromTimeline,
  getItemTypeIcon,
  getItemTypeIconComponent,
  getAvailableStatuses,
  getStatusColor,
  groupItemsByFamily,
  groupItemsByStatus,
  groupItemsByType,
  searchItemsByTitle,
  filterItemsByStatus,
  filterItemsByType
} from './GenericItemHelper'

export async function confirmAction(message: string): Promise<boolean> {
  return Promise.resolve(window.confirm(message))
}

// ============================================================================
// FONCTIONS FOR GENERIC FAMILY AND TYPES
// ============================================================================

/**
 * Get inquiry item data (works for both families and types)
 * @param item
 * @param fallbackLabel
 */
export function getInquiryGroupItemData(item: InquiryFamily | InquiryGroupType | null, fallbackLabel: string = '') {
  if (!item) {
    return {
      icon: InquiryGeneralIcons.Activity,
      label: fallbackLabel,
      description: ''
    }
  }

  const iconName = item?.icon || 
    ('group_type' in item ? 'AccountGroup' : 'FileDocumentEdit')

  return {
    icon: InquiryGeneralIcons[iconName] || StatusIcons[iconName] || InquiryGeneralIcons.Activity,
    label: item.label || fallbackLabel,
    description: item.description || ''
  }
}

/**
 * Get inquiry item data (works for both families and types)
 * @param item
 * @param fallbackLabel
 */
export function getInquiryItemData(item: InquiryFamily | InquiryType | null, fallbackLabel: string = '') {
  if (!item) {
    return {
      icon: InquiryGeneralIcons.Activity,
      label: fallbackLabel,
      description: ''
    }
  }

  const iconName = item?.icon || 
    ('inquiry_type' in item ? 'AccountGroup' : 'FileDocumentEdit')

  return {
    icon: InquiryGeneralIcons[iconName] || StatusIcons[iconName] || InquiryGeneralIcons.Activity,
    label: item.label || fallbackLabel,
    description: item.description || ''
  }
}

/**
 * Get inquiry type data from type string
 * @param inquiryType
 * @param inquiryTypes
 * @param fallbackLabel
 */
export function getInquiryTypeData(inquiryType: string, inquiryTypes: InquiryType[], fallbackLabel: string = '') {
  const typeInfo = inquiryTypes.find(t => t.inquiry_type === inquiryType)
  return getInquiryItemData(typeInfo, fallbackLabel || inquiryType)
}

export function getInquiryGroupTypeData(inquiryGroupType: string, inquiryGroupTypes: InquiryGroupType[], fallbackLabel: string = '') {
  const typeInfo = inquiryGroupTypes.find(t => t.group_type === inquiryGroupType)
  return getInquiryGroupItemData(typeInfo, fallbackLabel || inquiryGroupType)
}

// ============================================================================
// FONCTIONS FOR INQUIRY TYPES
// ============================================================================

/**
 * Get filtered inquiry types by family
 * @param selectedFamily
 * @param inquiryFamilies
 * @param inquiryTypes
 */
export function getFilteredInquiryTypes(
  selectedFamily: Ref<string | null>,
  inquiryFamilies: InquiryFamily[],
  inquiryTypes: InquiryType[],
) {
  return computed(() => {
    if (!selectedFamily.value) return []

    const family = inquiryFamilies.find(f => f.id.toString() === selectedFamily.value)
    if (!family) return []

    return inquiryTypes.filter(type =>
      type.family === family.inquiry_type 
    ) || []
  })
}
/**
 * Group inquiry group types by family
 * @param inquiryGroupTypes
 */
export function getInquiryGroupTypesByFamily(inquiryGroupTypes: InquiryGroupType[]) {
  const grouped: Record<string, InquiryGroupType[]> = {}

  inquiryGroupTypes.forEach(type => {
    const familyKey = type.family
    if (!grouped[familyKey]) {
      grouped[familyKey] = []
    }
    if (grouped[familyKey].is_root)
    	grouped[familyKey].push(type)
  })

  return grouped
}


/**
 * Group inquiry types by family
 * @param inquiryTypes
 */
export function getInquiryTypesByFamily(inquiryTypes: InquiryType[]) {
  const grouped: Record<string, InquiryType[]> = {}

  inquiryTypes.forEach(type => {
    const familyKey = type.family
    if (!grouped[familyKey]) {
      grouped[familyKey] = []
    }
    grouped[familyKey].push(type)
  })

  return grouped
}

/**
 * Get available transformation types for an inquiry type based on transform_response field
 * @param inquiryType
 * @param inquiryTypes
 */
export function getAvailableTransformTypes(inquiryType: string, inquiryTypes: InquiryType[]): InquiryType[] {
  const currentType = inquiryTypes.find(t => t.inquiry_type === inquiryType)
  if (!currentType || !currentType.allowed_transformation) return []

  // Parse allowed_response if it's a string (JSON)
  let allowedTransforms: string[] = []
  if (typeof currentType.allowed_transformation === 'string') {
    try {
      allowedTransforms = JSON.parse(currentType.allowed_transformation)
    } catch {
      allowedTransforms = []
    }
  } else if (Array.isArray(currentType.allowed_transformation)) {
    allowedTransforms = currentType.allowed_transformation
  }

  // Filter inquiry types that are in allowed_response
  return inquiryTypes.filter(type =>
    allowedTransforms.includes(type.inquiry_type)
  )
}

/**
 * Get available response types for an inquiry type based on allowed_response field
 * @param allTypes Array of all available inquiry group types
 * @param inquiryType The inquiry type to get allowed responses for
 */
export function getAllowedResponseGroupTypes(
  allTypes: InquiryGroupType[], 
  inquiryType: string
): InquiryGroupType[] {
  const currentType = allTypes.find(t => t.group_type === inquiryType)
  if (!currentType || !currentType.allowed_response) return []
  // Parse allowed_response if it's a string (JSON)
  let allowedResponses: string[] = []
  if (typeof currentType.allowed_response === 'string') {
    try {
      allowedResponses = JSON.parse(currentType.allowed_response)
    } catch {
  	console.log(" INTO GET ALLOWED RESPONSE CATCH ",allowedResponses )
      allowedResponses = []
    }
  } else if (Array.isArray(currentType.allowed_response)) {
  	console.log(" INTO THE ELSE OF GET ALLOWED RESPONSE CATCH ",allowedResponses )
    allowedResponses = currentType.allowed_response
  }
  console.log(" INTO GET ALLOWED RESPONSE ALL TYPE",allTypes)
  console.log(" INTO GET ALLOWED",allowedResponses)
  console.log(" INTO GET ALLOWED FILTERED", allTypes.filter(type =>
    allowedResponses.includes(type.group_typea)))

  // Filter inquiry types that are in allowed_response
   return allTypes.filter(type =>
    allowedResponses.includes(type.group_type)
  )
}
/**
 * Get available fields for an inquiry type based on fields
 * @param inquiryType
 * @param inquiryTypes
 */
export function getAvailableGroupFields(inquiryType: string, inquiryTypes: InquiryType[]): string[] {
  const currentType = inquiryTypes.find(t => t.group_type === inquiryType)
  if (!currentType || !currentType.fields) return []
  
  // Parse fields if it's a string (JSON)
  let fields: string[] = []
  if (typeof currentType.fields === 'string') {
    try {
      fields = JSON.parse(currentType.fields)
    } catch {
      fields = []
    }
  } else if (Array.isArray(currentType.fields)) {
    fields = currentType.fields
  }
  
  return fields
}


/**
 * Get available fields for an inquiry type based on fields
 * @param inquiryType
 * @param inquiryTypes
 */
export function getAvailableFields(inquiryType: string, inquiryTypes: InquiryType[]): string[] {
  const currentType = inquiryTypes.find(t => t.inquiry_type === inquiryType)
  if (!currentType || !currentType.fields) return []
  
  // Parse fields if it's a string (JSON)
  let fields: string[] = []
  if (typeof currentType.fields === 'string') {
    try {
      fields = JSON.parse(currentType.fields)
    } catch {
      fields = []
    }
  } else if (Array.isArray(currentType.fields)) {
    fields = currentType.fields
  }
  
  return fields
}

/**
 * Get available response types for an inquiry type based on allowed_response field
 * @param inquiryType
 * @param inquiryTypes
 */
export function getAvailableResponseTypes(inquiryType: string, inquiryTypes: InquiryType[]): InquiryType[] {
  const currentType = inquiryTypes.find(t => t.inquiry_type === inquiryType)
  if (!currentType || !currentType.allowed_response) return []

  // Parse allowed_response if it's a string (JSON)
  let allowedResponses: string[] = []
  if (typeof currentType.allowed_response === 'string') {
    try {
      allowedResponses = JSON.parse(currentType.allowed_response)
    } catch {
      allowedResponses = []
    }
  } else if (Array.isArray(currentType.allowed_response)) {
    allowedResponses = currentType.allowed_response
  }

  // Filter inquiry types that are in allowed_response
  return inquiryTypes.filter(type =>
    allowedResponses.includes(type.inquiry_type)
  )
}

/**
 * Get available inquiry group types for creation (is_root === true)
 * @param list
 */
export const getAvailableInquiryGroupTypesForCreation =
  (list: InquiryGroupType[]) => list.filter(t => t.is_root);


/**
 * Get available inquiry types for creation (filter out official and suggestion)
 * @param list
 */
export const getAvailableInquiryTypesForCreation =
  (list: InquiryType[]) => list.filter(t => t.is_root);


/**
 * Check if inquiry has final status based on appSettings.inquiryStatusTab
 * @param inquiryStore
 * @param appSettings
 */
export function isInquiryFinalStatus(inquiryStore: ReturnType<typeof useInquiryStore>, appSettings: ReturnType<typeof useAppSettingsStore>): boolean {
  if (!inquiryStore?.type || !inquiryStore?.status?.inquiryStatus || !appSettings?.inquiryStatusTab) {
    return false
  }

  const inquiryType = inquiryStore.type
  const currentStatus = inquiryStore.status.inquiryStatus

  // Find status configuration for this inquiry type and status
  const statusConfig = appSettings.inquiryStatusTab.find((status: InquiryStatus) => 
    status.inquiryType === inquiryType && status.statusKey === currentStatus
  )

  if (!statusConfig) {
    return false
  }

  return statusConfig.isFinal === true
}
/**
 * Get inquiry group types for specific family
 * @param familyInquiryType
 * @param inquiryGroupTypesByFamily
 */
export function getInquiryGroupTypesForFamily(
  familyInquiryType: string,
  inquiryGroupTypesByFamily: Record<string, InquiryType[]>,
) {
  const types = inquiryGroupTypesByFamily[familyInquiryType] || []
  console.log(" TYPES ", types)
  return types
}

/**
 * Get inquiry types for specific family
 * @param familyInquiryType
 * @param inquiryTypesByFamily
 */
export function getInquiryTypesForFamily(
  familyInquiryType: string,
  inquiryTypesByFamily: Record<string, InquiryType[]>,
) {
  const types = inquiryTypesByFamily[familyInquiryType] || []
  return types
}

/**
 * Count inquiry types by family
 * @param familyInquiryType
 * @param inquiryTypes
 */
export function countInquiryTypesByFamily(
  familyInquiryType: string,
  inquiryTypes: InquiryType[],
): number {
  return inquiryTypes.filter(type =>
    type.family === familyInquiryType
  ).length
}

/**
 * Get inquiry group type options for radio/select components
 * @param inquiryGroupTypes
 */
export function getInquiryGroupTypeOptions(inquiryGroupTypes: InquiryGroupType[]) {
  return inquiryGroupTypes.map(type => ({
    value: type.group_type,
    label: type.label,
    description: type.description,
  }))
}

/**
 * Get inquiry type options for radio/select components
 * @param inquiryTypes
 */
export function getInquiryTypeOptions(inquiryTypes: InquiryType[]) {
  return inquiryTypes.map(type => ({
    value: type.inquiry_type,
    label: type.label,
    description: type.description,
  }))
}

/**
 * Get family by inquiry type
 * @param inquiryType
 * @param inquiryTypes
 * @param inquiryFamilies
 */
export function getFamilyByInquiryType(inquiryType: string, inquiryTypes: InquiryType[], inquiryFamilies: InquiryFamily[]): InquiryFamily | null {
  const typeInfo = inquiryTypes.find(t => t.inquiry_type === inquiryType)
  if (!typeInfo) return null
  
  return inquiryFamilies.find(family => family.inquiry_type === typeInfo.family) || null
}
