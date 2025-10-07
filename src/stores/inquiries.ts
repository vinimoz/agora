/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import orderBy from 'lodash/orderBy'
import { DateTime } from 'luxon'
import { t } from '@nextcloud/l10n'

import { Logger } from '../helpers/index.ts'
import { InquiriesAPI } from '../Api/index.ts'

import { Inquiry } from './inquiry.ts'
import { useSessionStore } from './session.ts'
import { Chunking, StatusResults } from '../Types/index.ts'
import { AxiosError } from '@nextcloud/axios'
import { useInquiryGroupsStore } from './inquiryGroups.ts'

export type SortType =
  | 'created'
  | 'title'
  | 'access'
  | 'owner'
  | 'comments'
  | 'supports'
  | 'expire'
  | 'interaction'
  | 'type'
  | 'countComments'
  | 'countSupports'

export type SortDirection = 'asc' | 'desc'

export type FilterType =
  | 'relevant'
  | 'my'
  | 'private'
  | 'participated'
  | 'open'
  | 'all'
  | 'closed'
  | 'archived'
  | 'admin'

export type AdvancedFilters = {
  type?: FilterType
  categoryId?: string
  locationId?: string
  hasComments?: boolean
  hasSupports?: boolean
  parentId?: number
  search?: string
}

export type FilterState = {
  currentFilter: FilterType
  advancedFilters: AdvancedFilters
}

export type InquiryCategory = {
  id: FilterType
  title: string
  titleExt: string
  description: string
  pinned: boolean
  showInNavigation(): boolean
  filterCondition(inquiry: Inquiry): boolean
}

export type InquiryCategoryList = Record<FilterType, InquiryCategory>

export type Meta = {
  chunks: Chunking
  maxInquiriesInNavigation: number
  status: StatusResults
}

export type InquiryList = {
  inquiries: Inquiry[]
  // inquiryGroups: InquiryGroup[]
  meta: Meta
  sort: {
    by: SortType
    reverse: boolean
  }
  status: {
    loadingGroups: boolean
  }
  categories: InquiryCategoryList
}

export const sortColumnsMapping: { [key in SortType]: string } = {
  created: 'status.created',
  title: 'title',
  type: 'type',
  access: 'configuration.access',
  owner: 'owner.displayName',
  expire: 'configuration.expire',
  interaction: 'status.lastInteraction',
  countComments: 'status.countComments',
  countSupports: 'status.countSupports',
}

export const sortTitlesMapping: { [key in SortType]: string } = {
  created: t('agora', 'Created'),
  title: t('agora', 'Title'),
  type: t('agora', 'Type'),
  access: t('agora', 'Access'),
  owner: t('agora', 'Owner'),
  expire: t('agora', 'Expire'),
  interaction: t('agora', 'Last interaction'),
  countComments: t('agora', 'Comments count'),
  countSupports: t('agora', 'Supports count'),
}

