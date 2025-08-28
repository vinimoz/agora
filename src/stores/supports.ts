/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from 'pinia';
import { SupportsAPI, PublicAPI } from '../Api/index.ts';
import { groupSupports, Logger } from '../helpers/index.ts';
import { useSessionStore } from './session.ts';
import type { AxiosError } from '@nextcloud/axios';

export type Support = {
  id: number;
  inquiryId: number;
  userId: string;
  created: number;
};

export type ShortSupport = {
  id: number;
};

export type Supports = {
  supports: Support[];
};

export interface SupportsGrouped extends Support {
  supports: Support[];
}

export const useSupportsStore = defineStore('supports', {
  state: () => ({
    supports: [] as Array<{
      inquiryId: string;
      created: number;
    }>
  }),

  getters: {
    count: (state) => state.supports.length,
    groupedSupports: (state) => groupSupports(state.supports),

    hasSupport: (state) => (inquiryId: number, userId: string) =>
      state.supports.some((s) => s.userId === userId)
  },

  actions: {
    toggleSupport(inquiryId, userId) {
      if (this.hasSupport(inquiryId, userId)) {
        this.removeSupport(inquiryId, userId);
      } else {
        this.addSupport(inquiryId, userId);
      }
    },

    async load() {
      const sessionStore = useSessionStore();
      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.getSupports(
              sessionStore.route.params.token as string
            );
          }
          if (sessionStore.route.name === 'inquiry') {
            return SupportsAPI.getInquiryId(sessionStore.currentInquiryId);
          }

          return null;
        })();

        if (!response) {
          this.$reset();
          return;
        }

        this.supports = response.data.supports;
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return;
        }
        this.$reset();
      }
    },

    async add() {
      const sessionStore = useSessionStore();
      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.addSupport(
              sessionStore.publicToken,
              sessionStore.currentInquiryId,
              sessionStore.currentUser.id
            );
          }
          if (sessionStore.route.name === 'inquiry') {
            return SupportsAPI.addSupport(
              sessionStore.currentInquiryId,
              sessionStore.currentUser.id
            );
          }
          return null;
        })();

        if (!response) {
          this.$reset();
          return;
        }

        this.load();
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return;
        }
        Logger.error('Error writing support', {
          error
        });
        throw error;
      }
    },

    async remove() {
      const sessionStore = useSessionStore();

      try {
        await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.removeSupport(
              sessionStore.publicToken,
              sessionStore.currentInquiryId,
              sessionStore.currentUser.id
            );
          }
          return SupportsAPI.removeSupport(
            sessionStore.currentInquiryId,
            sessionStore.currentUser.id
          );
        })();
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return;
        }
        Logger.error('Error deleting support', {
          error
        });
        throw error;
      }
    },

    /**
     * Add support for an inquiry and userID
     * @param inquiryId
     * @param userId
     */
    async addSupport(inquiryId, userId) {
      try {
        await SupportsAPI.addSupport(inquiryId, userId);
        this.supports.push({
          inquiryId,
          userId,
          created: Date.now()
        });
      } catch (error) {
        console.error('Error removing support', error);
        Logger.error('Error removing suppport:', {
          error,
          userId,
          inquiryId,
          state: this.$state
        });
        throw error;
      }
    },

    /**
     * Remove support for an inquiry
     * @param inquiryId
     * @param userId
     */
    async removeSupport(inquiryId, userId) {
      try {
        await SupportsAPI.removeSupport(inquiryId, userId);

        this.supports = this.supports.filter(
          (s) => !(s.userId === userId && s.inquiryId === inquiryId)
        );
      } catch (error) {
        Logger.error('Error removing suppport:', {
          error,
          userId,
          inquiryId,
          state: this.$state
        });
        throw error;
      }
    },

    /**
     * Restore support for an inquiry
     * @param inquiryId The inquiry ID to remove support from
     */

    async restore(payload: { support: Support }) {
      const sessionStore = useSessionStore();
      try {
        const response = await (() => {
          if (sessionStore.route.name === 'publicInquiry') {
            return PublicAPI.restoreSupport(
              sessionStore.publicToken,
              payload.support.id
            );
          }
          return SupportsAPI.restoreSupport(payload.support.id);
        })();

        this.setItem({ support: response.data.support });
      } catch (error) {
        if ((error as AxiosError)?.code === 'ERR_CANCELED') {
          return;
        }
        Logger.error('Error restoring support', {
          error,
          payload
        });
        throw error;
      }
    }
  }
});
