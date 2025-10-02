/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { AxiosResponse } from '@nextcloud/axios'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'
import type { Attachment } from '../../stores/attachments.js'

const attachments = {
  uploadAttachment(
    inquiryId: number,
    file: File
  ): Promise<AxiosResponse<{ attachment: Attachment }>> {
    const formData = new FormData()
    formData.append('file', file)

    return httpInstance.request({
      method: 'POST',
      url: `inquiry/${inquiryId}/attachment`,
      data: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        requesttoken: OC.requestToken || '', // Token CSRF for Nextcloud
      },
      cancelToken:
        cancelTokenHandlerObject[this.uploadAttachment.name].handleRequestCancellation().token,
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