const inquiryCategories: InquiryCategoryList = {
  relevant: {
    id: 'relevant',
    title: t('agora', 'Relevant'),
    titleExt: t('agora', 'Relevant inquiries'),
    description: t(
      'agora',
      'Relevant inquiries which are relevant to you, because you are a participant, the owner or you are invited. Only inquiries not older than 100 days compared to creation, last interaction, expiration or latest option (for date inquiries) are shown.'
    ),
    pinned: false,
    showInNavigation: () => true,
    filterCondition: (inquiry: Inquiry) =>
      !inquiry.status.isArchived &&
      DateTime.fromSeconds(inquiry.status.relevantThreshold).diffNow('days').days > -100 &&
      (inquiry.currentUserStatus.isInvolved ||
        (inquiry.permissions.view && inquiry.configuration.access !== 'open')),
  },
  my: {
    id: 'my',
    title: t('agora', 'My inquiries'),
    titleExt: t('agora', 'My inquiries'),
    description: t('agora', 'These are all inquiries where you are the owner.'),
    pinned: false,
    showInNavigation: () => {
      const sessionStore = useSessionStore()
      return sessionStore.appPermissions.inquiryCreation
    },
    filterCondition: (inquiry: Inquiry) =>
      !inquiry.status.isArchived && inquiry.currentUserStatus.isOwner,
  },
  private: {
    id: 'private',
    title: t('agora', 'Private inquiries'),
    titleExt: t('agora', 'Private inquiries'),
    description: t('agora', 'All private inquiries, to which you have access.'),
    pinned: false,
    showInNavigation: () => {
      const sessionStore = useSessionStore()
      return sessionStore.appPermissions.inquiryCreation
    },
    filterCondition: (inquiry: Inquiry) =>
      !inquiry.status.isArchived &&
      inquiry.permissions.view &&
      inquiry.configuration.access === 'private',
  },
  participated: {
    id: 'participated',
    title: t('agora', 'Participated'),
    titleExt: t('agora', 'Participated'),
    description: t('agora', 'All inquiries who get participation.'),
    pinned: false,
    showInNavigation: () => true,
    filterCondition: (inquiry: Inquiry) =>
      !inquiry.status.isArchived && inquiry.status.countParticipants > 0,
  },
  open: {
    id: 'open',
    title: t('agora', 'Openly accessible inquiries'),
    titleExt: t('agora', 'Openly accessible inquiries'),
    description: t('agora', 'A complete list with all openly accessible inquiries on this site.'),
    pinned: false,
    showInNavigation: () => {
      const sessionStore = useSessionStore()
      return sessionStore.appPermissions.inquiryCreation
    },
    filterCondition: (inquiry: Inquiry) =>
      !inquiry.status.isArchived && inquiry.configuration.access === 'open',
  },
  all: {
    id: 'all',
    title: t('agora', 'All inquiries'),
    titleExt: t('agora', 'All inquiries'),
    description: t('agora', 'All inquiries, where you have access to.'),
    pinned: false,
    showInNavigation: () => true,
    filterCondition: (inquiry: Inquiry) => !inquiry.status.isArchived && inquiry.permissions.view,
  },
  closed: {
    id: 'closed',
    title: t('agora', 'Closed inquiries'),
    titleExt: t('agora', 'Closed inquiries'),
    description: t('agora', 'All closed inquiries, where voting is disabled.'),
    pinned: false,
    showInNavigation: () => true,
    filterCondition: (inquiry: Inquiry) =>
      !inquiry.status.isArchived && inquiry.status.isExpired && inquiry.permissions.view,
  },
  archived: {
    id: 'archived',
    title: t('agora', 'Archive'),
    titleExt: t('agora', 'My archived inquiries'),
    description: t('agora', 'Your archived inquiries are only accessible to you.'),
    pinned: true,
    showInNavigation: () => {
      const sessionStore = useSessionStore()
      return sessionStore.appPermissions.inquiryCreation
    },
    filterCondition: (inquiry: Inquiry) => inquiry.status.isArchived && inquiry.permissions.view,
  },
  admin: {
    id: 'admin',
    title: t('agora', 'Administration'),
    titleExt: t('agora', 'Administrative access'),
    description: t(
      'agora',
      'You can delete, archive and take over inquiries in this list, but access is still not possible.'
    ),
    pinned: true,
    showInNavigation: () => {
      const sessionStore = useSessionStore()
      return !!sessionStore.currentUser?.isAdmin
    },
    filterCondition: (inquiry: Inquiry) => inquiry.permissions.view,
  },
}

