/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { AxiosResponse } from '@nextcloud/axios'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'
// Fixed: wrong path (`../stores/inquiryLink.ts` → `../../stores/inquiryLinks.ts`)
import type {
  InquiryLink,
  CreateLinkData as StoreCreateLinkData,
  UpdateLinkData as StoreUpdateLinkData,
  CreateAppResourceData,
} from '../../stores/inquiryLinks.ts'

// The store's CreateLinkData / UpdateLinkData do not declare `metadata`,
// but this API sends it as part of the request body. Extend locally so
// the API compiles without requiring a simultaneous store edit.
// The store's type definitions should be updated to include
// `metadata?: string` as a follow-up.
interface CreateLinkData extends StoreCreateLinkData {
  metadata?: string
}
interface UpdateLinkData extends StoreUpdateLinkData {
  metadata?: string
}

const inquiryLinks = {
  getLinksByInquiry(inquiryId: number): Promise<AxiosResponse<{ links: InquiryLink[] }>> {
    return httpInstance.request({
      method: 'GET',
      url: `inquiry/${inquiryId}/links`,
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.getLinksByInquiry.name].handleRequestCancellation().token,
    })
  },

  getLinksByTarget(
    targetApp: string,
    targetType: string,
    targetId: string
  ): Promise<AxiosResponse<{ links: InquiryLink[] }>> {
    return httpInstance.request({
      method: 'GET',
      url: `links/target/${targetApp}/${targetType}/${targetId}`,
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.getLinksByTarget.name].handleRequestCancellation().token,
    })
  },

  getLinksByTargetApp(targetApp: string): Promise<AxiosResponse<{ links: InquiryLink[] }>> {
    return httpInstance.request({
      method: 'GET',
      url: `links/target-app/${targetApp}`,
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.getLinksByTargetApp.name].handleRequestCancellation().token,
    })
  },

  getLink(id: number): Promise<AxiosResponse<{ link: InquiryLink }>> {
    return httpInstance.request({
      method: 'GET',
      url: `link/${id}`,
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.getLink.name].handleRequestCancellation().token,
    })
  },

  createLink(data: CreateLinkData): Promise<AxiosResponse<{ link: InquiryLink }>> {
    return httpInstance.request({
      method: 'POST',
      url: 'link',
      data: {
        inquiryId: data.inquiryId,
        targetApp: data.targetApp,
        targetType: data.targetType,
        targetId: data.targetId,
        metadata: data.metadata,
        sortOrder: data.sortOrder || 0,
        createdBy: data.createdBy || 0,
      },
      cancelToken: cancelTokenHandlerObject[this.createLink.name].handleRequestCancellation().token,
    })
  },

  createMultipleLinks(
    inquiryId: number,
    links: Omit<CreateLinkData, 'inquiryId'>[]
  ): Promise<AxiosResponse<{ links: InquiryLink[] }>> {
    return httpInstance.request({
      method: 'POST',
      url: `inquiry/${inquiryId}/links`,
      data: { links },
      cancelToken: cancelTokenHandlerObject[this.createMultipleLinks.name].handleRequestCancellation().token,
    })
  },

  updateLink(id: number, data: UpdateLinkData): Promise<AxiosResponse<{ link: InquiryLink }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `link/${id}`,
      data: {
        targetApp: data.targetApp,
        targetType: data.targetType,
        targetId: data.targetId,
        metadata: data.metadata,
        sortOrder: data.sortOrder || 0,
      },
      cancelToken: cancelTokenHandlerObject[this.updateLink.name].handleRequestCancellation().token,
    })
  },

  deleteLink(id: number): Promise<AxiosResponse<{ link: InquiryLink }>> {
    return httpInstance.request({
      method: 'DELETE',
      url: `link/${id}`,
      cancelToken: cancelTokenHandlerObject[this.deleteLink.name].handleRequestCancellation().token,
    })
  },

  deleteLinksByInquiry(inquiryId: number): Promise<AxiosResponse<{ deleted: boolean }>> {
    return httpInstance.request({
      method: 'DELETE',
      url: `inquiry/${inquiryId}/links`,
      cancelToken: cancelTokenHandlerObject[this.deleteLinksByInquiry.name].handleRequestCancellation().token,
    })
  },

  createPoll(data: CreateAppResourceData): Promise<AxiosResponse<{ app: string; id: number }>> {
    return httpInstance.request({
      method: 'POST',
      url: 'link/poll',
      data: { title: data.title, description: data.description || '' },
      cancelToken: cancelTokenHandlerObject[this.createPoll.name].handleRequestCancellation().token,
    })
  },

  createForm(data: CreateAppResourceData): Promise<AxiosResponse<{ app: string; id: number }>> {
    return httpInstance.request({
      method: 'POST',
      url: 'link/form',
      data: { title: data.title, description: data.description || '' },
      cancelToken: cancelTokenHandlerObject[this.createForm.name].handleRequestCancellation().token,
    })
  },

  createDeckCard(data: CreateAppResourceData): Promise<AxiosResponse<{ app: string; id: number }>> {
    return httpInstance.request({
      method: 'POST',
      url: 'link/deck-card',
      data: { title: data.title, description: data.description || '', stackId: data.stackId || 1 },
      cancelToken: cancelTokenHandlerObject[this.createDeckCard.name].handleRequestCancellation().token,
    })
  },

  createCospendExpense(data: CreateAppResourceData): Promise<AxiosResponse<{ app: string; id: number }>> {
    return httpInstance.request({
      method: 'POST',
      url: 'link/cospend-expense',
      data: { amount: data.amount || 0, description: data.description || '' },
      cancelToken: cancelTokenHandlerObject[this.createCospendExpense.name].handleRequestCancellation().token,
    })
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(inquiryLinks)

export default inquiryLinks
