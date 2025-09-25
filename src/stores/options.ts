/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia'
import { PublicAPI, OptionsAPI } from '../Api/index.ts'
import { User } from '../Types/index.ts'
import { Logger } from '../helpers/index.ts'
import orderBy from 'lodash/orderBy'
import { useInquiryStore } from './inquiry.ts'
import { useSessionStore } from './session.ts'
import { Answer, useInquiriesStore } from './inquiries.ts'
import { DateTimeUnitType, TimeUnitsType } from '../constants/dateUnits.ts'
import { AxiosError } from '@nextcloud/axios'

export type RankedType = 'yes' | 'no'

export type Sequence = {
  unit: DateTimeUnitType
  stepWidth: number
  repetitions: number
}

export type OptionInquiries = {
  yes: number
  maybe: number
  no: number
  count: number
  currentUser?: Answer
}

export type SimpleOption = {
  text?: string
  timestamp?: number
  duration?: number
}

export type Option = {
  id: number
  inquiryId: number
  text: string
  timestamp: number
  deleted: number
  order: number
  confirmed: number
  duration: number
  locked: boolean
  hash: string
  isOwner: boolean
  inquiries: OptionInquiries
  owner: User | undefined
}

export type Options = {
  options: Option[]
  ranked: RankedType
}

export const useOptionsStore = defineStore('options', {
  state: (): Options => ({
    options: [],
    ranked: 'no',
  }),

  getters: {
    countAvailable(state): number {
      return state.options.filter((option) => !option.locked && !option.deleted).length
    },

    countInquirydByCurrentUser(state): number {
      return state.options.filter((option) => option.inquiries.currentUser === 'yes').length
    },

    countOptionsLeft(): number {
      return this.countAvailable - this.countInquirydByCurrentUser
    },

    rankedOptions(state): Option[] {
      return orderBy(state.options, ['inquiries.yes', 'inquiries.maybe'], ['desc', 'desc'])
    },

    sortedOptions(state): Option[] {
      const inquiryStore = useInquiryStore()
      return inquiryStore.type === 'proposal'
        ? orderBy(state.options, ['timestamp', 'duration'], ['asc', 'asc'])
        : state.options
    },

    orderedOptions(state): Option[] {
      return state.ranked === 'yes' ? this.rankedOptions : this.sortedOptions
    },

    confirmed(state): Option[] {
      return state.options.filter((option) => option.confirmed > 0)
    },

    countSuggestions(state): number {
      return state.options.filter((option: Option) => option.owner !== null).length
    },
  },

  actions: {
    find(timestamp: number, duration: number): Option | undefined {
      return this.options.find(
        (option) => option.timestamp === timestamp && option.duration === duration
      )
    },

    async load() {
      const sessionStore = useSessionStore()
      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.getOptions(sessionStore.route.params.token as string)
          }
          if (sessionStore.currentInquiryId) {
            return OptionsAPI.getOptions(sessionStore.currentInquiryId)
          }
          return null
        })()

        if (!response) {
          this.$reset()
          return
        }

        this.options = response.data.options
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error loding options', {
          error,
          inquiryId: sessionStore.currentInquiryId,
        })
        throw error
      }
    },

    updateOption(payload: { option: Option }) {
      const index = this.options.findIndex((option) => option.id === payload.option.id)

      if (index < 0) {
        this.options.push(payload.option)
      } else {
        this.options.splice(index, 1, payload.option)
      }
      this.options.sort((a, b) => (a.order < b.order ? -1 : a.order > b.order ? 1 : 0))
    },

    async add(
      simpleOption: SimpleOption,
      sequence: Sequence | null = null,
      inquiryYes: boolean = false
    ) {
      const sessionStore = useSessionStore()
      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.addOption(
              sessionStore.route.params.token,
              simpleOption,
              sequence,
              inquiryYes
            )
          }
          return OptionsAPI.addOption(
            sessionStore.currentInquiryId,
            simpleOption,
            sequence,
            inquiryYes
          )
        })()

        this.options = response.data.options

        if (response.data.inquiries) {
          const inquiriesStore = useInquiriesStore()
          inquiriesStore.inquiries = response.data.inquiries
        }
      } catch (error) {
        if ((error as AxiosError)?.code !== 'ERR_CANCELED') {
          Logger.error('Error adding option', {
            error,
            simpleOption,
          })
          this.load()
          throw error
        }
      }
    },

    async update(payload: { option: Option }) {
      try {
        const response = await OptionsAPI.updateOption(payload.option)
        this.updateOption({ option: response.data.option })
      } catch (error) {
        Logger.error('Error updating option', {
          error,
          payload,
        })
        this.load()
        throw error
      }
    },

    async delete(payload: { option: Option }) {
      const sessionStore = useSessionStore()
      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.deleteOption(sessionStore.route.params.token, payload.option.id)
          }
          return OptionsAPI.deleteOption(payload.option.id)
        })()

        this.updateOption({ option: response.data.option })
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error deleting option', {
          error,
          payload,
        })
        throw error
      }
    },

    async restore(payload: { option: Option }) {
      const sessionStore = useSessionStore()
      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.restoreOption(sessionStore.route.params.token, payload.option.id)
          }
          return OptionsAPI.restoreOption(payload.option.id)
        })()

        this.updateOption({ option: response.data.option })
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error restoring option', {
          error,
          payload,
        })
        throw error
      }
    },

    async addBulk(payload: { text: string }) {
      const sessionStore = useSessionStore()
      try {
        const response = await OptionsAPI.addOptions(sessionStore.currentInquiryId, payload.text)
        this.options = response.data.options
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error adding option', {
          error,
          payload,
        })
        this.load()
        throw error
      }
    },

    async confirm(payload: { option: Option }) {
      const index = this.options.findIndex((option: Option) => option.id === payload.option.id)
      this.options[index].confirmed = Math.abs(this.options[index].confirmed - 1)

      try {
        const response = await OptionsAPI.confirmOption(payload.option.id)
        this.updateOption({ option: response.data.option })
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error confirming option', {
          error,
          payload,
        })
        this.load()
        throw error
      }
    },

    async changeOrder(oldIndex: number, newIndex: number) {
      const sessionStore = useSessionStore()

      this.options.splice(newIndex, 0, this.options.splice(oldIndex, 1)[0])

      try {
        const response = await OptionsAPI.reorderOptions(
          sessionStore.currentInquiryId,
          this.options.map(({ id, text }) => ({
            id,
            text,
          }))
        )
        this.options = response.data.options
      } catch (error) {
        Logger.error('Error reordering option', {
          error,
          options: this.options,
          oldIndex,
          newIndex,
        })
        this.load()
        throw error
      }
    },

    async sequence(payload: { option: Option; sequence: Sequence }) {
      try {
        const response = await OptionsAPI.addOptionsSequence(payload.option.id, payload.sequence)
        this.options = response.data.options
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error creating sequence', {
          error,
          payload,
        })
        this.load()
        throw error
      }
    },

    async shift(payload: { shift: TimeUnitsType }) {
      const sessionStore = useSessionStore()
      try {
        const response = await OptionsAPI.shiftOptions(
          sessionStore.currentInquiryId,
          payload.shift.value,
          payload.shift.unit.id
        )
        this.options = response.data.options
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return
        }
        Logger.error('Error shifting dates', {
          error,
          payload,
        })
        this.load()
        throw error
      }
    },
  },
})
