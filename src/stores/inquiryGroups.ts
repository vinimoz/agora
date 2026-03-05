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

   const defaultGroupType = computed(() => {
    const sessionStore = useSessionStore()
    if (sessionStore.appSettings?.inquiryGroupTypeTab?.length > 0) {
      return sessionStore.appSettings.inquiryGroupTypeTab[0].group_type
    }
    return ''
  })
  
  // Current group type to use (selected or default)
  const currentGroupType = computed(() => selectedGroupType.value || defaultGroupType.value)


   function addInquiryGroup(group: InquiryGroup) {
        const exists = inquiryGroups.value.some(g => g.id === group.id)
        if (!exists) {
            inquiryGroups.value.push(group)
        }
    }

     function updateInquiryGroup(updatedGroup: InquiryGroup) {
        const index = inquiryGroups.value.findIndex(
            g => g.id === updatedGroup.id
        )

        if (index === -1) {
            inquiryGroups.value.push(updatedGroup)
            return
        }

        inquiryGroups.value[index] = {
            ...inquiryGroups.value[index],
            ...updatedGroup,
        }
    }

  /**
   * Get inquiry group by slug
   * @param {string} slug - The slug to search for
   * @return {InquiryGroup | undefined} The inquiry group with matching slug, or undefined if not found
   */
  const bySlug = (slug: string): InquiryGroup | undefined => {
    if (!slug || slug === 'none' || slug === 'undefined') {
      return undefined
    }
    
    // First try exact match
    let group = inquiryGroups.value.find(g => g.slug === slug)
    
    // If not found, try case-insensitive search
    if (!group) {
      const lowerSlug = slug.toLowerCase()
      group = inquiryGroups.value.find(g => 
        g.slug?.toLowerCase() === lowerSlug
      )
    }
    
    // Try to find by name if slug not found
    if (!group) {
      const slugFromName = slug.toLowerCase().replace(/[^a-z0-9]/g, '-')
      group = inquiryGroups.value.find(g => {
        if (!g.name) return false
        const groupSlug = g.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
        return groupSlug === slugFromName
      })
    }
    
    // If still not found and slug is numeric, try by ID
    if (!group && !isNaN(Number(slug))) {
      group = inquiryGroups.value.find(g => g.id === Number(slug))
    }
    
    return group
  }

  /**
   * Get inquiry group by ID
   * @param {number} id - The ID to search for
   * @return {InquiryGroup | undefined} The inquiry group with matching ID, or undefined if not found
   */
  const byId = (id: number): InquiryGroup | undefined => inquiryGroups.value.find(g => g.id === id)

  const setCurrentGroupType = (type: string) => {
    selectedGroupType.value = type
  }

  /**
   * Get inquiry groups by type
   * @param {string} type - The group type to filter by
   * @return {InquiryGroup[]} Array of inquiry groups with matching type
   */
  const byType = (type: string): InquiryGroup[] => inquiryGroups.value.filter(g => g.type === type)

  /**
   * Get inquiry groups by parent ID
   * @param {number | null} parentId - The parent ID to filter by (null for root groups)
   * @return {InquiryGroup[]} Array of inquiry groups with matching parent ID
   */
  const byParentId = (parentId: number | null): InquiryGroup[] => inquiryGroups.value.filter(g => g.parentId === parentId)

  /**
   * Get inquiry groups with their child groups populated
   * @return {InquiryGroup[]} Array of inquiry groups with children property
   */
  const withChildren = computed((): InquiryGroup[] => inquiryGroups.value.map(group => ({
      ...group,
      children: inquiryGroups.value.filter(g => g.parentId === group.id).map(g => g.id)
    })))

  /**
   * Currently selected inquiry group or undefined if not in an inquiry group route
   * @return {InquiryGroup | undefined} The current inquiry group if in a group route, otherwise undefined
   */
  const currentInquiryGroup = computed((): InquiryGroup | undefined => {
    const sessionStore = useSessionStore()
    if (sessionStore.route.name === 'group' || sessionStore.route.name === 'group-list') {
      // Try to get by slug from route parameter
      const slug = sessionStore.route.params.slug as string
      if (slug && slug !== 'none') {
        return bySlug(slug)
      }
      // Fallback to ID if slug not found
      if (sessionStore.route.params.id) {
        return byId(Number(sessionStore.route.params.id))
      }
    }
    return undefined
  })

  /**
   * Parent groups hierarchy for current group
   * @return {InquiryGroup[]} Array of parent groups from root to direct parent
   */
  const parentGroups = computed((): InquiryGroup[] => {
    if (!currentInquiryGroup.value) return []
    
    const parents: InquiryGroup[] = []
    let currentGroup = currentInquiryGroup.value
    
    while (currentGroup.parentId) {
      const parent = byId(currentGroup.parentId)
      if (parent) {
        parents.unshift(parent) // Add to beginning to maintain order
        currentGroup = parent
      } else {
        break
      }
    }
    
    return parents
  })

  /**
   * Child groups for current group
   * @return {InquiryGroup[]} Array of direct child groups
   */
  const childGroups = computed((): InquiryGroup[] => {
    if (!currentInquiryGroup.value) return []
    return byParentId(currentInquiryGroup.value.id)
  })


  /**
   * All descendant groups (children, grandchildren, etc.)
   * @return {InquiryGroup[]} Array of all descendant groups
   */
  const descendantGroups = computed((): InquiryGroup[] => {
    const getDescendants = (groupId: number): InquiryGroup[] => {
      const children = byParentId(groupId)
      return children.reduce((descendants, child) => [...descendants, child, ...getDescendants(child.id)], [] as InquiryGroup[])
    }
    
    if (!currentInquiryGroup.value) return []
    return getDescendants(currentInquiryGroup.value.id)
  })

  /**
   * Root groups (groups with no parent)
   * @return {InquiryGroup[]} Array of root groups
   */
  const rootGroups = computed((): InquiryGroup[] => byParentId(null))

  /**
   * Sort inquiry groups by title in ascending order
   * @return {InquiryGroup[]} Sorted inquiry groups, sorted by title in ascending order
   */
