/**
 * SPDX-FileCopyrightText: 2022 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { AxiosResponse } from '@nextcloud/axios'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'
import { Inquiry } from '../../stores/inquiry.ts'
import { InquiryGroup } from '../../stores/inquiryGroups.types.ts'

const inquiryGroups = {
  getInquiryGroups(): Promise<AxiosResponse<{ inquiryGroups: InquiryGroup[] }>> {
    return httpInstance.request({
      method: 'GET',
      url: 'inquirygroups',
      params: { time: +new Date() },
      cancelToken:
        cancelTokenHandlerObject[this.getInquiryGroups.name].handleRequestCancellation().token,
    })
  },

  addInquiryToGroup(
    inquiryId: number,
    inquiryGroupId?: number,
    inquiryGroupName?: string
  ): Promise<AxiosResponse<{ inquiryGroup: InquiryGroup; inquiry: Inquiry }>> {
    let url = ''
    let verb = 'PUT'
    let data = {}

    if (inquiryGroupId) {
      url = `inquirygroup/${inquiryGroupId}/inquiry/${inquiryId}`
    } else if (inquiryGroupName) {
      verb = 'POST'
      url = `inquirygroup/new/inquiry/${inquiryId}`
      data = { inquiryGroupName }
    } else {
      throw new Error('You must provide either a inquiryGroupId or a inquiryGroupName')
    }

    return httpInstance.request({
      method: verb,
      url,
      data,
      cancelToken:
        cancelTokenHandlerObject[this.addInquiryToGroup.name].handleRequestCancellation().token,
    })
  },

  removeInquiryFromGroup(
    inquiryGroupId: number,
    inquiryId: number
  ): Promise<AxiosResponse<{ inquiryGroup: InquiryGroup | null; inquiry: Inquiry }>> {
    return httpInstance.request({
      method: 'DELETE',
      url: `inquirygroup/${inquiryGroupId}/inquiry/${inquiryId}`,
      cancelToken:
        cancelTokenHandlerObject[this.removeInquiryFromGroup.name].handleRequestCancellation()
          .token,
    })
  },

  updateInquiryGroup(payload: {
    id: number
    name: string
    titleExt: string
    description: string
  }): Promise<AxiosResponse<{ inquiryGroup: InquiryGroup }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `inquirygroup/${payload.id}/update`,
      data: {
        name: payload.name,
        titleExt: payload.titleExt,
        description: payload.description,
      },
      cancelToken:
        cancelTokenHandlerObject[this.updateInquiryGroup.name].handleRequestCancellation().token,
    })
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(inquiryGroups)

export default inquiryGroups
