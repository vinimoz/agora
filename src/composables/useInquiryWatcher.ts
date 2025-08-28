/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { watch, onBeforeUnmount, onMounted } from 'vue';
import { useSessionStore, Watcher } from '../stores/session';
import { useInquiryStore } from '../stores/inquiry';
import { generateUrl } from '@nextcloud/router';
import InquiryWatcherWorker from '../workers/inquiryWatcher.worker?worker';
import { Logger } from '../helpers/index.ts';
import type { WatcherResponse } from './useInquiryWatcher.types';
import { forEach } from 'lodash';
import { useInquiriesStore } from '../stores/inquiries.ts';
import { useOptionsStore } from '../stores/options.ts';
import { useCommentsStore } from '../stores/comments.ts';
import { useSupportsStore } from '../stores/supports.ts';

/**
 * inquiry watcher to keep inquiries collection and the current inquiry
 * up-to-date as soon as possible
 * Simulates real-time updates using long inquirying or interval inquirying
 *
 * @param interval - inquirying interval in milliseconds (default: 30000)
 */
export const useInquiryWatcher = (interval = 30000) => {
  const sessionStore = useSessionStore();
  const inquiryStore = useInquiryStore();
  const inquiriesStore = useInquiriesStore();
  const supportsStore = useSupportsStore();
  const optionsStore = useOptionsStore();
  const commentsStore = useCommentsStore();

  const baseUrl = generateUrl('apps/agora/');

  let worker: Worker | null = null;

  /**
   * Starts a new Web Worker that watches for updates
   *
   * @param inquiryId - ID of the currently active inquiry
   * @param updateType - inquirying mode (e.g. longInquirying, periodicInquirying, noInquirying)
   */
  const startWorker = (
    inquiryId: number | null | undefined,
    updateType: string
  ) => {
    // if a worker is already running, terminate it first
    if (worker) {
      worker.terminate();
      worker = null;
    }

    worker = new InquiryWatcherWorker();

    // Pass context to worker
    worker.postMessage({
      inquiryId,
      updateType,
      interval,
      baseUrl,
      token: sessionStore.token,
      watcherId: sessionStore.watcher.id,
      lastUpdate: sessionStore.watcher.lastUpdate
    });

    // Handle messages from worker
    worker.onmessage = (e) => {
      const { type, message, updates, status, mode, lastUpdated } = e.data;

      sessionStore.watcher = <Watcher>{
        ...sessionStore.watcher,
        mode,
        status,
        interval,
        lastUpdate: lastUpdated ?? sessionStore.watcher.lastUpdate,
        lastMessage: message ?? sessionStore.watcher.lastMessage
      };

      switch (type) {
      case 'info':
        Logger.info(`[InquiryWatcher] ${message}`);
        break;
      case 'debug':
        Logger.debug(`[InquiryWatcher] ${message}`);
        break;
      case 'error':
      case 'fatal':
        Logger.error(`[InquiryWatcher] ${message}`);
        break;
      case 'update':
        Logger.info(`[InquiryWatcher] ${message}`);
        if (Array.isArray(updates)) {
          handleWatcherUpdates(updates);
        }
        break;
      case 'status':
        if (message) Logger.info(`[InquiryWatcher] ${message}`);
        break;
      default:
        Logger.warn('[InquiryWatcher] Unknown message type:', { type });
      }
    };
  };

  /**
   * Terminate the current worker
   */
  const stopWorker = () => {
    if (worker) {
      worker.terminate();
      worker = null;
      sessionStore.watcher = <Watcher>{
        ...sessionStore.watcher,
        status: 'stopped',
        lastMessage: 'Watcher stopped.',
        lastUpdate: Math.floor(Date.now() / 1000)
      };
      Logger.info('[InquiryWatcher] Worker stopped.');
    }
  };

  /**
   * Determines which store modules to update based on incoming WatcherResponse objects
   *
   * @param updates - list of update events from the server
   * @param currentInquiryId - current inquiry ID to distinguish between own and external changes
   * @return list of update types to apply
   */
  const getTasksFromUpdates = (
    updates: WatcherResponse[],
    currentInquiryId: number
  ): string[] => {
    // Use a Set to prevent duplicates
    const tasks = new Set<string>();

    for (const update of updates) {
      if (update.inquiryId === currentInquiryId) {
        tasks.add(update.table);
      } else if (update.table === 'inquiries') {
        if (update.inquiryId === currentInquiryId) {
          tasks.add('inquiry');
        }
        tasks.add('inquiries');
      }
    }

    // Return the Set as array
    return Array.from(tasks);
  };

  /**
   * Handles the actions based on the tsaks received from the worker
   *
   * @param tasks - list of tasks to handle
   */
  const handleWatcherTasks = (tasks: string[]) => {
    Logger.info('[InquiryWatcher] Tasks to handle:', { tasks });

    forEach(tasks, (task) => {
      switch (task) {
      case 'inquiry':
        inquiryStore.load();
        break;
      case 'inquiries':
        inquiriesStore.load();
        break;
      case 'supports':
        supportsStore.load();
        optionsStore.load();
        break;
      case 'options':
        optionsStore.load();
        break;
      case 'comments':
        commentsStore.load();
        break;
      }
    });
  };

  /**
   * Dispatches updates to the relevant store modules based on change type.
   *
   * @param updates - update information from the worker
   */
  const handleWatcherUpdates = (updates: WatcherResponse[]) => {
    const tasks = getTasksFromUpdates(updates, inquiryStore.id);
    Logger.info('[InquiryWatcher] Updates received:', { updates });
    handleWatcherTasks(tasks);
  };

  /**
   * Handles visibility changes for the browser tab.
   * Stops the worker when the tab is hidden, restarts it when visible again.
   */
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      Logger.info('[InquiryWatcher] Window visible → restarting worker');
      startWorker(inquiryStore.id, sessionStore.appSettings.updateType);
    } else {
      Logger.info('[InquiryWatcher] Window hidden → stopping worker');
      stopWorker();
    }
  };

  /**
   * Initialize visibility handling and start worker if visible.
   */
  onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (document.visibilityState === 'visible') {
      startWorker(inquiryStore.id, sessionStore.appSettings.updateType);
    }
  });

  onBeforeUnmount(() => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    stopWorker();
  });

  /**
   * Reactively restart the worker whenever inquiryId or updateType changes.
   */
  watch(
    [() => inquiryStore.id, () => sessionStore.appSettings.updateType],
    ([inquiryId, updateType]) => {
      startWorker(inquiryId, updateType);
    },
    { immediate: true }
  );
};
