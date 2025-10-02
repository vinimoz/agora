/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
declare module '@nextcloud/event-bus' {
  interface NextcloudEvents {
    'agora:transitions:off': number
    'agora:transitions:on': null
    'agora:inquiry:update': {
      store: string
      message: string
    }
    'agora:inquiry:load': null
    'agora:sidebar:changeTab': { activeTab: string }
    'agora:sidebar:toggle': null | {
      open?: boolean
      activeTab?: string
    }
    'agora:change:shares': null
    'agora:options:update': null
    'agora:options:add-date': null
    'agora:comments:update': null
    'agora:activity:update': null
    'agora:settings:show': null
  }
}

export {}
