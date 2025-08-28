/**
 * SPDX-FileCopyrightText: 2025 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { PiniaPluginContext } from 'pinia';
import debounce from 'lodash/debounce';

type AnyFunction = (...args: unknown[]) => unknown;

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $debounce: <T extends AnyFunction>(fn: T, wait: number) => T;
  }
}

export const debouncePlugin = ({ store }: PiniaPluginContext) => {
  store.$debounce = <T extends AnyFunction>(fn: T, wait: number): T =>
    debounce(fn.bind(store), wait) as unknown as T;
};
