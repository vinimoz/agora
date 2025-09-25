/**
 * SPDX-FileCopyrightText: 2022 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { AxiosResponse } from '@nextcloud/axios'
import { Share, ShareType, User } from '../../Types/index.js'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'
import { PublicInquiryEmailConditions, SharePurpose } from '../../stores/shares.js'

export type SentResults = {
  sentMails: { emailAddress: string; displayName: string }[]
  abortedMails: { emailAddress: string; displayName: string }[]
}

const shares = {
  getShares(
    inquiryOrInquiryGroupId: number,
    purpose: SharePurpose = 'inquiry'
  ): Promise<AxiosResponse<{ shares: Share[] }>> {
    return httpInstance.request({
      method: 'GET',
      url: `${purpose.toLowerCase()}/${inquiryOrInquiryGroupId}/shares`,
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.getShares.name].handleRequestCancellation().token,
    })
  },

  addUserShare(
    inquiryOrInquiryGroupId: number,
    user: User,
    purpose: SharePurpose = 'inquiry'
  ): Promise<AxiosResponse<{ share: Share }>> {
    // make purpose lower case
    return httpInstance.request({
      method: 'POST',
      url: `${purpose.toLowerCase()}/${inquiryOrInquiryGroupId}/share`,
      data: user,
      cancelToken:
        cancelTokenHandlerObject[this.addUserShare.name].handleRequestCancellation().token,
    })
  },

  addPublicShare(inquiryId: number): Promise<AxiosResponse<{ share: Share }>> {
    return httpInstance.request({
      method: 'POST',
      url: `inquiry/${inquiryId}/publicshare`,
      cancelToken:
        cancelTokenHandlerObject[this.addPublicShare.name].handleRequestCancellation().token,
    })
  },

  writeLabel(shareToken: string, label: string): Promise<AxiosResponse<{ share: Share }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `share/${shareToken}/setlabel`,
      data: {
        label,
      },
      cancelToken: cancelTokenHandlerObject[this.writeLabel.name].handleRequestCancellation().token,
    })
  },

  switchAdmin(shareToken: string, setTo: ShareType): Promise<AxiosResponse<{ share: Share }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `share/${shareToken}/${setTo}`,
      cancelToken:
        cancelTokenHandlerObject[this.switchAdmin.name].handleRequestCancellation().token,
    })
  },

  setEmailAddressConstraint(
    shareToken: string,
    setTo: PublicInquiryEmailConditions
  ): Promise<AxiosResponse<{ share: Share }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `share/${shareToken}/publicinquiryemail/${setTo}`,
      cancelToken:
        cancelTokenHandlerObject[this.setEmailAddressConstraint.name].handleRequestCancellation()
          .token,
    })
  },

  sendInvitation(shareToken: string): Promise<
    AxiosResponse<{
      share: Share
      sentResult: null | SentResults
    }>
  > {
    return httpInstance.request({
      method: 'POST',
      url: `share/${shareToken}/invite`,
      cancelToken:
        cancelTokenHandlerObject[this.sendInvitation.name].handleRequestCancellation().token,
    })
  },

  resolveShare(shareToken: string): Promise<AxiosResponse> {
    return httpInstance.request({
      method: 'GET',
      url: `share/${shareToken}/resolve`,
      params: { time: +new Date() },
      cancelToken:
        cancelTokenHandlerObject[this.resolveShare.name].handleRequestCancellation().token,
    })
  },

  deleteShare(shareToken: string): Promise<AxiosResponse<{ share: Share }>> {
    return httpInstance.request({
      method: 'DELETE',
      url: `share/${shareToken}`,
      cancelToken:
        cancelTokenHandlerObject[this.deleteShare.name].handleRequestCancellation().token,
    })
  },

  restoreShare(shareToken: string): Promise<AxiosResponse<{ share: Share }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `share/${shareToken}/restore`,
      cancelToken:
        cancelTokenHandlerObject[this.restoreShare.name].handleRequestCancellation().token,
    })
  },

  lockShare(shareToken: string): Promise<AxiosResponse<{ share: Share }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `share/${shareToken}/lock`,
      cancelToken: cancelTokenHandlerObject[this.lockShare.name].handleRequestCancellation().token,
    })
  },

  unlockShare(shareToken: string): Promise<AxiosResponse<{ share: Share }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `share/${shareToken}/unlock`,
      cancelToken:
        cancelTokenHandlerObject[this.unlockShare.name].handleRequestCancellation().token,
    })
  },

  inviteAll(
    inquiryId: number
  ): Promise<AxiosResponse<{ inquiry: number; sentResult: null | SentResults }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `inquiry/${inquiryId}/inviteAll`,
      cancelToken: cancelTokenHandlerObject[this.inviteAll.name].handleRequestCancellation().token,
    })
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(shares)

export default shares
