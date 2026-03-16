/**
 * SPDX-FileCopyrightText: 2022 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { AxiosResponse } from '@nextcloud/axios'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'
import { Inquiry } from '../../stores/inquiry.ts'
import { InquiryGroup } from '../../stores/inquiryGroups.types.ts'

const inquiryGroups = {

    addGroup(dataInquiryGroup: {
        title: string
        title_ext: string
        type: string
        parentId?: number
        protected?: boolean
        ownedGroup: string
        groupStatus: string
    }): Promise<AxiosResponse<{ inquiryGroup: InquiryGroup }>> {
        return httpInstance.request({
            method: 'POST',
            url: 'inquirygroup/new',
            data: dataInquiryGroup,
            cancelToken: cancelTokenHandlerObject[this.addGroup.name].handleRequestCancellation().token,
        })
    },

    updateGroup(
        inquiryGroupId: number,
        updateData: {
            title?: string
            type?: string
            description?: string
            parentId?: number | 0
            protected?: boolean
            ownedGroup: string
            groupStatus: string
        }
    ): Promise<AxiosResponse<{ inquiryGroup: InquiryGroup }>> {
        return httpInstance.request({
            method: 'PUT',
            url: `inquirygroup/update/${inquiryGroupId}`,
            data: updateData,
            cancelToken:
                cancelTokenHandlerObject[this.updateGroup.name].handleRequestCancellation().token,
        })
    },

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
    
    getAllGroups(): Promise<AxiosResponse<{ inquiryGroups: InquiryGroup[] }>> {
    return httpInstance.request({
        method: 'GET',
        url: 'inquirygroups',
        cancelToken: cancelTokenHandlerObject[this.getAllGroups.name].handleRequestCancellation().token,
        })
    },

    getInquiryGroup(inquiryGroupId: number): Promise<AxiosResponse<{ inquiryGroup: InquiryGroup }>> {
        return httpInstance.request({
            method: 'GET',
            url: `inquirygroup/${inquiryGroupId}`,
            cancelToken: cancelTokenHandlerObject[this.getInquiryGroup.name].handleRequestCancellation().token,
        })
    },

    deleteGroup(inquiryGroupId: number): Promise<AxiosResponse<{ success: boolean }>> {
        return httpInstance.request({
            method: 'DELETE',
            url: `inquirygroup/delete/${inquiryGroupId}`,
            cancelToken: cancelTokenHandlerObject[this.deleteGroup.name].handleRequestCancellation().token,
        })
    },

    reorderInquiriesInGroup(
        inquiryGroupId: number,
        inquiryIds: number[]
    ): Promise<AxiosResponse<{ inquiryGroup: InquiryGroup }>> {
        return httpInstance.request({
            method: 'PUT',
            url: `inquirygroup/${inquiryGroupId}/reorder`,
            data: { inquiryIds },
            cancelToken: cancelTokenHandlerObject[this.reorderInquiriesInGroup.name].handleRequestCancellation().token,
        })
    },

    changeGroupOwner(
        inquiryGroupId: number,
        newOwnerId: string
    ): Promise<AxiosResponse<{ inquiryGroup: InquiryGroup }>> {
        return httpInstance.request({
            method: 'PUT',
            url: `inquirygroup/${inquiryGroupId}/change-owner`,
            data: { newOwnerId },
            cancelToken: cancelTokenHandlerObject[this.changeGroupOwner.name].handleRequestCancellation().token,
        })
    },


    updateMiscField(inquiryId: number, updateData: { key: string, value: string }): Promise<AxiosResponse<{ miscField: string }>> {
        if (!updateData.key || updateData.key.trim() === '') {
            throw new Error('Key cannot be null or empty for misc field update');
        }

        return httpInstance.request({
            method: 'PUT',
            data: updateData,
            url: `inquirygroup/${inquiryId}/updatemiscfield`,
            cancelToken: cancelTokenHandlerObject[this.updateMiscField.name].handleRequestCancellation().token,
        })
    },

    cloneGroup(inquiryGroupId: number): Promise<AxiosResponse<{ inquiryGroup: InquiryGroup }>> {
        return httpInstance.request({
            method: 'POST',
            url: `inquirygroup/${inquiryGroupId}/clone`,
            cancelToken: cancelTokenHandlerObject[this.cloneGroup.name].handleRequestCancellation().token,
        })
    },
}

const cancelTokenHandlerObject = createCancelTokenHandler(inquiryGroups)

export default inquiryGroups
