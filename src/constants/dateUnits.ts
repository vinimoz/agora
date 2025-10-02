/**
 * SPDX-FileCopyrightText: 2020 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { t } from '@nextcloud/l10n'

export type DateTimeUnit = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'

export type DateTimeUnitType = {
  id: DateTimeUnit
  name: string
  timeOption: boolean
}

export type TimeUnitsType = {
  unit: DateTimeUnitType
  value: number
}

export type DurationType = {
  unit: DateTimeUnitType
  amount: number
}

export type DateFormats = 'dateTime' | 'dateShort'

export const dateTimeUnitsKeyed: Record<DateTimeUnit, DateTimeUnitType> = {
  minute: {
    id: 'minute',
    name: t('inquiries', 'Minute'),
    timeOption: true,
  },
  hour: {
    id: 'hour',
    name: t('inquiries', 'Hour'),
    timeOption: true,
  },
  day: {
    id: 'day',
    name: t('inquiries', 'Day'),
    timeOption: false,
  },
  week: {
    id: 'week',
    name: t('inquiries', 'Week'),
    timeOption: false,
  },
  month: {
    id: 'month',
    name: t('inquiries', 'Month'),
    timeOption: false,
  },
  year: {
    id: 'year',
    name: t('inquiries', 'Year'),
    timeOption: false,
  },
}
