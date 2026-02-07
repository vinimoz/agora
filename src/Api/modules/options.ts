/**
 * SPDX-FileCopyrightText: 2022 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { Option, OptionConfiguration } from '../../stores/options.ts'
import { AxiosResponse } from '@nextcloud/axios'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'
import { Support } from '../../stores/supports.ts'
import { Share } from '../../stores/shares.ts'
import { ApiEmailAdressList, Comment } from '../../Types/index.ts'
import { OptionGroup } from '../../stores/optionGroups.types.ts'


export type OptionAction = 'save_draft' | 'submit' | 'archive' | 'restore'

const options = {
    // List all options (for current user)
    getOptions(): Promise<AxiosResponse<{
        options: Option[]
        permissions: {
            optionCreationAllowed: boolean
        }
        optionGroups: OptionGroup[]
    }>> {
        return httpInstance.request({
            method: 'GET',
            url: 'options',
            params: { time: +new Date() },
            cancelToken: cancelTokenHandlerObject[this.getOptions.name].handleRequestCancellation().token,
        })
    },

    // Get options by inquiry ID
    getOptionsByInquiry(inquiryId: number): Promise<AxiosResponse<{ options: Option[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `inquiry/${inquiryId}/options`,
            params: { time: +new Date() },
            cancelToken: cancelTokenHandlerObject[this.getOptionsByInquiry.name].handleRequestCancellation().token,
        })
    },

    // Get hierarchical options by inquiry ID
    getHierarchicalOptions(inquiryId: number): Promise<AxiosResponse<{ options: Option[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `inquiry/${inquiryId}/options/hierarchical`,
            params: { time: +new Date() },
            cancelToken: cancelTokenHandlerObject[this.getHierarchicalOptions.name].handleRequestCancellation().token,
        })
    },

    // Get options by type
    getOptionsByType(inquiryId: number, type: string): Promise<AxiosResponse<{ options: Option[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `inquiry/${inquiryId}/options/type/${type}`,
            params: { time: +new Date() },
            cancelToken: cancelTokenHandlerObject[this.getOptionsByType.name].handleRequestCancellation().token,
        })
    },

    // Get a specific option
    getOption(optionId: number): Promise<AxiosResponse<{ option: Option }>> {
        return httpInstance.request({
            method: 'GET',
            url: `option/${optionId}`,
            params: { time: +new Date() },
            cancelToken: cancelTokenHandlerObject[this.getOption.name].handleRequestCancellation().token,
        })
    },

    // Get child options
    getChildOptions(parentId: number): Promise<AxiosResponse<{ options: Option[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `option/${parentId}/children`,
            params: { time: +new Date() },
            cancelToken: cancelTokenHandlerObject[this.getChildOptions.name].handleRequestCancellation().token,
        })
    },

    // Get full option with related data
    getFullOption(optionId: number): Promise<AxiosResponse<{
        option: Option
        supports: Support[]
        comments: Comment[]
        shares: Share[]
        subscribed: boolean
    }>> {
        return httpInstance.request({
            method: 'GET',
            url: `option/${optionId}/full`,
            params: { time: +new Date() },
            cancelToken: cancelTokenHandlerObject[this.getFullOption.name].handleRequestCancellation().token,
        })
    },

    // Create a new option
// Create a new option
createOption(
    data: {
        title: string
        type: string
        text: string
        targetId?: number
        parentId?: number
        ownedGroup: string
        owner: string
        configuration?: OptionConfiguration
    }
): Promise<AxiosResponse<{ option: Option }>> {
    return httpInstance.request({
        method: 'POST',
        url: 'option',
        data,
        cancelToken: cancelTokenHandlerObject[this.createOption.name]
            .handleRequestCancellation().token,
    })
},

    // Update option
    updateOption(optionId: number, data: Option): Promise<AxiosResponse<{ option: Option }>> {
        return httpInstance.request({
            method: 'PUT',
            url: `option/${optionId}`,
            data,
            cancelToken: cancelTokenHandlerObject[this.updateOption.name].handleRequestCancellation().token,
        })
    },

    // Update option configuration
    updateOptionConfig(optionId: number, configuration: OptionConfiguration): Promise<AxiosResponse<{ option: Option }>> {
        return httpInstance.request({
            method: 'PUT',
            url: `option/${optionId}/config`,
            data: { configuration },
            cancelToken: cancelTokenHandlerObject[this.updateOptionConfig.name].handleRequestCancellation().token,
        })
    },

    // Delete option
    deleteOption(optionId: number): Promise<AxiosResponse<{ option: Option }>> {
        return httpInstance.request({
            method: 'DELETE',
            url: `option/${optionId}`,
            cancelToken: cancelTokenHandlerObject[this.deleteOption.name].handleRequestCancellation().token,
        })
    },

    // Archive option
    archiveOption(optionId: number): Promise<AxiosResponse<{ option: Option }>> {
        return httpInstance.request({
            method: 'PUT',
            url: `option/${optionId}/archive`,
            cancelToken: cancelTokenHandlerObject[this.archiveOption.name].handleRequestCancellation().token,
        })
    },

    // Archive option recursively (with children)
    archiveOptionRecursive(optionId: number): Promise<AxiosResponse<{
        option: Option
        archivedCount: number
    }>> {
        return httpInstance.request({
            method: 'PUT',
            url: `option/${optionId}/archive/recursive`,
            cancelToken: cancelTokenHandlerObject[this.archiveOptionRecursive.name].handleRequestCancellation().token,
        })
    },

    // Restore option
    restoreOption(optionId: number): Promise<AxiosResponse<{ option: Option }>> {
        return httpInstance.request({
            method: 'PUT',
            url: `option/${optionId}/restore`,
            cancelToken: cancelTokenHandlerObject[this.restoreOption.name].handleRequestCancellation().token,
        })
    },

    // Restore option recursively (with children)
    restoreOptionRecursive(optionId: number): Promise<AxiosResponse<{
        option: Option
        archivedCount: number
    }>> {
        return httpInstance.request({
            method: 'PUT',
            url: `option/${optionId}/restore/recursive`,
            cancelToken: cancelTokenHandlerObject[this.restoreOptionRecursive.name].handleRequestCancellation().token,
        })
    },

    // Reorder options
    reorderOptions(optionIds: number[]): Promise<AxiosResponse<{ success: boolean }>> {
        return httpInstance.request({
            method: 'POST',
            url: 'options/reorder',
            data: { optionIds },
            cancelToken: cancelTokenHandlerObject[this.reorderOptions.name].handleRequestCancellation().token,
        })
    },

    // Update option sort order
    updateSortOrder(optionId: number, sortOrder: number): Promise<AxiosResponse<{ success: boolean }>> {
        return httpInstance.request({
            method: 'PUT',
            url: `option/${optionId}/sort`,
            data: { sortOrder },
            cancelToken: cancelTokenHandlerObject[this.updateSortOrder.name].handleRequestCancellation().token,
        })
    },

    // Clone option
    cloneOption(optionId: number, type?: string): Promise<AxiosResponse<{ option: Option }>> {
        return httpInstance.request({
            method: 'POST',
            url: `option/${optionId}/clone`,
            data: { type },
            cancelToken: cancelTokenHandlerObject[this.cloneOption.name].handleRequestCancellation().token,
        })
    },

    // Transfer option ownership
    transferOption(optionId: number, targetUserId: string): Promise<AxiosResponse<{ option: Option }>> {
        return httpInstance.request({
            method: 'PUT',
            url: `option/${optionId}/transfer`,
            data: { targetUserId },
            cancelToken: cancelTokenHandlerObject[this.transferOption.name].handleRequestCancellation().token,
        })
    },

    // Takeover option
    takeoverOption(optionId: number): Promise<AxiosResponse<{ option: Option }>> {
        return httpInstance.request({
            method: 'PUT',
            url: `option/${optionId}/takeover`,
            cancelToken: cancelTokenHandlerObject[this.takeoverOption.name].handleRequestCancellation().token,
        })
    },

    // Apply action to option
    applyAction(optionId: number, action: OptionAction): Promise<AxiosResponse<{ option: Option }>> {
        return httpInstance.request({
            method: 'PUT',
            url: `option/${optionId}/action`,
            data: { action },
            cancelToken: cancelTokenHandlerObject[this.applyAction.name].handleRequestCancellation().token,
        })
    },

    // Update option status
    setOptionStatus(optionId: number, status: string): Promise<AxiosResponse<{ success: boolean }>> {
        return httpInstance.request({
            method: 'PUT',
            url: `option/${optionId}/status`,
            data: { status },
            cancelToken: cancelTokenHandlerObject[this.setOptionStatus.name].handleRequestCancellation().token,
        })
    },

    // Update option access
    setOptionAccess(optionId: number, access: string): Promise<AxiosResponse<{ success: boolean }>> {
        return httpInstance.request({
            method: 'PUT',
            url: `option/${optionId}/access`,
            data: { access },
            cancelToken: cancelTokenHandlerObject[this.setOptionAccess.name].handleRequestCancellation().token,
        })
    },

    // Search options
    searchOptions(term: string): Promise<AxiosResponse<{ options: Option[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: 'options/search',
            params: { term, time: +new Date() },
            cancelToken: cancelTokenHandlerObject[this.searchOptions.name].handleRequestCancellation().token,
        })
    },

    // Get valid enum values
    getOptionEnums(): Promise<AxiosResponse<{
        access: string[]
        showResults: string[]
        types: string[]
    }>> {
        return httpInstance.request({
            method: 'GET',
            url: 'options/enums',
            cancelToken: cancelTokenHandlerObject[this.getOptionEnums.name].handleRequestCancellation().token,
        })
    },

    // Get option fields configuration
    getOptionFields(type: string): Promise<AxiosResponse<{ fields: any[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `options/fields/${type}`,
            cancelToken: cancelTokenHandlerObject[this.getOptionFields.name].handleRequestCancellation().token,
        })
    },

    // Get allowed responses for option type
    getAllowedResponses(type: string): Promise<AxiosResponse<{ responses: any[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `options/responses/${type}`,
            cancelToken: cancelTokenHandlerObject[this.getAllowedResponses.name].handleRequestCancellation().token,
        })
    },

    // Get participant email addresses
    getOptionParticipantEmails(optionId: number): Promise<AxiosResponse<ApiEmailAdressList[]>> {
        return httpInstance.request({
            method: 'GET',
            url: `option/${optionId}/participants/emails`,
            cancelToken: cancelTokenHandlerObject[this.getOptionParticipantEmails.name].handleRequestCancellation().token,
        })
    },

    // Get calendar events for option
    getOptionCalendarEvents(optionId: number): Promise<AxiosResponse<{ events: any[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: `option/${optionId}/events`,
            cancelToken: cancelTokenHandlerObject[this.getOptionCalendarEvents.name].handleRequestCancellation().token,
        })
    },

    // Get options for admin
    getAdminOptions(): Promise<AxiosResponse<{ options: Option[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: 'admin/options',
            cancelToken: cancelTokenHandlerObject[this.getAdminOptions.name].handleRequestCancellation().token,
        })
    },

    // Get options list for admin
    listAdminOptions(): Promise<AxiosResponse<{ options: Option[] }>> {
        return httpInstance.request({
            method: 'GET',
            url: 'admin/options/list',
            cancelToken: cancelTokenHandlerObject[this.listAdminOptions.name].handleRequestCancellation().token,
        })
    },

    // Update misc field
    updateOptionMiscField(optionId: number, updateData: { key: string, value: any }): Promise<AxiosResponse<{ miscField: string }>> {
        if (!updateData.key || updateData.key.trim() === '') {
            throw new Error('Key cannot be null or empty for misc field update');
        }

        return httpInstance.request({
            method: 'PUT',
            data: updateData,
            url: `option/${optionId}/updatemiscfield`,
            cancelToken: cancelTokenHandlerObject[this.updateOptionMiscField.name].handleRequestCancellation().token,
        })
    },

    // Get option statistics
    getOptionStatistics(optionId: number): Promise<AxiosResponse<{
        supportsCount: number
        positiveSupports: number
        negativeSupports: number
        neutralSupports: number
        commentsCount: number
        participantsCount: number
    }>> {
        return httpInstance.request({
            method: 'GET',
            url: `option/${optionId}/statistics`,
            cancelToken: cancelTokenHandlerObject[this.getOptionStatistics.name].handleRequestCancellation().token,
        })
    },

    // Bulk create options
    createBulkOptions(inquiryId: number, optionsData: Option): Promise<AxiosResponse<{ options: Option[] }>> {
        return httpInstance.request({
            method: 'POST',
            url: `inquiry/${inquiryId}/options/bulk`,
            data: { options: optionsData },
            cancelToken: cancelTokenHandlerObject[this.createBulkOptions.name].handleRequestCancellation().token,
        })
    },

    // Get option subscription status
    getOptionSubscription(optionId: number): Promise<AxiosResponse<{ subscribed: boolean }>> {
        return httpInstance.request({
            method: 'GET',
            url: `option/${optionId}/subscription`,
            cancelToken: cancelTokenHandlerObject[this.getOptionSubscription.name].handleRequestCancellation().token,
        })
    },

    // Set option subscription
    setOptionSubscription(optionId: number, subscription: boolean): Promise<AxiosResponse<{ subscribed: boolean }>> {
        return httpInstance.request({
            method: 'PUT',
            url: `option/${optionId}${subscription ? '/subscribe' : '/unsubscribe'}`,
            cancelToken: cancelTokenHandlerObject[this.setOptionSubscription.name].handleRequestCancellation().token,
        })
    }
}

const cancelTokenHandlerObject = createCancelTokenHandler(options)

export default options
