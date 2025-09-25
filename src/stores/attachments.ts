/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { defineStore } from 'pinia'
import { AttachmentsAPI } from '../Api/index.ts'
import type { AxiosError } from '@nextcloud/axios'
import { Logger } from '../helpers/index.ts'

export type Attachment = {
  id: number
  name: string
  path: string
  mimetype: string
  size: number
  inquiryId: number
}

export type AttachmentsState = {
  attachments: Attachment[]
}

export const useAttachmentsStore = defineStore('attachments', {
  state: (): AttachmentsState => ({
    attachments: [],
  }),

  getters: {
    getByCommentId: (state) => (inquiryId: number) =>
      state.attachments.filter((a) => a.inquiryId === inquiryId),
  },

  actions: {
    async upload(inquiryId: number, file: File) {
      try {
        const response = await AttachmentsAPI.uploadAttachment(inquiryId, file)
        return response.data.attachment
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') return
        Logger.error('Error uploading attachment', { error })
        throw error
      }
    },

    async delete(attachmentId: number) {
      try {
        await AttachmentsAPI.deleteAttachment(attachmentId)
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') return
        Logger.error('Error deleting attachment', { error })
        throw error
      }
    },

    async load(inquiryId: number) {
      try {
        const response = await AttachmentsAPI.getAttachments(inquiryId)
        // Remove existing attachments for this inquiry
        this.attachments = this.attachments.filter((a) => a.inquiryId !== inquiryId)
        // Add new ones
        this.attachments.push(...response.data.attachments)
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') return
        Logger.error('Error loading attachments', { error })
        throw error
      }
    },
  },
})
