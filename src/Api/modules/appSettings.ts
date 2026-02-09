/**
 * SPDX-FileCopyrightText: 2022 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { AxiosResponse } from '@nextcloud/axios'
import { AppSettings, Group } from '../../stores/appSettings.js'
import { httpInstance, createCancelTokenHandler } from './HttpApi.js'
import { ISearchType, User , Category, Location, InquiryStatus } from '../../Types/index.js'

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

	// InquiryStatus functions
	addInquiryStatus(
		inquiryStatus: InquiryStatus
	): Promise<AxiosResponse<{ inquiryStatus: InquiryStatus }>> {
		return httpInstance.request({
			method: 'POST',
			url: 'settings/inquiry-statuses',
			data: { inquiryStatus },
			cancelToken:
				cancelTokenHandlerObject[this.addInquiryStatus.name].handleRequestCancellation().token,
		})
	},

	deleteInquiryStatus(inquiryStatusId: string): Promise<AxiosResponse> {
		return httpInstance.request({
			method: 'DELETE',
			url: `settings/inquiry-statuses/${inquiryStatusId}`,
			cancelToken:
				cancelTokenHandlerObject[this.deleteInquiryStatus.name].handleRequestCancellation()
			.token,
		})
	},

	updateInquiryStatus(
		inquiryStatusId: string,
		inquiryStatus: InquiryStatus
	): Promise<AxiosResponse<{ inquiryStatus: InquiryStatus }>> {
		return httpInstance.request({
			method: 'PUT',
			url: `settings/inquiry-statuses/${inquiryStatusId}`,
			data: { inquiryStatus },
			cancelToken:
				cancelTokenHandlerObject[this.updateInquiryStatus.name].handleRequestCancellation()
			.token,
		})
	},

	// TYPES METHODS API
	// Inquiry Type functions
	addInquiryType(type: {
		inquiry_type: string;
		family: string;
		label: string;
		icon?: string;
		description?: string;
		fields?: string;
		allowed_response?: string;
		allowed_transformation?: string;
		allowed_option_type?: string;
		created: number;
	}): Promise<AxiosResponse<{ type: InquiryType }>> {
		return httpInstance.request({
			method: 'POST',
			url: 'inquiry/types',
			data: { type },
			cancelToken: cancelTokenHandlerObject[this.addInquiryType.name].handleRequestCancellation().token,
		});
	},

	updateInquiryType(
		typeId: number,
		typeData: {
			inquiry_type?: string;
			family?: string;
			label?: string;
			icon?: string;
			description?: string;
			fields?: string;
			allowed_response?: string;
			allowed_transformation?: string;
		    allowed_option_type?: string;
		}
	): Promise<AxiosResponse<{ type: InquiryType }>> {
		return httpInstance.request({
			method: 'PUT',
			url: `inquiry/types/${typeId}`,
			data: { typeData },
			cancelToken: cancelTokenHandlerObject[this.updateInquiryType.name].handleRequestCancellation().token,
		});
	},

	deleteInquiryType(typeId: number): Promise<AxiosResponse> {
		return httpInstance.request({
			method: 'DELETE',
			url: `inquiry/types/${typeId}`,
			cancelToken: cancelTokenHandlerObject[this.deleteInquiryType.name].handleRequestCancellation().token,
		});
	},

	// FAMILY METHODS API

	// Inquiry Family functions
	addInquiryFamily(family: {
		family_type: string;
		label: string;
		description?: string;
		icon?: string;
		sort_order?: number;
		created: number;
	}): Promise<AxiosResponse<{ family: InquiryFamily }>> {
		return httpInstance.request({
			method: 'POST',
			url: 'inquiry/families',
			data: { family },
			cancelToken: cancelTokenHandlerObject[this.addInquiryFamily.name].handleRequestCancellation().token,
		});
	},

	updateInquiryFamily(
		familyId: number,
		familyData: {
			family_type?: string;
			label?: string;
			description?: string;
			icon?: string;
			sort_order?: number;
		}
	): Promise<AxiosResponse<{ family: InquiryFamily }>> {
		return httpInstance.request({
			method: 'PUT',
			url: `inquiry/families/${familyId}`,
			data: { familyData },
			cancelToken: cancelTokenHandlerObject[this.updateInquiryFamily.name].handleRequestCancellation().token,
		});
	},

	deleteInquiryFamily(familyId: number): Promise<AxiosResponse> {
		return httpInstance.request({
			method: 'DELETE',
			url: `inquiry/families/${familyId}`,
			cancelToken: cancelTokenHandlerObject[this.deleteInquiryFamily.name].handleRequestCancellation().token,
		});
	},

}

const cancelTokenHandlerObject = createCancelTokenHandler(appSettings)

export default appSettings
