/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import { ActivityAPI } from '../Api/index.ts'
import { useSessionStore } from './session.ts'
import { AxiosError } from '@nextcloud/axios'

export type Activity = {
  activity_id: number
  app: string
  type: string
  user: string
  subject: string
  subject_rich: []
  message: string
  message_rich: []
  object_type: string
  object_id: number
  link: string
  icon: string
  datetime: string
}

export type Activities = {
  activities: Activity[]
}

export const useActivityStore = defineStore('activity', {
  state: (): Activities => ({
    activities: [],
  }),

  actions: {
    async load(): Promise<void> {
      const sessionStore = useSessionStore()
      try {
        const response = await ActivityAPI.getActivities(sessionStore.currentInquiryId)
        this.activities = response.data.ocs.data
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        this.$reset()
      }
    },
  },

  getters: {
    getActivitiesForInquiry(state): Activity[] {
      const sessionStore = useSessionStore()
      // TODO: Learn: Why is activity.object_id === sessionStore.currentInquiryId always false?
      return state.activities.filter(
        (activity: Activity) =>
          activity.object_type === 'inquiry' &&
          activity.object_id - sessionStore.currentInquiryId === 0
      )
    },
  },
})
