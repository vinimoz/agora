/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import { OptionsAPI, InquiriesAPI } from '../Api/index.ts'
import { Participant } from '../Types/index.ts'
import { Logger, uniqueOptions } from '../helpers/index.ts'
import { Option } from './options.ts'
import { Inquiry } from './inquiry.ts'
import { sortBy } from 'lodash'
import { usePreferencesStore } from './preferences.ts'
import { useInquiriesStore } from './inquiries.ts'
import { AxiosError } from '@nextcloud/axios'

export type Combo = {
  id: number
  options: Option[]
  inquiries: Inquiry[]
  participants: Participant[]
}

export const useComboStore = defineStore('combo', {
  state: (): Combo => ({
    id: 1,
    options: [],
    inquiries: [],
    participants: [],
  }),

  getters: {
    inquiry: (state) => (inquiryId: number) =>
      state.inquiries.find((inquiry: Inquiry) => inquiry.id === inquiryId),
    participantsInInquiry: (state) => (inquiryId: number) =>
      state.participants.filter((participant: Participant) => participant.inquiryId === inquiryId),
    inquiryIsListed: (state) => (inquiryId: number) =>
      !!state.inquiries.find((inquiry: Inquiry) => inquiry.id === inquiryId),
    inquiryCombo: (state) => state.inquiries.map((inquiry: Inquiry) => inquiry.id),
    optionBelongsToInquiry: (state) => (payload: { text: string; inquiryId: number }) =>
      !!state.options.find(
        (option) => option.text === payload.text && option.inquiryId === payload.inquiryId
      ),
    uniqueOptions: (state) => sortBy(uniqueOptions(state.options), 'timestamp'),
  },

  actions: {
    async add(inquiryId: number) {
      return Promise.all([this.addInquiry({ inquiryId }), this.addOptions({ inquiryId })])
    },

    async remove(inquiryId: number) {
      return Promise.all([this.removeInquiry({ inquiryId }), this.removeOptions({ inquiryId })])
    },

    removeInquiry(payload: { inquiryId: number }) {
      this.inquiries = this.inquiries.filter((inquiry: Inquiry) => inquiry.id !== payload.inquiryId)
    },

    removeOptions(payload: { inquiryId: number }) {
      this.options = this.options.filter((option: Option) => option.inquiryId !== payload.inquiryId)
    },

    async verifyInquiriesFromSettings() {
      const preferencesStore = usePreferencesStore()
      preferencesStore.user.inquiryCombo.forEach((inquiryId) => {
        if (!this.inquiryCombo.includes(inquiryId)) {
          this.add(inquiryId)
        }
      })
    },

    async cleanUp() {
      const inquiriesStore = useInquiriesStore()
      this.inquiries.forEach((comboInquiry: Inquiry) => {
        if (
          inquiriesStore.inquiries.findIndex(
            (inquiry) => inquiry.id === comboInquiry.id && !inquiry.status.isArchived
          ) < 0
        ) {
          this.removeInquiry({ inquiryId: comboInquiry.id })
        }
      })
    },

    async toggleInquiryItem(inquiryId: number) {
      if (this.inquiryIsListed(inquiryId)) {
        this.remove(inquiryId)
      } else {
        this.add(inquiryId)
      }
    },

    async addInquiry(payload: { inquiryId: number }): Promise<void> {
      try {
        const response = await InquiriesAPI.getInquiry(payload.inquiryId)
        this.inquiries.push(response.data.inquiry)
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error loading inquiry for combo', { error })
      }
    },

    async addOptions(payload: { inquiryId: number }): Promise<void> {
      try {
        const response = await OptionsAPI.getOptions(payload.inquiryId)
        this.options.push(...response.data.options)
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error loading options for combo', { error })
      }
    },
  },
})
