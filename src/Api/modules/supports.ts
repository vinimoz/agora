/**
 * SPDX-FileCopyrightText: 2023 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { AxiosResponse } from '@nextcloud/axios'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'
import { Support } from '../../stores/supports.ts'

const supports = {
  /**
   * Add support for an inquiry
   * @param inquiryId The inquiry ID to support
   * @param userId
   */
  addSupport(inquiryId: number, userId: string): Promise<AxiosResponse<{ support: boolean }>> {
    return httpInstance.request({
      method: 'POST',
      url: `inquiry/support/${inquiryId}/${userId}`,
      cancelToken: cancelTokenHandlerObject[this.addSupport.name].handleRequestCancellation().token,
    })
  },

  /**
   * Remove support for an inquiry
   * @param inquiryId The inquiry ID to remove support from
   * @param userId
   */
  removeSupport(inquiryId: number, userId: string): Promise<AxiosResponse<{ support: boolean }>> {
    return httpInstance.request({
      method: 'DELETE',
      url: `inquiry/support/${inquiryId}/${userId}`,
      cancelToken:
        cancelTokenHandlerObject[this.removeSupport.name].handleRequestCancellation().token,
    })
  },

  /**
   * Get all supports for an inquiry
   * @param inquiryId The inquiry ID
   */
  getByInquiryId(inquiryId: number): Promise<AxiosResponse<{ supports: Support[] }>> {
    return httpInstance.request({
      method: 'GET',
      url: `inquiry/support/inquiry/${inquiryId}`,
      params: { time: +new Date() },
      cancelToken:
        cancelTokenHandlerObject[this.getByInquiryId.name].handleRequestCancellation().token,
    })
  },

  /**
   * Get all supports by a user
   * @param userId The user ID
   */
  getByUserId(userId: string): Promise<AxiosResponse<{ supports: Support[] }>> {
    return httpInstance.request({
      method: 'GET',
      url: `inquiry/support/user/${userId}`,
      params: { time: +new Date() },
      cancelToken:
        cancelTokenHandlerObject[this.getByUserId.name].handleRequestCancellation().token,
    })
  },

  /**
   * Get support statistics grouped by inquiry type
   */
  getSupportStats(): Promise<AxiosResponse<{ [type: string]: number }>> {
    return httpInstance.request({
      method: 'GET',
      url: 'inquiry/support/stats/grouped',
      cancelToken:
        cancelTokenHandlerObject[this.getSupportStats.name].handleRequestCancellation().token,
    })
  },
}
const cancelTokenHandlerObject = createCancelTokenHandler(supports)

export default supports
