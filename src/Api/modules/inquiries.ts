/**
 * SPDX-FileCopyrightText: 2022 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { Inquiry, InquiryConfiguration, InquiryType } from '../../stores/inquiry.ts'
import { AxiosResponse } from '@nextcloud/axios'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'
import { Option } from '../../stores/options.ts'
import { Support } from '../../stores/supports.ts'
import { Share } from '../../stores/shares.ts'
import { ApiEmailAdressList, Comment } from '../../Types/index.ts'
import { InquiryGroup } from '../../stores/inquiryGroups.types.ts'

export type Confirmations = {
  sentMails: { emailAddress: string; displayName: string }[]
  abortedMails: { emailAddress: string; displayName: string; reason: string }[]
  countSentMails: number
  countAbortedMails: number
}

const inquiries = {
  getInquiries(): Promise<
    AxiosResponse<{
      inquiries: Inquiry[]
      permissions: {
        inquiryCreationAllowed: boolean
        comboAllowed: true
      }
      inquiryGroups: InquiryGroup[]
    }>
  > {
    return httpInstance.request({
      method: 'GET',
      url: 'inquiries',
      params: { time: +new Date() },
      cancelToken:
        cancelTokenHandlerObject[this.getInquiries.name].handleRequestCancellation().token,
    })
  },

  getChildInquiryIds(inquiryId: number): Promise<AxiosResponse<{ inquiry: Inquiry }>> {
    return httpInstance.request({
      method: 'GET',
      url: `inquiry/${inquiryId}/childs`,
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.getInquiry.name].handleRequestCancellation().token,
    })
  },

  getInquiry(inquiryId: number): Promise<AxiosResponse<{ inquiry: Inquiry }>> {
    return httpInstance.request({
      method: 'GET',
      url: `inquiry/${inquiryId}/inquiry`,
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.getInquiry.name].handleRequestCancellation().token,
    })
  },

  getFullInquiry(inquiryId: number): Promise<
    AxiosResponse<{
      inquiry: Inquiry
      options: Option[]
      supports: Support[]
      comments: Comment[]
      shares: Share[]
      subscribed: boolean
    }>
  > {
    return httpInstance.request({
      method: 'GET',
      url: `inquiry/${inquiryId}`,
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.getInquiry.name].handleRequestCancellation().token,
    })
  },

  takeOver(inquiryId: number): Promise<AxiosResponse<{ inquiry: Inquiry }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `administration/inquiry/${inquiryId}/takeover`,
      cancelToken: cancelTokenHandlerObject[this.takeOver.name].handleRequestCancellation().token,
    })
  },

  changeOwner(inquiryId: number, userId: string): Promise<AxiosResponse<{ inquiry: Inquiry }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `inquiry/${inquiryId}/changeowner/${userId}`,
      cancelToken:
        cancelTokenHandlerObject[this.changeOwner.name].handleRequestCancellation().token,
    })
  },

  updateModerationStatus(
    inquiryId: number,
    moderation: string
  ): Promise<AxiosResponse<{ inquiry: Inquiry }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `inquiry/updatemoderation/${inquiryId}/${moderation}`,
      cancelToken:
        cancelTokenHandlerObject[this.updateModerationStatus.name].handleRequestCancellation()
          .token,
    })
  },

  updateInquiryConfig(
    inquiryId: number,
    inquiry: InquiryConfiguration
  ): Promise<AxiosResponse<{ inquiry: Inquiry }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `inquiry/updateconfig/${inquiryId}`,
      data: { inquiry },
      cancelToken:
        cancelTokenHandlerObject[this.updateInquiryConfig.name].handleRequestCancellation().token,
    })
  },

  addInquiry(dataInquiry: {
    type: InquiryType
    title: string
    description?: string
    configuration?: InquiryConfiguration
    parentId?: number
    locationId?: number
    categoryId?: number
    formId?: number
    pollId?: number
    talkId?: number
  }): Promise<AxiosResponse<{ inquiry: Inquiry }>> {
    return httpInstance.request({
      method: 'POST',
      url: 'inquiry/add',
      data: dataInquiry,
      cancelToken: cancelTokenHandlerObject[this.addInquiry.name].handleRequestCancellation().token,
    })
  },

  updateInquiry(
    inquiryId: number,
    updateData: {
      title?: string
      type?: InquiryType
      description?: string
      parentId?: number | 0
      locationId?: number | 0
      categoryId?: number | 0
      formId?: number | 0
      pollId?: number | 0
      talkId?: number | 0
    }
  ): Promise<AxiosResponse<{ inquiry: Inquiry }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `inquiry/${inquiryId}`,
      data: updateData,
      cancelToken:
        cancelTokenHandlerObject[this.updateInquiry.name].handleRequestCancellation().token,
    })
  },

  lockAnonymous(inquiryId: number): Promise<AxiosResponse<{ inquiry: Inquiry }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `inquiry/${inquiryId}/lockAnonymous`,
      cancelToken:
        cancelTokenHandlerObject[this.lockAnonymous.name].handleRequestCancellation().token,
    })
  },

  deleteInquiry(inquiryId: number): Promise<AxiosResponse<{ inquiry: Inquiry }>> {
    return httpInstance.request({
      method: 'DELETE',
      url: `inquiry/${inquiryId}`,
      cancelToken:
        cancelTokenHandlerObject[this.deleteInquiry.name].handleRequestCancellation().token,
    })
  },

  closeInquiry(inquiryId: number): Promise<AxiosResponse<{ inquiry: Inquiry }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `inquiry/${inquiryId}/close`,
      cancelToken:
        cancelTokenHandlerObject[this.closeInquiry.name].handleRequestCancellation().token,
    })
  },

  reopenInquiry(inquiryId: number): Promise<AxiosResponse<{ inquiry: Inquiry }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `inquiry/${inquiryId}/reopen`,
      cancelToken:
        cancelTokenHandlerObject[this.reopenInquiry.name].handleRequestCancellation().token,
    })
  },

  toggleArchive(inquiryId: number): Promise<AxiosResponse<{ inquiry: Inquiry }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `inquiry/${inquiryId}/toggleArchive`,
      cancelToken:
        cancelTokenHandlerObject[this.toggleArchive.name].handleRequestCancellation().token,
    })
  },

  cloneInquiry(inquiryId: number): Promise<AxiosResponse<{ inquiry: Inquiry }>> {
    return httpInstance.request({
      method: 'POST',
      url: `inquiry/${inquiryId}/clone`,
      cancelToken:
        cancelTokenHandlerObject[this.cloneInquiry.name].handleRequestCancellation().token,
    })
  },

  sendConfirmation(inquiryId: number): Promise<AxiosResponse<{ confirmations: Confirmations }>> {
    return httpInstance.request({
      method: 'POST',
      url: `inquiry/${inquiryId}/confirmation`,
      cancelToken:
        cancelTokenHandlerObject[this.sendConfirmation.name].handleRequestCancellation().token,
    })
  },

  getParticipantsEmailAddresses(
    inquiryId: string | number | string[]
  ): Promise<AxiosResponse<ApiEmailAdressList[]>> {
    return httpInstance.request({
      method: 'GET',
      url: `inquiry/${inquiryId}/addresses`,
      cancelToken:
        cancelTokenHandlerObject[
          this.getParticipantsEmailAddresses.name
        ].handleRequestCancellation().token,
    })
  },

  getSubscription(inquiryId: number): Promise<AxiosResponse<{ subscribed: boolean }>> {
    return httpInstance.request({
      method: 'GET',
      url: `inquiry/${inquiryId}/subscription`,
      cancelToken:
        cancelTokenHandlerObject[this.getSubscription.name].handleRequestCancellation().token,
    })
  },

  setSubscription(
    inquiryId: number,
    subscription: boolean
  ): Promise<AxiosResponse<{ subscribed: boolean }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `inquiry/${inquiryId}${subscription ? '/subscribe' : '/unsubscribe'}`,
      cancelToken:
        cancelTokenHandlerObject[this.setSubscription.name].handleRequestCancellation().token,
    })
  },

  getCommentsCount(inquiryId: number): Promise<AxiosResponse<{ count: number }>> {
    return httpInstance.request({
      method: 'GET',
      url: `inquiry/${inquiryId}/comment-count`,
      cancelToken:
        cancelTokenHandlerObject[this.getCommentsCount.name].handleRequestCancellation().token,
    })
  },

  getSupportsCount(inquiryId: number): Promise<AxiosResponse<{ count: number }>> {
    return httpInstance.request({
      method: 'GET',
      url: `inquiry/${inquiryId}/support-count`,
      cancelToken:
        cancelTokenHandlerObject[this.getSupportsCount.name].handleRequestCancellation().token,
    })
  },

  getCategories(): Promise<AxiosResponse<{ categories: Category[] }>> {
    return httpInstance.request({
      method: 'GET',
      url: `inquiry/${inquiryId}/categories`,
      cancelToken:
        cancelTokenHandlerObject[this.getCategories.name].handleRequestCancellation().token,
    })
  },

  getLocations(): Promise<AxiosResponse<{ locations: Location[] }>> {
    return httpInstance.request({
      method: 'GET',
      url: `inquiry/${inquiryId}/locations`,
      cancelToken:
        cancelTokenHandlerObject[this.getLocations.name].handleRequestCancellation().token,
    })
  },

  enhanceText(text: string): Promise<AxiosResponse<{ text: string }>> {
  return httpInstance.request({
    method: 'POST',
    url: 'inquiry/get-text-ai',
    data: { text },
    cancelToken:
      cancelTokenHandlerObject[this.enhanceText.name]
        .handleRequestCancellation()
        .token,
  })
}


}

const cancelTokenHandlerObject = createCancelTokenHandler(inquiries)

export default inquiries
