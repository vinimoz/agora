/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import type { UpdateType } from "./appSettings.types.ts";

export type WatcherMode = UpdateType;

export type WatcherStatus = "idle" | "loading" | "loaded" | "error";

export interface WatcherProps {
  inquiryId: number | null | undefined;
  updateType: WatcherMode;
  interval: number;
  baseUrl: string;
  token: string;
  watcherId: string;
  lastUpdate: number;
}

export interface WatcherData {
  inquiryId: number;
  table: string;
}

export type WorkerMessageType =
  "info" | "debug" | "warning" | "error" | "update" | "status";

export interface WorkerResponse {
  type: WorkerMessageType;
  message?: string;
  updates?: WatcherData[];
  status?: string;
  mode: WatcherMode;
  lastUpdate?: number;
  params?: unknown;
}

export type WatcherResponse = {
  id: number;
  inquiryId: number;
  table: string;
  updated: number;
  sessionId: string;
};
