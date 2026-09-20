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
    name: t('agora', 'Minute'),
    timeOption: true,
  },
  hour: {
    id: 'hour',
    name: t('agora', 'Hour'),
    timeOption: true,
  },
  day: {
    id: 'day',
    name: t('agora', 'Day'),
    timeOption: false,
  },
  week: {
    id: 'week',
    name: t('agora', 'Week'),
    timeOption: false,
  },
  month: {
    id: 'month',
    name: t('agora', 'Month'),
    timeOption: false,
  },
  year: {
    id: 'year',
    name: t('agora', 'Year'),
    timeOption: false,
  },
}
