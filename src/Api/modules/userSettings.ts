/**
 * SPDX-FileCopyrightText: 2022 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import { AxiosResponse } from '@nextcloud/axios';
import { UserPreferences } from '../../stores/preferences.js';
import { httpInstance, createCancelTokenHandler } from './HttpApi.js';

const userSettings = {
  getUserSettings(): Promise<AxiosResponse<{ preferences: UserPreferences }>> {
    return httpInstance.request({
      method: 'GET',
      url: 'preferences',
      params: { time: +new Date() },
      cancelToken:
        cancelTokenHandlerObject[
          this.getUserSettings.name
        ].handleRequestCancellation().token
    });
  },

  writeUserSettings(
    preferences: UserPreferences
  ): Promise<AxiosResponse<{ preferences: UserPreferences }>> {
    return httpInstance.request({
      method: 'POST',
      url: 'preferences',
      data: { preferences },
      cancelToken:
        cancelTokenHandlerObject[
          this.writeUserSettings.name
        ].handleRequestCancellation().token
    });
  }
};

const cancelTokenHandlerObject = createCancelTokenHandler(userSettings);

export default userSettings;
