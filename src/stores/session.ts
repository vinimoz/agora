/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { defineStore } from "pinia";
import { t } from "@nextcloud/l10n";
import { AxiosError } from "@nextcloud/axios";
import { getCurrentUser } from "@nextcloud/auth";
import { PublicAPI, SessionAPI } from "../Api/index.ts";
import {
  createDefault,
  User,
  AppPermissions,
  AppSettings,
  UpdateType,
} from "../Types/index.ts";
import { useAppSettingsStore } from "./appSettings.ts";
import { SessionSettings } from "../Types/session.types.ts";
import { FilterType } from "../Types/inquiry.types.ts";
import { Share } from "../Types/share.types.ts";
import {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  RouteRecordNameGeneric,
} from "vue-router";
import { Logger } from "../helpers/index.ts";
import { useInquiryStore } from "./inquiry.ts";
import { useInquiriesStore } from "./inquiries.ts";
import { useSubscriptionStore } from "./subscription.ts";
import { useInquiryGroupsStore } from "./inquiryGroups.ts";

interface RouteParams {
  id: number;
  token: string;
  type: FilterType;
  slug: string;
}

export type Route = {
  currentRoute: string;
  name: RouteRecordNameGeneric;
  path: string;
  params: RouteParams;
};

export type UserStatus = {
  isLoggedin: boolean;
  isAdmin: boolean;
};

export type Watcher = {
  id: string;
  mode: UpdateType;
  status: "running" | "stopped" | "error" | "stopping" | "idle";
  interval?: number;
  lastUpdate: number;
  lastMessage?: string;
};

export type Session = {
  appPermissions: AppPermissions;
  appSettings: AppSettings;
  currentUser: User;
  route: Route;
  sessionSettings: SessionSettings;
  share: Share;
  token: string | null;
  userStatus: UserStatus;
  watcher: Watcher;
  isLoaded: boolean;
};

let lastLoadedUserId: string | null = null;

