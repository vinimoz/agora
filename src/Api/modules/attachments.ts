/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { AxiosResponse } from '@nextcloud/axios'
import { getRequestToken } from '@nextcloud/auth'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'
import type { Attachment } from '../../stores/attachments.js'

const attachments = {
  uploadAttachment(
    inquiryId: number,
    file: File,
    coverId: boolean
  ): Promise<AxiosResponse<{ attachment: Attachment }>> {
    const formData = new FormData()
    formData.append('file', file)
    // Fixed: FormData.append only accepts string | Blob
    formData.append('coverId', coverId ? '1' : '0')

    return httpInstance.request({
      method: 'POST',
      url: `inquiry/${inquiryId}/attachment`,
      data: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // Fixed: `OC` was not typed / not in scope; use @nextcloud/auth
        requesttoken: getRequestToken() || '',
      },
      cancelToken:
        cancelTokenHandlerObject[this.uploadAttachment.name].handleRequestCancellation().token,
    })
  },

  uploadGroupAttachment(
    groupId: number,
    file: File,
    coverId: boolean
  ): Promise<AxiosResponse<{ attachment: Attachment }>> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('coverId', coverId ? '1' : '0')

    return httpInstance.request({
      method: 'POST',
      url: `group/${groupId}/attachment`,
      data: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        requesttoken: getRequestToken() || '',
      },
      // Fixed: was `this.uploadAttachment.name` (copy-paste bug)
      cancelToken:
        cancelTokenHandlerObject[this.uploadGroupAttachment.name].handleRequestCancellation().token,
    })
  },

  deleteAttachment(attachmentId: number): Promise<AxiosResponse<{ success: boolean }>> {
    return httpInstance.request({
      method: 'DELETE',
      url: `attachment/${attachmentId}`,
      cancelToken:
        cancelTokenHandlerObject[this.deleteAttachment.name].handleRequestCancellation().token,
    })
  },

  getAttachments(inquiryId: number): Promise<AxiosResponse<{ attachments: Attachment[] }>> {
    return httpInstance.request({
      method: 'GET',
      url: `inquiry/${inquiryId}/attachments`,
      cancelToken:
        cancelTokenHandlerObject[this.getAttachments.name].handleRequestCancellation().token,
    })
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(attachments)

export default attachments
