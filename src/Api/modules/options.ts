/**
 * SPDX-FileCopyrightText: 2022 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { Option, Sequence, SimpleOption } from '../../stores/options.js'
import { DateTimeUnit } from '../../constants/dateUnits.js'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'
import { AxiosResponse } from '@nextcloud/axios'

const options = {
  getOptions(inquiryId: number): Promise<AxiosResponse<{ options: Option[] }>> {
    return httpInstance.request({
      method: 'GET',
      url: `inquiry/${inquiryId}/options`,
      params: { time: +new Date() },
      cancelToken: cancelTokenHandlerObject[this.getOptions.name].handleRequestCancellation().token,
    })
  },

  addOption(
    inquiryId: number,
    option: SimpleOption,
    sequence: Sequence | null
  ): Promise<
    AxiosResponse<{
      added: Option[]
      options: Option[]
    }>
  > {
    return httpInstance.request({
      method: 'POST',
      url: `inquiry/${inquiryId}/option`,
      // data: { ...option },
      data: { option, sequence },
      cancelToken: cancelTokenHandlerObject[this.addOption.name].handleRequestCancellation().token,
    })
  },

  updateOption(option: Option): Promise<AxiosResponse<{ option: Option }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `option/${option.id}`,
      // TODO: replace text with timestamp
      data: { ...option },
      cancelToken:
        cancelTokenHandlerObject[this.updateOption.name].handleRequestCancellation().token,
    })
  },

  deleteOption(optionId: number): Promise<AxiosResponse<{ option: Option }>> {
    return httpInstance.request({
      method: 'DELETE',
      url: `option/${optionId}`,
      params: { time: +new Date() },
      cancelToken:
        cancelTokenHandlerObject[this.deleteOption.name].handleRequestCancellation().token,
    })
  },

  restoreOption(optionId: number): Promise<AxiosResponse<{ option: Option }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `option/${optionId}/restore`,
      params: { time: +new Date() },

      cancelToken:
        cancelTokenHandlerObject[this.restoreOption.name].handleRequestCancellation().token,
    })
  },

  addOptions(
    inquiryId: number,
    optionsBatch: string
  ): Promise<
    AxiosResponse<{
      option: Option
      repetitions: Option[]
      options: Option[]
    }>
  > {
    return httpInstance.request({
      method: 'POST',
      url: 'option/bulk',
      data: {
        inquiryId,
        text: optionsBatch,
      },
      cancelToken: cancelTokenHandlerObject[this.addOptions.name].handleRequestCancellation().token,
    })
  },

  confirmOption(optionId: number): Promise<AxiosResponse<{ option: Option }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `option/${optionId}/confirm`,
      cancelToken:
        cancelTokenHandlerObject[this.confirmOption.name].handleRequestCancellation().token,
    })
  },

  reorderOptions(
    inquiryId: number,
    options: {
      id: number
      text: string
    }[]
  ): Promise<AxiosResponse<{ options: Option[] }>> {
    return httpInstance.request({
      method: 'POST',
      url: `inquiry/${inquiryId}/options/reorder`,
      data: { options },
      cancelToken:
        cancelTokenHandlerObject[this.reorderOptions.name].handleRequestCancellation().token,
    })
  },

  addOptionsSequence(
    optionId: number,
    sequence: Sequence
  ): Promise<AxiosResponse<{ options: Option[] }>> {
    return httpInstance.request({
      method: 'POST',
      url: `option/${optionId}/sequence`,
      data: {
        sequence,
      },
      cancelToken:
        cancelTokenHandlerObject[this.addOptionsSequence.name].handleRequestCancellation().token,
    })
  },

  shiftOptions(
    inquiryId: number,
    step: number,
    unit: DateTimeUnit
  ): Promise<AxiosResponse<{ options: Option[] }>> {
    return httpInstance.request({
      method: 'POST',
      url: `inquiry/${inquiryId}/shift`,
      data: {
        step,
        unit,
      },
      cancelToken:
        cancelTokenHandlerObject[this.shiftOptions.name].handleRequestCancellation().token,
    })
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(options)

export default options