const inquiryGroupsSorted = computed((): InquiryGroup[] =>
  orderBy(
    inquiryGroups.value.filter((group) =>
      group.type === 'private' &&
      countInquiriesInInquiryGroups.value[group.id] > 0
    ),
    ['title'],
    ['asc']
  )
)


  const inquiriesInCurrentInquiryGroup = computed((): Inquiry[] => {
    const inquiriesStore = useInquiriesStore()
    if (!currentInquiryGroup.value) {
      return []
    }
    return inquiriesStore.inquiries.filter((inquiry) =>
      currentInquiryGroup.value?.inquiryIds.includes(inquiry.id)
    )
  })

  /**
   * Count of inquiries in each inquiry group and return inquirygroupid and count as list
   * with the inquirygroupid as key and the count as value
   * @return {Record<number, number>} An object where the keys are inquiry group IDs and the values are the counts of inquiries in those groups
   */
  const countInquiriesInInquiryGroups = computed((): Record<number, number> => {
    const counts: Record<number, number> = {}
    const inquiriesStore = useInquiriesStore()
    inquiryGroups.value.forEach((group) => {
      counts[group.id] = inquiriesStore.inquiries.filter((inquiry) =>
        group.inquiryIds.includes(inquiry.id)
      ).length
    })
    return counts
  })


/**
 * Load a specific group by slug - first checks store, loads from server if needed
 * @param {string} slug - The slug of the group to load
 * @param {boolean} forceRefresh - Whether to force reload from server
 * @return {Promise<InquiryGroup | null>} The loaded group or null if not found
 */
async function loadGroup(slug: string, forceRefresh: boolean = false): Promise<InquiryGroup | null> {
  try {
    updating.value = true
   
     
    // If we're forcing a refresh or store is empty, fetch from server
    if (forceRefresh || inquiryGroups.value.length === 0) {
      return await loadGroupFromServer(slug)
    }
    
    // Check in local store first
    const localGroup = bySlug(slug)
    if (localGroup) {
      return localGroup
    }
    
    // Try alternative slug formats
    
    // Not found locally, try server
    // return await loadGroupFromServer(slug)
    
  } catch (error) {
    Logger.error('Error loading group by slug', {
      error,
      slug
    })
    return null
  } finally {
    updating.value = false
  }
}

