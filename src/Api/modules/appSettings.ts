/**
 * SPDX-FileCopyrightText: 2022 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { AxiosResponse } from '@nextcloud/axios'
import { AppSettings, Group } from '../../stores/appSettings.js'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'
import { ISearchType, User , Category, Location, ModerationStatus } from '../../Types/index.js'

const appSettings = {
  getAppSettings(): Promise<AxiosResponse<{ appSettings: AppSettings }>> {
    return httpInstance.request({
      method: 'GET',
      url: 'settings/app',
      params: { time: +new Date() },
      cancelToken:
        cancelTokenHandlerObject[this.getAppSettings.name].handleRequestCancellation().token,
    })
  },

  writeAppSettings(appSettings: AppSettings): Promise<AxiosResponse<{ appSettings: AppSettings }>> {
    return httpInstance.request({
      method: 'POST',
      url: 'settings/app',
      data: { appSettings },
      cancelToken:
        cancelTokenHandlerObject[this.writeAppSettings.name].handleRequestCancellation().token,
    })
  },

  getGroups(query: string): Promise<AxiosResponse<{ groups: Group[] }>> {
    return httpInstance.request({
      method: 'GET',
      url: `groups${query.trim() ? `/${query.trim()}` : ''}`,
      cancelToken: cancelTokenHandlerObject[this.getGroups.name].handleRequestCancellation().token,
    })
  },

  getUsers(query: string, types: ISearchType[]): Promise<AxiosResponse<{ siteusers: User[] }>> {
    return httpInstance.request({
      method: 'GET',
      url: `search/users${query.trim() ? `/${query.trim()}` : ''}`,
      params: { types: types.toString() },
      cancelToken: cancelTokenHandlerObject[this.getUsers.name].handleRequestCancellation().token,
    })
  },

  // Category functionsa
  addCategory(category: {
    name: string
    parentId?: number
  }): Promise<AxiosResponse<{ category: Category }>> {
    return httpInstance.request({
      method: 'POST',
      url: 'settings/categories',
      data: { category },
      cancelToken:
        cancelTokenHandlerObject[this.addCategory.name].handleRequestCancellation().token,
    })
  },

  deleteCategory(categoryId: string): Promise<AxiosResponse> {
    return httpInstance.request({
      method: 'DELETE',
      url: `settings/categories/${categoryId}`,
      cancelToken:
        cancelTokenHandlerObject[this.deleteCategory.name].handleRequestCancellation().token,
    })
  },

  updateCategory(
    categoryId: number,
    name: string,
    parentId?: number
  ): Promise<AxiosResponse<{ category: Category }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `settings/categories/${categoryId}`,
      data: { name, parentId },
      cancelToken:
        cancelTokenHandlerObject[this.updateCategory.name].handleRequestCancellation().token,
    })
  },

  // Location functions
  addLocation(location: Location): Promise<AxiosResponse<{ location: Location }>> {
    return httpInstance.request({
      method: 'POST',
      url: 'settings/locations',
      data: { location },
      cancelToken:
        cancelTokenHandlerObject[this.addLocation.name].handleRequestCancellation().token,
    })
  },

  deleteLocation(locationId: string): Promise<AxiosResponse> {
    return httpInstance.request({
      method: 'DELETE',
      url: `settings/locations/${locationId}`,
      cancelToken:
        cancelTokenHandlerObject[this.deleteLocation.name].handleRequestCancellation().token,
    })
  },

  updateLocation(
    locationId: number,
    name: string,
    parentId?: number
  ): Promise<AxiosResponse<{ location: Location }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `settings/locations/${locationId}`,
      data: { name, parentId },
      cancelToken:
        cancelTokenHandlerObject[this.updateLocation.name].handleRequestCancellation().token,
    })
  },

  // ModerationStatus functions
  addModerationStatus(
    moderationStatus: ModerationStatus
  ): Promise<AxiosResponse<{ moderationStatus: ModerationStatus }>> {
    return httpInstance.request({
      method: 'POST',
      url: 'settings/moderation-statuses',
      data: { moderationStatus },
      cancelToken:
        cancelTokenHandlerObject[this.addModerationStatus.name].handleRequestCancellation().token,
    })
  },

  deleteModerationStatus(moderationStatusId: string): Promise<AxiosResponse> {
    return httpInstance.request({
      method: 'DELETE',
      url: `settings/moderation-statuses/${moderationStatusId}`,
      cancelToken:
        cancelTokenHandlerObject[this.deleteModerationStatus.name].handleRequestCancellation()
          .token,
    })
  },

  updateModerationStatus(
    moderationStatusId: string,
    moderationStatus: ModerationStatus
  ): Promise<AxiosResponse<{ moderationStatus: ModerationStatus }>> {
    return httpInstance.request({
      method: 'PUT',
      url: `settings/moderation-statuses/${moderationStatusId}`,
      data: { moderationStatus },
      cancelToken:
        cancelTokenHandlerObject[this.updateModerationStatus.name].handleRequestCancellation()
          .token,
    })
  },
}

const cancelTokenHandlerObject = createCancelTokenHandler(appSettings)

export default appSettings
