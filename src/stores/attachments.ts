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
  fileId: number
  mimetype: string
  size: number
  inquiryId: number
  groupId: number
}

export type AttachmentsState = {
  attachments: Attachment[]
}

export const useAttachmentsStore = defineStore('attachments', {
  state: (): AttachmentsState => ({
    attachments: [],
  }),

  getters: {
    // Fixed: was `getByCommentId` but filtered by inquiryId
    getByInquiryId: (state) => (inquiryId: number) =>
      state.attachments.filter((a) => a.inquiryId === inquiryId),
  },

  actions: {
    async upload(inquiryId: number, file: File, coverId: boolean): Promise<Attachment | void> {
      try {
        const response = await AttachmentsAPI.uploadAttachment(inquiryId, file, coverId)
        const attachment = response.data.attachment as Attachment | undefined
        if (attachment) {
          // Fixed: keep store in sync
          this.attachments.push(attachment)
        }
        return attachment
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') return
        Logger.error('Error uploading attachment', { error })
        throw error
      }
    },

    async uploadGroup(groupId: number, file: File, coverId: boolean): Promise<Attachment | void> {
      try {
        const response = await AttachmentsAPI.uploadGroupAttachment(groupId, file, coverId)
        const attachment = response.data.attachment as Attachment | undefined
        if (attachment) {
          // Fixed: keep store in sync
          this.attachments.push(attachment)
        }
        return attachment
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') return
        Logger.error('Error uploading attachment', { error })
        throw error
      }
    },

    async delete(attachmentId: number) {
      try {
        await AttachmentsAPI.deleteAttachment(attachmentId)
        // Fixed: keep store in sync
        this.attachments = this.attachments.filter((a) => a.id !== attachmentId)
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') return
        Logger.error('Error deleting attachment', { error })
        throw error
      }
    },

    async load(inquiryId: number) {
      try {
        const response = await AttachmentsAPI.getAttachments(inquiryId)
        this.attachments = this.attachments.filter((a) => a.inquiryId !== inquiryId)
        this.attachments.push(...response.data.attachments)
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') return
        Logger.error('Error loading attachments', { error })
        throw error
      }
    },
  },
})
