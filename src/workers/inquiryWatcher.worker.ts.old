/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import axios, { AxiosError, AxiosInstance } from 'axios';

const MAX_ERRORS = 5;
const SLEEP_TIMEOUT_DEFAULT = 30000;

let lastUpdated = 0;
let http: AxiosInstance;
let consecutiveErrors = 0;

const shouldContinue = true;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

self.onmessage = async (props) => {
  const {
    updateType,
    inquiryId,
    interval = SLEEP_TIMEOUT_DEFAULT,
    baseUrl,
    token,
    watcherId,
    lastUpdate = lastUpdated
  } = props.data;

  lastUpdated = lastUpdate;

  self.postMessage({
    type: 'status',
    status: 'starting',
    mode: updateType,
    interval,
    message: '[Worker] Recieved new parameters.'
  });

  if (!http) {
    http = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Nc-Agora-Client-Id': watcherId
      },
      validateStatus: (status) => [200, 304].includes(status)
    });
  }

  if (updateType === 'noInquirying') {
    self.postMessage({
      type: 'info',
      status: 'stopped',
      mode: updateType,
      interval,
      message: '[Worker] noInquirying: exiting.'
    });
    self.close();
    return;
  }

  const run = async () => {
    try {
      let endPoint = `inquiry/${inquiryId}/watch`;
      if (token) {
        endPoint = `s/${token}/watch`;
      }

      const response = await http.get(endPoint, {
        params: { offset: lastUpdated }
      });

      consecutiveErrors = 0;

      if (response.status === 200 && response.data.updates?.length > 0) {
        lastUpdated =
          response.data.updates[response.data.updates.length - 1].updated;

        self.postMessage({
          type: 'update',
          status: 'running',
          mode: updateType,
          interval,
          message: '[Worker] 200 got updates',
          updates: response.data.updates,
          lastUpdate: lastUpdated
        });
      } else if (response.status === 304) {
        self.postMessage({
          type: 'info',
          status: 'running',
          mode: updateType,
          interval,
          message: '[Worker] 304 – no changes',
          lastUpdate: lastUpdated
        });
      } else {
        self.postMessage({
          type: 'info',
          status: 'running',
          mode: updateType,
          interval,
          message: '[Worker] 200 but no updates',
          lastUpdate: lastUpdated
        });
      }
    } catch (error) {
      const err = error as AxiosError;

      if (err.code === 'ECONNABORTED' || err.code === 'ERR_CANCELED') {
        self.postMessage({
          type: 'status',
          status: 'stopping',
          mode: updateType,
          interval,
          message: '[Worker] Request aborted by intention',
          lastUpdate: lastUpdated
        });
        return;
      }

      consecutiveErrors = consecutiveErrors + 1;

      self.postMessage({
        type: 'error',
        status: 'error',
        mode: updateType,
        interval,
        message: `[Worker] Request failed (${consecutiveErrors}/${MAX_ERRORS})`
      });

      if (consecutiveErrors >= MAX_ERRORS) {
        self.postMessage({
          type: 'fatal',
          status: 'error',
          mode: updateType,
          interval,
          message: `[Worker] Stopping after ${MAX_ERRORS} consecutive errors`
        });
        self.close();
        return;
      }

      await sleep(interval);
    }
  };

  if (updateType === 'periodicInquirying') {
    self.postMessage({
      type: 'info',
      status: 'starting',
      mode: updateType,
      interval,
      message: '[Worker] Started periodic inquirying.'
    });
    while (shouldContinue) {
      await run();
      self.postMessage({
        type: 'status',
        status: 'idle',
        mode: updateType,
        interval
      });
      await sleep(interval);
    }
  }

  if (updateType === 'longInquirying') {
    self.postMessage({
      type: 'info',
      status: 'starting',
      mode: updateType,
      interval,
      message: '[Worker] Started long inquirying.'
    });
    while (shouldContinue) {
      await run();
    }
  }
};
