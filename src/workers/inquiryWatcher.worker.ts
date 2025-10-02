/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
import axios, { AxiosInstance } from 'axios'

const MAX_ERRORS = 5
const SLEEP_TIMEOUT_DEFAULT = 30000

let lastUpdated = 0
let http: AxiosInstance
let consecutiveErrors = 0

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

interface WorkerMessageData {
  updateType: string
  inquiryId?: string
  interval?: number
  baseUrl: string
  token?: string
  watcherId: string
  lastUpdate?: number
}

interface WorkerResponseMessage {
  type: string
  status: string
  mode: string
  interval: number
  message: string
  updates?: unknown[]
  lastUpdate?: number
}


// Worker message handler
self.onmessage = async (props: MessageEvent<WorkerMessageData>) => {
  const {
    updateType,
    inquiryId,
    interval = SLEEP_TIMEOUT_DEFAULT,
    baseUrl,
    token,
    watcherId,
    lastUpdate = lastUpdated,
  } = props.data

  lastUpdated = lastUpdate

  const sendMessage = (msg: WorkerResponseMessage) => self.postMessage(msg)

  sendMessage({
    type: 'status',
    status: 'starting',
    mode: updateType,
    interval,
    message: '[Worker] Received new parameters.',
  })

  if (!http) {
    http = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Nc-Agora-Client-Id': watcherId,
      },
      validateStatus: status => [200, 304].includes(status),
    })
  }

  if (updateType === 'noInquirying') {
    sendMessage({
      type: 'info',
      status: 'stopped',
      mode: updateType,
      interval,
      message: '[Worker] noInquirying: exiting.',
    })
    self.close()
    return
  }

  const run = async () => {
    try {
      const endPoint = token ? `s/${token}/watch` : `inquiry/${inquiryId}/watch`
      const response = await http.get(endPoint, { params: { offset: lastUpdated } })

      consecutiveErrors = 0

      if (response.status === 200 && response.data.updates?.length) {
        lastUpdated = response.data.updates[response.data.updates.length - 1].updated
        sendMessage({
          type: 'update',
          status: 'running',
          mode: updateType,
          interval,
          message: '[Worker] Got updates',
          updates: response.data.updates,
          lastUpdate: lastUpdated,
        })
      } else if (response.status === 304) {
        sendMessage({
          type: 'info',
          status: 'running',
          mode: updateType,
          interval,
          message: '[Worker] 304 – no changes',
          lastUpdate: lastUpdated,
        })
      }
    } catch {
      consecutiveErrors+=1

      sendMessage({
        type: 'warning',
        status: 'error',
        mode: updateType,
        interval,
        message: `[Worker] Request failed (${consecutiveErrors}/${MAX_ERRORS})`,
      })

      if (consecutiveErrors >= MAX_ERRORS) {
        sendMessage({
          type: 'fatal',
          status: 'error',
          mode: updateType,
          interval,
          message: `[Worker] Stopping after ${MAX_ERRORS} consecutive errors`,
        })
        self.close()
      }

      await sleep(interval)
    }
  }

  if (updateType === 'periodicInquirying') {
    sendMessage({
      type: 'info',
      status: 'starting',
      mode: updateType,
      interval,
      message: '[Worker] Started periodic inquirying.',
    })
    while (true) {
      await run()
      sendMessage({ type: 'status', status: 'idle', mode: updateType, interval })
      await sleep(interval)
    }
  }

  if (updateType === 'longInquirying') {
    sendMessage({
      type: 'info',
      status: 'starting',
      mode: updateType,
      interval,
      message: '[Worker] Started long inquirying.',
    })
    while (true) await run()
  }
}

