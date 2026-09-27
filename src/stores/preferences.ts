/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import { UserSettingsAPI } from '../Api/index.ts'
import { Logger } from '../helpers/index.ts'
import { AxiosError } from '@nextcloud/axios'

export type ViewMode = 'table-view' | 'list-view' | 'reel-view'

export type UserPreferences = {
  defaultViewInquiry: ViewMode
  inquiryCombo: number[]
  relevantOffset: number
  useNewInquiryDialogInNavigation: boolean
  useNewInquiryInInquiryist: boolean
  useCommentsAlternativeStyling: boolean
  useAlternativeStyling: boolean
  verboseInquiriesList: boolean
}

export type SessionSettings = {
  manualViewInquiry: '' | ViewMode
}


export type Preferences = {
  user: UserPreferences
  session: SessionSettings
}

export const usePreferencesStore = defineStore('preferences', {
  state: (): Preferences => ({
    user: {
      defaultViewInquiry: 'table-view',
      inquiryCombo: [],
      relevantOffset: 30,
      useNewInquiryDialogInNavigation: false,
      useNewInquiryInInquiryist: false,
      useCommentsAlternativeStyling: false,
      useAlternativeStyling: false,
      verboseInquiriesList: false,
      defaultDisplayMode: 'view'
    },
    session: {
      manualViewInquiry: '',
    },
  }),

  getters: {
    viewInquiry(state): ViewMode {
      if (state.session.manualViewInquiry) {
        return state.session.manualViewInquiry
      }
      if (window.innerWidth > 480) {
        return state.user.defaultViewInquiry
      }
      return 'list-view'
    },

    useNcAppNavigationNew(state): boolean {
      return !state.user.useNewInquiryDialogInNavigation && !state.user.useNewInquiryInInquiryist
    },

    useActionAddInquiryInNavigation(state): boolean {
      return state.user.useNewInquiryDialogInNavigation && !state.user.useNewInquiryInInquiryist
    },
  },

  actions: {

    setViewInquiry(viewMode: ViewMode) {
      this.session.manualViewInquiry = viewMode
    },

    // Add this method to set user preferences
    setUserPreference(key: keyof UserPreferences, value: any) {
      if (key in this.user) {
        this.user[key] = value
        // Optionally save to server
        this.write().catch(() => {
          Logger.debug('Failed to save preference:', key, value)
        })
      }
    },

    async load(): Promise<void> {
      try {
        const response = await UserSettingsAPI.getUserSettings()
        this.$patch({ user: response.data.preferences })
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        this.$reset()
        throw error
      }
    },

    async write(): Promise<void> {
      try {
        const response = await UserSettingsAPI.writeUserSettings(this.user)
        this.$patch({ user: response.data.preferences })
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error writing preferences', {
          error,
          preferences: this.user,
        })
        throw error
      }
    },

  },
})