/**
 * Load group from server (if API endpoint exists)
 * @param slug
 */
async function loadGroupFromServer(slug: string): Promise<InquiryGroup | null> {
  try {
    const response = await InquiryGroupsAPI.getGroupBySlug(slug)
    
    if (response.data?.inquiryGroup) {
      addOrUpdateInquiryGroupInList({
        inquiryGroup: response.data.inquiryGroup
      })
      return response.data.inquiryGroup
    }
    
    return null
  } catch (error) {
    if ((error as AxiosError)?.code === 'ERR_CANCELED') {
      return null
    }
    
    // If 404, group doesn't exist
    if ((error as AxiosError)?.response?.status === 404) {
      Logger.info(`Group with slug "${slug}" not found on server`)
      return null
    }
    
    Logger.error('Error loading group from server', {
      error,
      slug
    })
    throw error
  }
}

/**
 * Load all groups from server (if needed)
 */
async function fetchAllGroups(): Promise<InquiryGroup[]> {
  try {
    updating.value = true
    
    
    const response = await InquiryGroupsAPI.getAllGroups()
    const groups = response.data.groups || []
    const sessionStore = useSessionStore()
    if (sessionStore.appSettings.inquiryGroupTypeTab && sessionStore.appSettings.inquiryGroupTypeTab.length > 0) {
    // const index = typeof O !== 'undefined' ? O : 0
    if (sessionStore.appSettings.inquiryGroupTypeTab.length > 0) {
        this.selectedGroupType = sessionStore.appSettings.inquiryGroupTypeTab[0].group_type
        }
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
   * Generate a slug from a string
   * @param {string} text - The text to convert to slug
   * @param {number} [id] - Optional ID to append for uniqueness
   * @return {string} The generated slug
   */
  function generateSlug(text: string, id?: number): string {
    if (!text) return ''
    
    // Convert to lowercase, remove accents, replace non-alphanumeric with hyphens
    let slug = text
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
      .replace(/^-+|-+$/g, '') // Trim hyphens from start/end
      .replace(/-+/g, '-') // Replace multiple hyphens with single
    
    // Append ID if provided for uniqueness
    if (id) {
      slug = `${slug}-${id}`
    }
    
    return slug
  }


  /**
   * Ensure all groups have slugs
   */
  function ensureSlugs(): void {
    inquiryGroups.value = inquiryGroups.value.map(group => {
      if (!group.slug) {
        return {
          ...group,
          slug: generateSlug(group.name || group.title || '', group.id)
        }
      }
      return group
    })
  }

  /**
   * Returns a list of inquiry groups the inquiry can be added to.
   *
   * @param inquiryId - The ID of the inquiry to check.
   * @return {InquiryGroup[]} List of inquiry groups that do not include the given inquiryId.
   */
  function addableInquiryGroups(inquiryId: number): InquiryGroup[] {
    return inquiryGroups.value.filter((group) => !group.inquiryIds.includes(inquiryId))
  }

  /**
   * Sets the current inquiry group attributes with the given payload.
   * This function updates the current inquiry group in the store without saving it to the API
   * as a temporary state.
   * @param payload
   * @param payload.name
   * @param payload.titleExt
   * @param payload.description
   */
  function setCurrentInquiryGroup(payload: {
    name?: string
    titleExt?: string
    description?: string
  }): void {
    if (!currentInquiryGroup.value) {
      throw new Error('No current inquiry group set')
    }

    inquiryGroups.value = inquiryGroups.value.map((group) => {
      if (group.id === currentInquiryGroup.value?.id) {
        return {
          ...group,
          name: payload.name ?? group.name,
          titleExt: payload.titleExt ?? group.titleExt,
          description: payload.description ?? group.description,
        }
      }
      return group
    })
   }

  async function writeCurrentInquiryGroup(): Promise<InquiryGroup | undefined> {
    if (!currentInquiryGroup.value) {
      throw new Error('No current inquiry group set')
    }

    try {
      const response = await InquiryGroupsAPI.updateInquiryGroup({
        ...currentInquiryGroup.value,
      })

      addOrUpdateInquiryGroupInList({
        inquiryGroup: response.data.inquiryGroup,
      })

      return response.data.inquiryGroup
    } catch (error) {
      if ((error as AxiosError)?.code === 'ERR_CANCELED') {
        return
      }
      Logger.error('Error updating inquiry group', {
        error,
        inquiryGroup: currentInquiryGroup.value,
      })
      throw error
    }
  }

    
  function addOrUpdateInquiryGroupInList(payload: { inquiryGroup: InquiryGroup }) {
    inquiryGroups.value = inquiryGroups.value
      .filter((g) => g.id !== payload.inquiryGroup.id)
      .concat(payload.inquiryGroup)
  }

  async function addInquiryToInquiryGroup(payload: {
    inquiryId: number
    inquiryGroupId?: number
    groupTitle?: string
  }) {
    const inquiriesStore = useInquiriesStore()

    try {
      const response = await InquiryGroupsAPI.addInquiryToGroup(
        payload.inquiryId,
        payload.inquiryGroupId,
        payload.groupTitle
      )
      addOrUpdateInquiryGroupInList({
        inquiryGroup: response.data.inquiryGroup,
      })
      inquiriesStore.addOrUpdateInquiryGroupInList({
        inquiry: response.data.inquiry,
      })
    } catch (error) {
      if ((error as AxiosError)?.code === 'ERR_CANCELED') {
        return
      }
      Logger.error('Error adding inquiry to group', {
        error,
        payload,
      })
      inquiriesStore.load()
      throw error
    }
  }

  async function removeInquiryFromGroup(payload: {
    inquiryGroupId: number
    inquiryId: number
  }): Promise<void> {
    const inquiriesStore = useInquiriesStore()

    try {
      const response = await InquiryGroupsAPI.removeInquiryFromGroup(
        payload.inquiryGroupId,
        payload.inquiryId
      )

      // update inquiry in the inquiries store
      inquiriesStore.addOrUpdateInquiryGroupInList({
        inquiry: response.data.inquiry,
      })

      if (response.data.inquiryGroup === null) {
        // If the inquiry group was removed (=== null), remove it from the store
        inquiryGroups.value = inquiryGroups.value.filter(
          (group) => group.id !== payload.inquiryGroupId
        )
        return
      }
      // Otherwise, update the inquiry group in the store
      addOrUpdateInquiryGroupInList({
        inquiryGroup: response.data.inquiryGroup,
      })
    } catch (error) {
      if ((error as AxiosError)?.code !== 'ERR_CANCELED') {
        Logger.error('Error removing inquiry from group', {
          error,
          payload,
        })
        throw error
      }
    } finally {
      // inquiriesStore.load()
    }
  }

  function getInquiryGroupName(InquiryGroupId: number): string {
    const group = inquiryGroups.value.find((group) => group.id === InquiryGroupId)
    if (group) {
      return group.name
    }
    return t('inquiries', 'Invalid Group ID')
  }

  return {
    inquiryGroups,
    updating,
    inquiryGroupsSorted,
    countInquiriesInInquiryGroups,
    currentInquiryGroup,
    inquiriesInCurrentInquiryGroup,
    parentGroups,
    childGroups,
    descendantGroups,
    rootGroups,
    withChildren,
    fetchAllGroups,
    getInquiryGroupName, 
    // Getter functions
    bySlug,
    byId,
    byType,
    byParentId,
    
    // Action functions
    addableInquiryGroups,
    addInquiryGroup,
    updateInquiryGroup,
    setCurrentInquiryGroup,
    setInquiryGroupElement: addOrUpdateInquiryGroupInList,
    writeCurrentInquiryGroup,
    addInquiryToInquiryGroup,
    removeInquiryFromGroup,
    loadGroup,
    generateSlug,
    ensureSlugs,
     currentGroupType,
    setCurrentGroupType,
    selectedGroupType
  }
})
