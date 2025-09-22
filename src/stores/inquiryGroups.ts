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

  /**
   * Currently selected inquiriesgroup or undefined if not in a inquiriesgroup route
   * @return {InquiryGroup | undefined} The current inquiry group if in a group route, otherwise undefined
   */
  const currentInquiryGroup = computed((): InquiryGroup | undefined => {
    const sessionStore = useSessionStore()
    if (sessionStore.route.name === 'group') {
      return inquiryGroups.value.find((group) => group.slug === sessionStore.route.params.slug)
    }
    return undefined
  })

  /**
   * Sort inquiry groups by title in ascending order
   * @return {InquiryGroup[]} Sorted inquiry groups, sorted by title in ascending order
   */
  const inquiryGroupsSorted = computed((): InquiryGroup[] =>
    orderBy(
      inquiryGroups.value.filter((group) => countInquiriesInInquiryGroups.value[group.id] > 0),
      ['title'],
      ['asc']
    )
  )

  const inquiriesInCurrendInquiryGroup = computed((): Inquiry[] => {
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
    inquiriesInCurrendInquiryGroup,
    addableInquiryGroups,
    setCurrentInquiryGroup,
    setInquiryGroupElement: addOrUpdateInquiryGroupInList,
    writeCurrentInquiryGroup,
    addInquiryToInquiryGroup,
    removeInquiryFromGroup,
    getInquiryGroupName,
  }
})