export const useInquiriesStore = defineStore('inquiries', {
  state: (): InquiryList & FilterState => ({
    inquiries: [],
    meta: {
      chunks: {
        size: 20,
        loaded: 1,
      },
      maxInquiriesInNavigation: 6,
      status: '',
    },
    sort: {
      by: 'created',
      reverse: true,
    },
    status: {
      loadingGroups: false,
    },
    categories: inquiryCategories,
    currentFilter: 'relevant',
     advancedFilters: {
      parentId: 0  
    },
  }),

  getters: {

    navigationCategories(state: InquiryList): InquiryCategory[] {
      return Object.values(state.categories).filter((category) => category.showInNavigation())
    },

    navigationListWithFilters:
      (state: InquiryList & FilterState) =>
      (filterId: FilterType): Inquiry[] => {
        let filteredInquiries = state.inquiries.filter((inquiry: Inquiry) =>
          state.categories[filterId].filterCondition(inquiry)
        )

        if (state.advancedFilters.type) {
          filteredInquiries = filteredInquiries.filter(
            (inquiry) => inquiry.type === state.advancedFilters.type
          )
        }

        return orderBy(filteredInquiries, ['created'], ['desc']).slice(
          0,
          state.meta.maxInquiriesInNavigation
        )
      },

    /*
     * Sliced filtered and sorted inquiries for navigation
     */
    navigationList:
      (state: InquiryList) =>
      (filterId: FilterType): Inquiry[] =>
        orderBy(
          state.inquiries.filter((inquiry: Inquiry) =>
            state.categories[filterId].filterCondition(inquiry)
          ) ?? [],
          ['created'],
          ['desc']
        ).slice(0, state.meta.maxInquiriesInNavigation),

    currentCategory(state: InquiryList): InquiryCategory {
      const sessionStore = useSessionStore()

      if (sessionStore.route.name === 'list' && sessionStore.route.params.type) {
        return state.categories[sessionStore.route.params.type as FilterType]
      }
      return state.categories.relevant
    },


    /*
     * inquiries list, filtered by current category, advanced filters and sorted
     */
    inquiriesFilteredSorted(state: InquiryList & FilterState): Inquiry[] {
      const sessionStore = useSessionStore()
      const inquiryGroupsStore = useInquiryGroupsStore()

      // if we are in a group route, return the inquiries of the current group
      if (sessionStore.route.name === 'group') {
        return inquiryGroupsStore.inquiriesInCurrendInquiryGroup
      }

      let filteredInquiries =
        state.inquiries.filter((inquiry: Inquiry) =>
          this.currentCategory?.filterCondition(inquiry)
        ) ?? []

      if (state.advancedFilters.type) {
        filteredInquiries = filteredInquiries.filter(
          (inquiry) => inquiry.type === state.advancedFilters.type
        )
      }

      if (state.advancedFilters.categoryId) {
        filteredInquiries = filteredInquiries.filter(
          (inquiry) => inquiry.categoryId === state.advancedFilters.categoryId
        )
      }
     if (state.advancedFilters.parentId !== undefined) {
 		 filteredInquiries = filteredInquiries.filter((inquiry) =>
    		 inquiry.parentId === state.advancedFilters.parentId
       )
    }
      if (state.advancedFilters.locationId) {
        filteredInquiries = filteredInquiries.filter(
          (inquiry) => inquiry.locationId === state.advancedFilters.locationId
        )
      }
     
      if (state.advancedFilters.hasComments === true) {
        filteredInquiries = filteredInquiries.filter((inquiry) => inquiry.status.countComments > 0
        )
      }
      if (state.advancedFilters.hasComments === false) {
  		filteredInquiries = filteredInquiries.filter((inquiry) => inquiry.status.countComments === 0)
       }

      if (state.advancedFilters.hasSupports === true) {
        filteredInquiries = filteredInquiries.filter((inquiry) =>  inquiry.status.countSupports > 0
        )
      }
      else if (state.advancedFilters.hasSupports === false) {
  		filteredInquiries = filteredInquiries.filter((inquiry) => inquiry.status.countSupports === 0)
      }

      if (state.advancedFilters.search) {
	      const normalizeText = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

	      const searchTerm = normalizeText(state.advancedFilters.search)

	      const results = filteredInquiries.filter((inquiry) => {
		      const titleNormalized = normalizeText(inquiry.title)
		      const descNormalized = normalizeText(inquiry.description || '')

		      const titleMatch = titleNormalized.includes(searchTerm)
		      const descMatch = descNormalized.includes(searchTerm)
		      const matches = titleMatch || descMatch

		      return matches
	      })

	      filteredInquiries = results
      }


      return orderBy(
	      filteredInquiries,
	      [sortColumnsMapping[state.sort.by]],
	      [state.sort.reverse ? 'desc' : 'asc']
      )
    },

    /*
     * Chunked filtered and sorted inquiries for main view
     */
    chunkedList(): Inquiry[] {
	    return this.inquiriesFilteredSorted.slice(0, this.loaded)
    },

    inquiriesCount(state: InquiryList): { [key: string]: number } {
	    const count: Record<FilterType, number> = {} as Record<FilterType, number>

	    for (const [key, category] of Object.entries(state.categories)) {
		    count[key as FilterType] = state.inquiries.filter((inquiry: Inquiry) =>
								      category.filterCondition(inquiry)
								     ).length
	    }

	    return count
    },

    /*
     * Sliced filtered and sorted inquiries for dashboard
     */
    dashboardList(state: InquiryList): Inquiry[] {
	    return orderBy(
		    state.inquiries.filter((inquiry: Inquiry) =>
					   state.categories.relevant.filterCondition(inquiry)
					  ),
					  ['created'],
					  ['desc']
	    ).slice(0, 7)
    },

    loaded(state: InquiryList): number {
	    return state.meta.chunks.loaded * state.meta.chunks.size
    },

    proposalInquiries(state: InquiryList): Inquiry[] {
	    return state.inquiries.filter(
		    (inquiry: Inquiry) => inquiry.type === 'proposal' && !inquiry.status.isArchived
	    )
    },

    inquiriesLoading(state): boolean {
	    return state.meta.status === 'loading'
    },

    countByCategory: (state: InquiryList) => (filterId: FilterType) =>
    state.inquiries.filter((inquiry: Inquiry) =>
			   state.categories[filterId].filterCondition(inquiry)
			  ).length,
  },

  actions: {
	  /**
	   * Filter set
	   */

	  setFilters(filters: AdvancedFilters): void {
		  this.advancedFilters = { 
			  ...filters,
		  }
		  this.resetChunks()
	  },

	  /**
	   * Reset filter
	   */
	  resetFilters(): void {
		 this.advancedFilters= {
		      parentId: 0  
    		  }
		  this.resetChunks()
	  },

	  /**
	   * Change filter
	   * @param filter
	   */
	  setCurrentFilter(filter: FilterType): void {
		  this.currentFilter = filter
		  this.resetChunks()
		  this.resetFilters()
	  },

	  /**
	   * Update filter
	   * @param key
	   * @param value
	   */
	  updateFilter<K extends keyof AdvancedFilters>(key: K, value: AdvancedFilters[K]): void {
		  this.advancedFilters[key] = value
		  this.resetChunks()
	  },
	  /**
	   * Load all inquiries and inquiry groups from the API.
	   * This will set the `inquiries` and `inquiryGroups` state properties.
	   *
	   * This will also set the `meta.status` to `Loading` while the request is in progress,
	   * and to `Loaded` or `Error` when the request is finished.
	   *
	   * @param {boolean} forced - If false, loading inquiries will only be done, when the status is not `Loaded`.
	   * @throws {Error} If the request fails and is not canceled.
	   * @return {Promise<void>}
	   */
	  async load(forced: boolean = true): Promise<void> {
		  const inquiryGroupsStore = useInquiryGroupsStore()

		  if (this.meta.status === 'loading' || (!forced && this.meta.status === 'loaded')) {
			  Logger.debug('Inquiries already loaded or loading, skipping load', {
				  status: this.meta.status,
				  forced,
			  })
			  return
		  }

		  this.meta.status = 'loading'

		  try {
			  const response = await InquiriesAPI.getInquiries()
			  this.inquiries = response.data.inquiries
			  inquiryGroupsStore.inquiryGroups = response.data.inquiryGroups
			  this.meta.status = 'loaded'
		  } catch (error) {
			  if ((error as AxiosError)?.code === 'ERR_CANCELED') {
				  return
			  }
			  this.meta.status = 'error'
			  Logger.error('Error loading inquiries', { error })
			  throw error
		  }
	  },

	  /**
	   * Sliced filtered and sorted inquiries for navigation
	   * @param filterList - List of inquiry IDs to filter by
	   */
	  groupList(filterList: number[]): Inquiry[] {
		  return orderBy(
			  this.inquiries.filter((inquiry: Inquiry) => filterList.includes(inquiry.id)) ?? [],
				  ['created'],
			  ['desc']
		  ).slice(0, this.meta.maxInquiriesInNavigation)
	  },

	  addOrUpdateInquiryGroupInList(payload: { inquiry: Inquiry }) {
		  this.inquiries = this.inquiries
		  .filter((p) => p.id !== payload.inquiry?.id)
		  .concat(payload.inquiry)
	  },

	  reset(): void {
		  this.$reset()
	  },

	  async changeOwner(payload: { inquiryId: number; userId: string }) {
		  try {
			  await InquiriesAPI.changeOwner(payload.inquiryId, payload.userId)
		  } catch (error) {
			  if ((error as AxiosError)?.code === 'ERR_CANCELED') {
				  return
			  }
			  Logger.error('Error changing inquiry owner', {
				  error,
				  payload,
			  })
			  throw error
		  } finally {
			  this.load()
		  }
	  },

	  addChunk(): void {
		  this.meta.chunks.loaded = this.meta.chunks.loaded + 1
	  },

	  resetChunks(): void {
		  this.meta.chunks.loaded = 1
	  },

	  async clone(payload: { inquiryId: number }): Promise<void> {
		  try {
			  await InquiriesAPI.cloneInquiry(payload.inquiryId)
		  } catch (error) {
			  if ((error as AxiosError)?.code === 'ERR_CANCELED') {
				  return
			  }
			  Logger.error('Error cloning inquiry', {
				  error,
				  payload,
			  })
			  throw error
		  } finally {
			  this.load()
		  }
	  },

	  async delete(payload: { inquiryId: number }): Promise<void> {
		  try {
			  await InquiriesAPI.deleteInquiry(payload.inquiryId)
		  } catch (error) {
			  if ((error as AxiosError)?.code === 'ERR_CANCELED') {
				  return
			  }
			  Logger.error('Error deleting inquiry', {
				  error,
				  payload,
			  })
			  throw error
		  } finally {
			  this.load()
		  }
	  },

	  async toggleArchive(payload: { inquiryId: number }) {
		  try {
			  await InquiriesAPI.toggleArchive(payload.inquiryId)
		  } catch (error) {
			  if ((error as AxiosError)?.code === 'ERR_CANCELED') {
				  return
			  }
			  Logger.error('Error archiving/restoring inquiry', {
				  error,
				  payload,
			  })
			  throw error
		  } finally {
			  this.load()
		  }
	  },

	  async takeOver(payload: { inquiryId: number }) {
		  try {
			  await InquiriesAPI.takeOver(payload.inquiryId)
		  } catch (error) {
			  if ((error as AxiosError)?.code === 'ERR_CANCELED') {
				  return
			  }
			  Logger.error('Error archiving/restoring inquiry', {
				  error,
				  payload,
			  })
			  throw error
		  } finally {
			  this.load()
		  }
	  },
  },
})
