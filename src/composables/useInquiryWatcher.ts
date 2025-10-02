/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { watch, onBeforeUnmount, onMounted } from 'vue'
import { useInquiryStore } from '../stores/inquiry'
import { generateUrl } from '@nextcloud/router'

// eslint-disable-next-line import/default
import InquiryWatcherWorker from '../workers/inquiryWatcher.worker?worker'
import { Logger } from '../helpers'

import { useCommentsStore } from '../stores/comments'
import { useOptionsStore } from '../stores/options'
import { useInquiriesStore } from '../stores/inquiries'
import { useSessionStore } from '../stores/session'
import { useSupportsStore } from '../stores/supports'
import { useSharesStore } from '../stores/shares'

import type {
  WatcherMode,
  WatcherProps,
  WatcherData,
  WorkerResponse,
} from './useInquiryWatcher.types'

import type { Watcher } from '../stores/session.types'

/**
 * inquiry watcher to keep inquiries collection and the current inquiry
 * up-to-date as soon as possible
 * Simulates real-time updates using long inquirying or interval inquirying
 *
 * @param interval - inquirying interval in milliseconds (default: 30000)
 */
export const useInquiryWatcher = (interval = 30000) => {
  const sessionStore = useSessionStore()
  const inquiryStore = useInquiryStore()
  const inquiriesStore = useInquiriesStore()
  const supportsStore = useSupportsStore()
  const optionsStore = useOptionsStore()
  const commentsStore = useCommentsStore()
  const sharesStore = useSharesStore()

  const baseUrl = generateUrl('apps/agora/')

  let worker: Worker | null = null

  /**
   * Starts a new Web Worker that watches for updates
   *
   * @param inquiryId - ID of the currently active inquiry
   * @param mode - inquirying mode (e.g. longInquirying, periodicInquirying, noInquirying)
   */
  const startWorker = (inquiryId: number | null | undefined, mode: WatcherMode) => {
    // if a worker is already running, terminate it first
    if (worker) {
      worker.terminate()
      worker = null
    }

    if (sessionStore.appSettings.updateType === 'noInquirying') {
      return
    }

    worker = new InquiryWatcherWorker()

    // Pass context to worker
    worker.postMessage({
      inquiryId,
      updateType: mode,
      interval,
      baseUrl,
      token: sessionStore.token,
      watcherId: sessionStore.watcher.id,
      lastUpdate: sessionStore.watcher.lastUpdate,
    } satisfies WatcherProps)

    // Handle messages from worker
    worker.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const { type, message, updates, status, mode, lastUpdate, params } = e.data

      sessionStore.watcher = <Watcher>{
        ...sessionStore.watcher,
        mode,
        status,
        interval,
        lastUpdate: lastUpdate ?? sessionStore.watcher.lastUpdate,
        lastMessage: message ?? sessionStore.watcher.lastMessage,
      }

      switch (type) {
        case 'info':
          Logger.info(`[InquiryWatcher] ${message}`, { params })
          break
        case 'debug':
          Logger.debug(`[InquiryWatcher] ${message}`)
          break
        case 'warning':
          Logger.warn(`[InquiryWatcher] ${message}`)
          break
        case 'error':
          Logger.error(`[InquiryWatcher] ${message}`)
          break
        case 'update':
          Logger.info(`[InquiryWatcher] ${message}`)
          if (Array.isArray(updates)) {
            handleWatcherUpdates(updates)
          }

          break
        case 'status':
          if (message) Logger.info(`[InquiryWatcher] ${message}`, { params })

          if (status === 'modeChanged') {
            sessionStore.load()
          }

          break
        default:
          Logger.warn('[InquiryWatcher] Unknown message type:', { type })
      }
    }
  }

  /**
   * Terminate the current worker
   */
  const stopWorker = () => {
    if (worker) {
      worker.terminate()
      worker = null
      sessionStore.watcher = <Watcher>{
        ...sessionStore.watcher,
        status: 'stopped',
        lastMessage: 'Watcher stopped.',
        lastUpdate: Math.floor(Date.now() / 1000),
      }
      Logger.info('[InquiryWatcher] Worker stopped.')
    }
  }

  /**
   * Determines which store modules to update based on incoming WatcherResponse objects
   *
   * @param updates - list of update events from the server
   * @param currentInquiryId - current inquiry ID to distinguish between own and external changes
   * @return list of update types to apply
   */
  const getTasksFromUpdates = (updates: WatcherData[], currentInquiryId: number): string[] => {
    // Use a Set to prevent duplicates
    const tasks = new Set<string>()

    for (const update of updates) {
      if (update.inquiryId === currentInquiryId) {
        tasks.add(update.table)
      } else if (update.table === 'inquiries') {
        if (update.inquiryId === currentInquiryId) {
          tasks.add('inquiry')
        }
        tasks.add('inquiries')
      }
    }

    // Return the Set as array
    return Array.from(tasks)
  }

  /**
   * Handles the actions based on the tsaks received from the worker
   *
   * @param tasks - list of tasks to handle
   */
  const handleWatcherTasks = (tasks: string[]) => {
    Logger.info('[InquiryWatcher] Tasks to handle:', { tasks })

    tasks.forEach((task: string) => {
      switch (task) {
        case 'shares':
          sharesStore.load()
          break
        case 'inquiries':
          inquiryStore.load()
          inquiriesStore.load()
          break
        case 'supports':
          supportsStore.load()
          break
        case 'options':
          optionsStore.load()
          break
        case 'comments':
          commentsStore.load()
          break
      }
    })
  }

  /**
   * Dispatches updates to the relevant store modules based on change type.
   *
   * @param updates - update information from the worker
   */
  const handleWatcherUpdates = (updates: WatcherData[]) => {
    const tasks = getTasksFromUpdates(updates, inquiryStore.id)
    Logger.info('[InquiryWatcher] Updates received:', { updates })
    handleWatcherTasks(tasks)
  }

  /**
   * Handles visibility changes for the browser tab.
   * Stops the worker when the tab is hidden, restarts it when visible again.
   */
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      Logger.info('[InquiryWatcher] Window visible → restarting worker')
      startWorker(inquiryStore.id, sessionStore.appSettings.updateType)
    } else {
      Logger.info('[InquiryWatcher] Window hidden → stopping worker')
      stopWorker()
    }
  }

  /**
   * Initialize visibility handling and start worker if visible.
   */
  onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    stopWorker()
  })

  /**
   * Reactively restart the worker whenever inquiryId or updateType changes.
   */
  watch(
    [() => inquiryStore.id, () => sessionStore.appSettings.updateType],
    ([inquiryIdNew, modeNew], [inquiryIdOld, modeOld]) => {
      Logger.debug('[InquiryWatcher] InquiryWatcher worker restarted:', {
        inquiryId: `${inquiryIdOld} → ${inquiryIdNew}`,
        mode: `${modeOld} → ${modeNew}`,
      })
      if (sessionStore.appSettings.updateType !== 'noInquirying') {
        startWorker(inquiryIdNew, modeNew)
      }
    },
    { immediate: true }
  )
}
