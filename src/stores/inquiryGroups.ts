/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Inquiry } from '../Types/index'
import { useSessionStore } from './session'
import { useInquiriesStore } from './inquiries'
import { orderBy } from 'lodash'
import type { InquiryGroup } from './inquiryGroups.types'
import { InquiryGroupsAPI } from '../Api'
import { AxiosError } from 'axios'
import { Logger } from '../helpers'
import { t } from '@nextcloud/l10n'

export const useInquiryGroupsStore = defineStore('inquiryGroups', () => {
  const inquiryGroups = ref<InquiryGroup[]>([])
  const updating = ref(false)
  const selectedGroupType = ref<string>('')
  const currentInquiryGroupId = ref<number | null>(null)

  const defaultGroupType = computed(() => getDefaultGroupTypeFromFamily())
  const currentGroupType = computed(() => selectedGroupType.value || defaultGroupType.value)

  // ===== SINGLE DEFINITION OF addOrUpdateInquiryGroupInList =====
  function addOrUpdateInquiryGroupInList(payload: { inquiryGroup: InquiryGroup }) {
    const index = inquiryGroups.value.findIndex(g => g.id === payload.inquiryGroup.id)
    if (index === -1) {
      inquiryGroups.value.push(payload.inquiryGroup)
    } else {
      inquiryGroups.value[index] = { ...inquiryGroups.value[index], ...payload.inquiryGroup }
    }
    // Trigger reactivity
    inquiryGroups.value = [...inquiryGroups.value]
  }

  function addInquiryGroup(group: InquiryGroup) {
    addOrUpdateInquiryGroupInList({ inquiryGroup: group })
  }

  function updateInquiryGroup(updatedGroup: InquiryGroup) {
    addOrUpdateInquiryGroupInList({ inquiryGroup: updatedGroup })
  }

  function removeInquiryGroup(groupId: number) {
    inquiryGroups.value = inquiryGroups.value.filter(g => g.id !== groupId)
  }

  // ===== GETTERS =====
  const bySlug = (slug: string): InquiryGroup | undefined => {
    if (!slug || slug === 'none' || slug === 'undefined') return undefined
    
    let group = inquiryGroups.value.find(g => g.slug === slug)
    
    if (!group) {
      const lowerSlug = slug.toLowerCase()
      group = inquiryGroups.value.find(g => g.slug?.toLowerCase() === lowerSlug)
    }
    
    if (!group && !isNaN(Number(slug))) {
      group = inquiryGroups.value.find(g => g.id === Number(slug))
    }
    
    return group
  }

  const byId = (id: number): InquiryGroup | undefined => 
    inquiryGroups.value.find(g => g.id === id)

  const byType = (type: string): InquiryGroup[] => 
    inquiryGroups.value.filter(g => g.type === type)

  const byParentId = (parentId: number | null): InquiryGroup[] => 
    inquiryGroups.value.filter(g => g.parentId === parentId)

  /**
   * Currently selected inquiry group or undefined if not in an inquiry group route
   */
  const currentInquiryGroup = computed((): InquiryGroup | undefined => {
    const sessionStore = useSessionStore()
    if (sessionStore.route.name === 'group' || sessionStore.route.name === 'group-list') {
      const slug = sessionStore.route.params.slug as string
      if (slug && slug !== 'none') {
        return bySlug(slug)
      }
      if (sessionStore.route.params.id) {
        return byId(Number(sessionStore.route.params.id))
      }
    }
    return undefined
  })

  /**
   * Get inquiries in the current inquiry group
   */
  const inquiriesInCurrentInquiryGroup = computed((): Inquiry[] => {
    const group = currentInquiryGroup.value
    if (!group) return []
    const inquiriesStore = useInquiriesStore()
    return inquiriesStore.inquiries.filter(inquiry => 
      group.inquiryIds?.includes(inquiry.id)
    )
  })

  /**
   * Get parent groups of the current inquiry group
   */
  const parentGroups = computed((): InquiryGroup[] => {
    const group = currentInquiryGroup.value
    if (!group) return []
    
    const parents: InquiryGroup[] = []
    let current = group
    while (current.parentId) {
      const parent = byId(current.parentId)
      if (parent) {
        parents.unshift(parent)
        current = parent
      } else {
        break
      }
    }
    return parents
  })

  /**
   * Get child groups of a specific group or current group
   */
  const childGroups = computed((): InquiryGroup[] => {
    const group = currentInquiryGroup.value
    if (!group) return []
    return inquiryGroups.value.filter(g => g.parentId === group.id)
  })

  /**
   * Get all descendant groups (children, grandchildren, etc.)
   */
  const descendantGroups = computed((): InquiryGroup[] => {
    const group = currentInquiryGroup.value
    if (!group) return []
    
    const descendants: InquiryGroup[] = []
    const queue = [group.id]
    
    while (queue.length > 0) {
      const currentId = queue.shift()!
      const children = inquiryGroups.value.filter(g => g.parentId === currentId)
      for (const child of children) {
        descendants.push(child)
        queue.push(child.id)
      }
    }
    
    return descendants
  })

  /**
   * Get root groups (groups with no parent)
   */
  const rootGroups = computed((): InquiryGroup[] => inquiryGroups.value.filter(g => g.parentId === null || g.parentId === 0))

  /**
   * Get groups that have children
   */
  const withChildren = computed((): InquiryGroup[] => {
    const childIds = new Set(inquiryGroups.value.map(g => g.parentId).filter(id => id !== null))
    return inquiryGroups.value.filter(g => childIds.has(g.id))
  })

  /**
   * Get inquiry groups sorted by visibility priority (everyone first) and title
   * Also filters by the current family type if set
   */
  const inquiryGroupsSorted = computed((): InquiryGroup[] => {
    const inquiriesStore = useInquiriesStore()
    const sessionStore = useSessionStore()
    const currentFamily = inquiriesStore.advancedFilters?.familyType
    
    let filteredGroups = inquiryGroups.value

    if (currentFamily) {
      const typeTabs = sessionStore.appSettings?.inquiryGroupTypeTab || []
      const typesForFamily = typeTabs
        .filter((tab: any) => tab.family === currentFamily)
        .map((tab: any) => tab.type || tab.group_type)

      if (typesForFamily.length > 0) {
        filteredGroups = inquiryGroups.value.filter(group =>
          typesForFamily.includes(group.type) && group.is_root === true
        )
      }
    }

    // Sort by visibility priority and then by title
    const everyoneGroups = filteredGroups.filter(g => g.configuration?.visibility === 'everyone')

    return [
      ...orderBy(everyoneGroups, ['title'], ['asc']),
    ]
  })

  /**
   * Count inquiries in each inquiry group
   */
  const countInquiriesInInquiryGroups = computed((): Map<number, number> => {
    const counts = new Map<number, number>()
    for (const group of inquiryGroups.value) {
      counts.set(group.id, group.inquiryIds?.length || 0)
    }
    return counts
  })


/**
 * Get groups by family
 * @param family
 */
const byFamily = (family: string): InquiryGroup[] => inquiryGroups.value.filter(g => g.family === family)

/**
 * Group inquiry groups by family
 */
const groupsByFamily = computed((): Record<string, InquiryGroup[]> => {
  const result: Record<string, InquiryGroup[]> = {}
  for (const group of inquiryGroups.value) {
    const family = group.family || 'uncategorized'
    if (!result[family]) {
      result[family] = []
    }
    result[family].push(group)
  }
  return result
})

/**
 * Get families with their group counts as an array
 */
const familySummary = computed(() => {
  const summary: Array<{ family: string; count: number; groups: InquiryGroup[] }> = []
  const grouped = groupsByFamily.value
  for (const [family, groups] of Object.entries(grouped)) {
    summary.push({
      family,
      count: groups.length,
      groups
    })
  }
  // Sort by count descending
  return summary.sort((a, b) => b.count - a.count)
})

/**
 * Get groups by family type (using the type template family)
 * @param familyType
 */
const byFamilyType = (familyType: string): InquiryGroup[] => {
  const sessionStore = useSessionStore()
  const typeTabs = sessionStore.appSettings?.inquiryGroupTypeTab || []

  // Get all types that belong to this family
  const typesForFamily = typeTabs
    .filter((tab: any) => tab.family === familyType)
    .map((tab: any) => tab.type || tab.group_type)

  if (typesForFamily.length === 0) return []

  return inquiryGroups.value.filter(group =>
    typesForFamily.includes(group.type)
  )
}

  /**
   * Get groups that can be added to (for creating child groups)
   */
  const addableInquiryGroups = computed((): InquiryGroup[] => {
    const sessionStore = useSessionStore()
    const isAdmin = sessionStore.currentUser.type === 'admin'
    const isEditor = sessionStore.currentUser.isGroupEditor
    
    return inquiryGroups.value.filter(group => {
      // Can add if user is admin, editor, or owner
      const isOwner = group.owner?.id === sessionStore.currentUser.id
      return (isAdmin || isEditor || isOwner) && group.groupStatus !== 'archived'
    })
  })

  // ===== ACTIONS =====
  function getDefaultGroupTypeFromFamily(): string {
    const sessionStore = useSessionStore()
    const inquiriesStore = useInquiriesStore()

    const selectedFamily = inquiriesStore.advancedFilters?.familyType
    const typeTabs = sessionStore.appSettings?.inquiryGroupTypeTab || []

    if (typeTabs.length === 0) return ''

    if (selectedFamily) {
      const matchingType = typeTabs.find((type: any) => type.family === selectedFamily)
      if (matchingType) return matchingType.type
    }

    return typeTabs[0].type
  }

  async function fetchAllGroups(): Promise<InquiryGroup[]> {
    try {
      updating.value = true
      
      const response = await InquiryGroupsAPI.getAllGroups()
      const groups = response.data.groups || []
      
      const sessionStore = useSessionStore()
      if (sessionStore.appSettings?.inquiryGroupTypeTab?.length > 0) {
        selectedGroupType.value = getDefaultGroupTypeFromFamily()
      }
      
      inquiryGroups.value = groups
      ensureSlugs()
      
      return groups
    } catch (error) {
      if ((error as AxiosError)?.code === 'ERR_CANCELED') {
        return inquiryGroups.value
      }
      Logger.error('Error fetching all groups', { error })
      throw error
    } finally {
      updating.value = false
    }
  }

  /**
   * Load a specific group by slug or ID
   * @param slugOrId
   */
  async function loadGroup(slugOrId: string | number): Promise<InquiryGroup | undefined> {
    const group = typeof slugOrId === 'string' 
      ? bySlug(slugOrId) 
      : byId(slugOrId)
    
    if (group) return group
    
    // Not found in local store, fetch from API
    try {
      const response = await InquiryGroupsAPI.getInquiryGroup(
        typeof slugOrId === 'string' ? parseInt(slugOrId) : slugOrId
      )
      if (response.data?.inquiryGroup) {
        const fetchedGroup = response.data.inquiryGroup
        addOrUpdateInquiryGroupInList({ inquiryGroup: fetchedGroup })
        return fetchedGroup
      }
    } catch (error) {
      Logger.error('Error loading group', { error, slugOrId })
      throw error
    }
    return undefined
  }

  function generateSlug(text: string, id?: number): string {
    if (!text) return ''
    
    let slug = text
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-')
    
    if (id) slug = `${slug}-${id}`
    return slug
  }

  function ensureSlugs(): void {
    inquiryGroups.value = inquiryGroups.value.map(group => {
      if (!group.slug) {
        return {
          ...group,
          slug: generateSlug(group.title || '', group.id)
        }
      }
      return group
    })
  }

  function getInquiryGroupName(groupId: number): string {
    const group = inquiryGroups.value.find(g => g.id === groupId)
    return group?.title || t('inquiries', 'Invalid Group ID')
  }

  /**
   * Set the current group type
   * @param type
   */
  function setCurrentGroupType(type: string): void {
    selectedGroupType.value = type
  }

  /**
   * Set the current inquiry group by ID
   * @param groupId
   */
  function setCurrentInquiryGroup(groupId: number): void {
    currentInquiryGroupId.value = groupId
  }

  /**
   * Write changes to the current inquiry group
   * @param payload
   */
  async function writeCurrentInquiryGroup(payload: Partial<InquiryGroup>): Promise<void> {
    const group = currentInquiryGroup.value
    if (!group) {
      Logger.error('No current inquiry group to write')
      return
    }
    
    try {
      const response = await InquiryGroupsAPI.updateGroup(group.id, payload)
      if (response.data?.inquiryGroup) {
        updateInquiryGroup(response.data.inquiryGroup)
      }
    } catch (error) {
      Logger.error('Error writing inquiry group', { error, payload })
      throw error
    }
  }

  /**
   * Add an inquiry to an inquiry group
   * @param groupId
   * @param inquiryId
   */
  async function addInquiryToInquiryGroup(groupId: number, inquiryId: number): Promise<void> {
    try {
      const response = await InquiryGroupsAPI.addInquiryToGroup(inquiryId, groupId)
      if (response.data?.inquiryGroup) {
        updateInquiryGroup(response.data.inquiryGroup)
      }
    } catch (error) {
      Logger.error('Error adding inquiry to group', { error, groupId, inquiryId })
      throw error
    }
  }

  /**
   * Remove an inquiry from an inquiry group
   * @param groupId
   * @param inquiryId
   */
  async function removeInquiryFromGroup(groupId: number, inquiryId: number): Promise<void> {
    try {
      const response = await InquiryGroupsAPI.removeInquiryFromGroup(groupId, inquiryId)
      if (response.data?.inquiryGroup === null) {
        // Group was deleted because it became empty
        removeInquiryGroup(groupId)
      } else if (response.data?.inquiryGroup) {
        updateInquiryGroup(response.data.inquiryGroup)
      }
    } catch (error) {
      Logger.error('Error removing inquiry from group', { error, groupId, inquiryId })
      throw error
    }
  }

  // ===== RETURN =====
  return {
    // State
    inquiryGroups,
    updating,
    selectedGroupType,
    currentGroupType,
    currentInquiryGroupId,
    
    // Getters
    bySlug,
    byId,
    byType,
    byParentId,
    currentInquiryGroup,
    inquiriesInCurrentInquiryGroup,
    parentGroups,
    childGroups,
    descendantGroups,
    rootGroups,
    withChildren,
    inquiryGroupsSorted,
    countInquiriesInInquiryGroups,
    addableInquiryGroups,
   
   byFamily,
  groupsByFamily,
  familySummary,
  byFamilyType,

    // Actions
    addInquiryGroup,
    updateInquiryGroup,
    removeInquiryGroup,
    addOrUpdateInquiryGroupInList,
    fetchAllGroups,
    loadGroup,
    generateSlug,
    ensureSlugs,
    getInquiryGroupName,
    setCurrentGroupType,
    setCurrentInquiryGroup,
    writeCurrentInquiryGroup,
    addInquiryToInquiryGroup,
    removeInquiryFromGroup,
  }
})
