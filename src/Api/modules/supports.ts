/**
 * SPDX-FileCopyrightText: 2023 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { AxiosResponse } from '@nextcloud/axios'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'
import { Support } from '../../stores/supports.ts'
import type { SupportResultData } from './index.ts' 

export interface SupportValue {
    value?: number | string | boolean
    values?: Record<string, unknown>
    ranking?: Record<number, number>  // optionId -> rank
    scores?: Record<number, number>   // optionId -> score
    reaction?: string
    selected?: number[]                // Array of selected option IDs
}

export interface AddSupportOptions {
    value: number | string | SupportValue
    weight?: number
    engineId?: number
}

const supports = {
    /**
     * Add support for an inquiry
     * @param inquiryId The inquiry ID to support
     * @param userId User ID
     * @param optionId Option ID (0 for inquiry-level)
     * @param data Support data (value, weight, engineId)
     */
    addSupport(
        inquiryId: number, 
        userId: string, 
        optionId: number, 
        data: AddSupportOptions
    ): Promise<AxiosResponse<{ support: Support; result: SupportResultData | null } >> {
        console.log(" VALUUUUUUUUUUUUUUUUUUUUUUU ",data.value)
        console.log(" VALUUUUUUUUUUUUUUUUUUUUUUU ENGINE ID ",data.engineId)
        return httpInstance.request({
            method: 'POST',
            url: `inquiry/support/${inquiryId}/${userId}/${optionId}`,
            data,  // Send in request body
            cancelToken: cancelTokenHandlerObject[this.addSupport.name].handleRequestCancellation().token,
        })
    },

    /**
     * Update support for an inquiry
     * @param inquiryId The inquiry ID to support
     * @param userId User ID
     * @param optionId Option ID (0 for inquiry-level)
     * @param data Support data (value, weight, engineId)
     */
    updateSupport(
        inquiryId: number, 
        userId: string, 
        optionId: number, 
        data: AddSupportOptions
    ): Promise<AxiosResponse<{ support: Support; result: SupportResultData | null } >> {
        console.log(" VALUUUUUUUUUUUUUUUUUUUUUUU ",data.value)
        console.log(" VALUUUUUUUUUUUUUUUUUUUUUUU ENGINE ID ",data.engineId)
        return httpInstance.request({
            method: 'PUT',
            url: `inquiry/support/${inquiryId}/${userId}/${optionId}`,
            data,  // Send in request body
            cancelToken: cancelTokenHandlerObject[this.updateSupport.name].handleRequestCancellation().token,
        })
    },

    /**
     * Remove support for an inquiry
     * @param inquiryId The inquiry ID to remove support from
     * @param userId User ID
     * @param optionId Option ID (0 for inquiry-level)
     * @param engineId Optional engine ID for context
     */
    removeSupport(
        inquiryId: number, 
        userId: string, 
        optionId: number, 
        engineId?: number
    ): Promise<AxiosResponse<{ success: boolean; result: SupportResultData | null } >> {
        const url = engineId 
            ? `inquiry/support/${inquiryId}/${userId}/${optionId}/${engineId}`
            : `inquiry/support/${inquiryId}/${userId}/${optionId}`
        
        return httpInstance.request({
            method: 'DELETE',
            url,
            cancelToken: cancelTokenHandlerObject[this.removeSupport.name].handleRequestCancellation().token,
        })
    },

    /**
     * Remove all supports for an inquiry
     * @param inquiryId The inquiry ID
     */
    removeAllSupport(inquiryId: number): Promise<AxiosResponse<{ success: boolean; count: number }>> {
        return httpInstance.request({
            method: 'DELETE',
            url: `inquiry/support/inquiry/${inquiryId}/all`,
            cancelToken: cancelTokenHandlerObject[this.removeAllSupport.name].handleRequestCancellation().token,
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
            cancelToken: cancelTokenHandlerObject[this.getByInquiryId.name].handleRequestCancellation().token,
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
            cancelToken: cancelTokenHandlerObject[this.getByUserId.name].handleRequestCancellation().token,
        })
    },

    /**
     * Get support statistics grouped by inquiry type
     */
    getSupportStats(): Promise<AxiosResponse<{ [type: string]: number }>> {
        return httpInstance.request({
            method: 'GET',
            url: 'inquiry/support/stats/grouped',
            cancelToken: cancelTokenHandlerObject[this.getSupportStats.name].handleRequestCancellation().token,
        })
    },
}

const cancelTokenHandlerObject = createCancelTokenHandler(supports)

export default supports