export const useSessionStore = defineStore("session", {
  state: (): Session => ({
    appPermissions: {
      addShares: false,
      addSharesExternal: false,
      allAccess: false,
      changeForeignInquiries: false,
      deanonymizeInquiry: false,
      inquiryCreation: false,
      inquiryDownload: false,
      publicShares: false,
      seeMailAddresses: false,
      unrestrictedOwner: false,
    },
    sessionSettings: {
      timezoneName: "local",
    },

    appSettings: createDefault<AppSettings>(),
    route: {
      currentRoute: "",
      name: "",
      path: "",
      params: {
        id: 0,
        token: "",
        type: "relevant",
        slug: "",
      },
    },
    userStatus: {
      isLoggedin: !!getCurrentUser(),
      isAdmin: !!getCurrentUser()?.isAdmin,
    },
    watcher: {
      id: "",
      mode: "noInquirying",
      status: "stopped",
      lastUpdate: Math.floor(Date.now() / 1000),
    },
    token: null,
    currentUser: createDefault<User>(),
    share: createDefault<Share>(),
    isLoaded: false,
  }),

  getters: {
    publicToken(state): string {
      if (state.route.params.token) {
        return state.route.params.token as string;
      }
      return "";
    },

    currentOptionId(state): number {
      if (state.route.name === "option") {
        return Number(state.route.params.id);
      }
      return 0;
    },

    currentInquiryId(state): number {
      if (state.route.name === "inquiry" || state.route.name === "page") {
        return Number(state.route.params.id);
      }
      return 0;
    },
    windowTitle(state): string {
      // Don't import at top level, import dynamically
      let title = `${t("agora", "Agora")} – Nextcloud`;

      try {
        if (state.route.name === "list") {
          const inquiriesStore = useInquiriesStore();
          if (inquiriesStore.categories && this.route.params.type) {
            title = `${t("agora", "Agora")} – ${inquiriesStore.categories[this.route.params.type as FilterType]?.titleExt || "List"}`;
          }
        } else if (state.route.name === "group") {
          const inquiryGroupsStore = useInquiryGroupsStore();
          if (inquiryGroupsStore.currentInquiryGroup) {
            title = `${t("agora", "Agora")} – ${inquiryGroupsStore.currentInquiryGroup.titleExt || inquiryGroupsStore.currentInquiryGroup.title || ""}`;
          }
        } else if (
          state.route.name === "publicInquiry" ||
          state.route.name === "inquiry"
        ) {
          try {
            const inquiryStore = useInquiryStore();
            if (inquiryStore.title) {
              title = `${t("agora", "Agora")} – ${inquiryStore.title}`;
            } else {
              title = `${t("agora", "Agora")} – ${t("agora", "Enter title")}`;
            }
          } catch (error) {
            title = `${t("agora", "Agora")} – Inquiry`;
            console.warn("Error computing window title:", error);
          }
        }
      } catch (error) {
        console.warn("Error computing window title:", error);
      }

      return title;
    },
  },

  actions: {
    generateWatcherId() {
      this.watcher.id = Math.random().toString(36).substring(2);
    },
    async load(
      to: null | RouteLocationNormalized,
      cheapLoading: boolean = false,
      forceReload: boolean = false,
    ) {
      Logger.debug("Loading session");

      try {
        if (
          !forceReload &&
          this.isLoaded &&
          this.currentUser.id === lastLoadedUserId
        ) {
          Logger.debug(
            "Session already loaded for same user, skipping, route set to:",
          );
          if (to !== null) await this.setRouter(to);
          return;
        }

        this.generateWatcherId();

        if (to !== null) {
          Logger.debug("Set requested route", { to });
          await this.setRouter(to);
          Logger.debug("Route set", { route: this.route });
        }

        if (cheapLoading) {
          Logger.debug("Same route, skipping session load");
          return;
        }

        let response;
        try {
          if (this.route.name === "publicInquiry" && this.publicToken) {
            response = await PublicAPI.getSession(this.publicToken);
          } else {
            response = await SessionAPI.getSession();
          }
        } catch (apiError) {
          Logger.error("API error in session load", { error: apiError });
          throw apiError;
        }

        if (response && response.data) {
          this.$patch((state) => {
            Object.assign(state, response.data);
          });
          // Update appSettingsStore safely
          try {
            const appSettingsStore = useAppSettingsStore();
            if (appSettingsStore) {
              appSettingsStore.$patch((state) => {
                state.inquiryStatusTab =
                  this.appSettings?.inquiryStatusTab || [];
                state.inquiryTypeTab = this.appSettings?.inquiryTypeTab || [];
                state.inquiryOptionTypeTab =
                  this.appSettings?.inquiryOptionTypeTab || [];
                state.inquiryGroupTypeTab =
                  this.appSettings?.inquiryGroupTypeTab || [];
                state.inquiryFamilyTab =
                  this.appSettings?.inquiryFamilyTab || [];
                state.optionFamilyTab = this.appSettings?.optionFamilyTab || [];
                state.categoryTab = this.appSettings?.categoryTab || [];
                state.locationTab = this.appSettings?.locationTab || [];
              });
            }
          } catch (storeError) {
            console.warn("Could not update appSettingsStore:", storeError);
          }

          this.isLoaded = true;
          lastLoadedUserId = this.currentUser?.id || null;
        }
      } catch (error) {
        if ((error as AxiosError)?.code === "ERR_CANCELED") {
          return;
        }

        Logger.error("Error loading session", { error });

        // Set default values instead of resetting completely
        this.$patch({
          isLoaded: true, // Mark as loaded to prevent infinite loops
          currentUser: {
            id: "",
            displayName: "Guest",
            localeCodeIntl: "en",
            languageCodeIntl: "en",
          },
          userStatus: {
            isLoggedin: false,
            isAdmin: false,
          },
          appSettings: {
            inquiryStatusTab: [],
            inquiryTypeTab: [],
            inquiryOptionTypeTab: [],
            inquiryGroupTypeTab: [],
            inquiryFamilyTab: [],
            optionFamilyTab: [],
            categoryTab: [],
            locationTab: [],
          },
        });

        // Don't throw the error - handle it gracefully
        Logger.warn("Session loaded with default values due to error");
      }
      Logger.debug("Session loaded");
    },

    async setRouter(payload: RouteLocationNormalizedLoaded | null) {
      if (!payload) return;

      this.route.currentRoute = payload.fullPath || "";
      this.route.name = payload.name || "";
      this.route.path = payload.path || "";

      // Safely extract params with defaults
      this.route.params.id = payload.params?.id ? Number(payload.params.id) : 0;
      this.route.params.token = payload.params?.token
        ? String(payload.params.token)
        : "";
      this.route.params.type =
        (payload.params?.type as FilterType) || "relevant";
      this.route.params.slug = payload.params?.slug
        ? String(payload.params.slug)
        : "";
    },

    // Share store
    async loadShare(): Promise<void> {
      if (this.route.name !== "publicInquiry") {
        this.share = createDefault<Share>();
        return;
      }

      try {
        const response = await PublicAPI.getShare(this.publicToken);
        this.share = response.data.share;
      } catch (error) {
        if ((error as AxiosError)?.code === "ERR_CANCELED") {
          return;
        }
        Logger.error("Error retrieving share", { error });
        throw error;
      }
    },

    async updateEmailAddress(payload: { emailAddress: string }): Promise<void> {
      const inquiryStore = useInquiryStore();

      if (this.route.name !== "publicInquiry") {
        return;
      }

      try {
        const response = await PublicAPI.setEmailAddress(
          this.publicToken,
          payload.emailAddress,
        );
        this.share = response.data.share;
        inquiryStore.load();
      } catch (error) {
        if ((error as AxiosError)?.code === "ERR_CANCELED") {
          return;
        }
        Logger.error("Error writing email address", {
          error,
          payload,
        });
        throw error;
      }
    },

    async updateDisplayName(payload: { displayName: string }): Promise<void> {
      const inquiryStore = useInquiryStore();

      if (this.route.name !== "publicInquiry") {
        return;
      }

      try {
        const response = await PublicAPI.setDisplayName(
          this.publicToken,
          payload.displayName,
        );
        this.share = response.data.share;
        inquiryStore.load();
      } catch (error) {
        if ((error as AxiosError)?.code === "ERR_CANCELED") {
          return;
        }
        Logger.error("Error changing name", {
          error,
          payload,
        });
        throw error;
      }
    },

    async deleteEmailAddress(): Promise<void> {
      const inquiryStore = useInquiryStore();
      const subscriptionStore = useSubscriptionStore();

      if (this.route.name !== "publicInquiry") {
        return;
      }

      try {
        const response = await PublicAPI.deleteEmailAddress(this.publicToken);
        this.share = response.data.share;
        subscriptionStore.$state.subscribed = false;
        subscriptionStore.write();
        inquiryStore.load();
      } catch (error) {
        if ((error as AxiosError)?.code === "ERR_CANCELED") {
          return;
        }
        Logger.error("Error deleting email address", { error });
        throw error;
      }
    },

    async resendInvitation() {
      if (this.route.name !== "publicInquiry") {
        throw new Error("Not on public inquiry page");
      }

      try {
        return await PublicAPI.resendInvitation(this.publicToken);
      } catch (error) {
        if ((error as AxiosError)?.code === "ERR_CANCELED") {
          return;
        }
        Logger.error("Error sending invitation", {
          error,
          token: this.route.params.token,
        });
        throw error;
      }
    },
  },
});
