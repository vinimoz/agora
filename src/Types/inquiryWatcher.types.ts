/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

export type WatcherMode = "off" | "periodic" | "long-polling" | "manual";
export type WatcherStatus = "idle" | "loading" | "loaded" | "error";

export type WatcherResponse = {
  id: number;
  inquiryId: number;
  table: string;
  updated: number;
  sessionId: string;
};
