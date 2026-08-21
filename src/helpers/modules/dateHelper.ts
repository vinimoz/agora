/**
 * SPDX-FileCopyrightText: 2024 Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { t , n } from '@nextcloud/l10n'

/**
 * Format a date string or Date object to a localized date string
 * @param date - Date string, Date object, or timestamp
 * @param format - Optional format: 'short', 'medium', 'long', 'relative', or 'datetime'
 * @return Formatted date string
 */
export function formatDate(
  date: string | Date | number | null | undefined,
  format: 'short' | 'medium' | 'long' | 'relative' | 'datetime' = 'medium'
): string {
  if (!date) return t('agora', 'Unknown date')

  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date

  if (isNaN(dateObj.getTime())) {
    return t('agora', 'Invalid date')
  }

  const now = new Date()
  const diffMs = now.getTime() - dateObj.getTime()
  const diffMinutes = Math.floor(diffMs / 1000 / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  // For relative format, return relative time strings
  if (format === 'relative') {
    return getRelativeTimeString(dateObj, diffMinutes, diffHours, diffDays)
  }

  // For other formats, use Intl.DateTimeFormat
  const options: Intl.DateTimeFormatOptions = getDateTimeFormatOptions(format)

  return new Intl.DateTimeFormat(
    getCurrentLocale(),
    options
  ).format(dateObj)
}

/**
 * Format a date as a relative time string (e.g., "2 hours ago")
 * @param date
 * @param diffMinutes
 * @param diffHours
 * @param diffDays
 */
function getRelativeTimeString(
  date: Date,
  diffMinutes: number,
  diffHours: number,
  diffDays: number
): string {
  if (diffMinutes < 1) {
    return t('agora', 'Just now')
  }

  if (diffMinutes < 60) {
    return n(
      'agora',
      '%n minute ago',
      '%n minutes ago',
      diffMinutes
    )
  }

  if (diffHours < 24) {
    return n(
      'agora',
      '%n hour ago',
      '%n hours ago',
      diffHours
    )
  }

  if (diffDays < 7) {
    return n(
      'agora',
      '%n day ago',
      '%n days ago',
      diffDays
    )
  }

  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)

    return n(
      'agora',
      '%n week ago',
      '%n weeks ago',
      weeks
    )
  }

  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)

    return n(
      'agora',
      '%n month ago',
      '%n months ago',
      months
    )
  }

  const years = Math.floor(diffDays / 365)

  return n(
    'agora',
    '%n year ago',
    '%n years ago',
    years
  )
}

/**
 * Get Intl.DateTimeFormat options based on format type
 * @param format
 */
function getDateTimeFormatOptions(
  format: 'short' | 'medium' | 'long' | 'datetime'
): Intl.DateTimeFormatOptions {
  switch (format) {
    case 'short':
      return {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }
    case 'medium':
      return {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }
    case 'long':
      return {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }
    case 'datetime':
      return {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    default:
      return {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }
  }
}

/**
 * Get the current locale from Nextcloud
 */
function getCurrentLocale(): string {
  // @ts-expect-error - OC is available in Nextcloud environment
  const locale = (window as Window & typeof globalThis).OC?.getLocale?.() || 'en'
  return locale
}

/**
 * Format a timestamp as a human-readable date with time
 * @param date
 */
export function formatDateTime(
  date: string | Date | number | null | undefined
): string {
  return formatDate(date, 'datetime')
}

/**
 * Format a date as a short relative time (e.g., "2h ago")
 * Useful for compact displays
 * @param date
 */
export function formatCompactRelativeTime(
  date: string | Date | number | null | undefined
): string {
  if (!date) return ''

  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date

  if (isNaN(dateObj.getTime())) {
    return ''
  }

  const now = new Date()
  const diffMs = now.getTime() - dateObj.getTime()
  const diffMinutes = Math.floor(diffMs / 1000 / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMinutes < 1) {
    return t('agora', 'now')
  }

  if (diffMinutes < 60) {
    return t('agora', '{m}m', { m: diffMinutes })
  }

  if (diffHours < 24) {
    return t('agora', '{h}h', { h: diffHours })
  }

  if (diffDays < 7) {
    return t('agora', '{d}d', { d: diffDays })
  }

  // For older dates, return the date
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric'
  }
  return new Intl.DateTimeFormat(getCurrentLocale(), options).format(dateObj)
}

/**
 * Check if a date is today
 * @param date
 */
export function isToday(date: string | Date | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date

  if (isNaN(dateObj.getTime())) {
    return false
  }

  const today = new Date()
  return dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
}

/**
 * Check if a date is in the last N days
 * @param date
 * @param days
 */
export function isInLastDays(
  date: string | Date | number,
  days: number
): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date

  if (isNaN(dateObj.getTime())) {
    return false
  }

  const now = new Date()
  const diffMs = now.getTime() - dateObj.getTime()
  const diffDays = Math.floor(diffMs / 1000 / 60 / 60 / 24)
  return diffDays <= days
}

/**
 * Format a date range
 * @param startDate
 * @param endDate
 * @param format
 */
export function formatDateRange(
  startDate: string | Date | number,
  endDate: string | Date | number,
  format: 'short' | 'medium' | 'long' = 'medium'
): string {
  const start = typeof startDate === 'string' || typeof startDate === 'number'
    ? new Date(startDate)
    : startDate

  const end = typeof endDate === 'string' || typeof endDate === 'number'
    ? new Date(endDate)
    : endDate

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return t('agora', 'Invalid date range')
  }

  const options = getDateTimeFormatOptions(format)

  // If same day, show single date
  if (start.getDate() === end.getDate() &&
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()) {
    return new Intl.DateTimeFormat(getCurrentLocale(), options).format(start)
  }

  // Different days, show range
  const startStr = new Intl.DateTimeFormat(getCurrentLocale(), options).format(start)
  const endStr = new Intl.DateTimeFormat(getCurrentLocale(), options).format(end)

  return t('agora', '{start} - {end}', { start: startStr, end: endStr })
}

/**
 * Get a human-readable time difference
 * @param date1
 * @param date2
 */
export function getTimeDifference(
  date1: string | Date | number,
  date2: string | Date | number = new Date()
): {
  minutes: number
  hours: number
  days: number
  weeks: number
  months: number
  years: number
  isPast: boolean
} {
  const d1 = typeof date1 === 'string' || typeof date1 === 'number'
    ? new Date(date1)
    : date1

  const d2 = typeof date2 === 'string' || typeof date2 === 'number'
    ? new Date(date2)
    : date2

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    return {
      minutes: 0,
      hours: 0,
      days: 0,
      weeks: 0,
      months: 0,
      years: 0,
      isPast: false
    }
  }

  const diffMs = d2.getTime() - d1.getTime()
  const isPast = diffMs > 0

  const absDiffMs = Math.abs(diffMs)
  const minutes = Math.floor(absDiffMs / 1000 / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  return {
    minutes,
    hours,
    days,
    weeks,
    months,
    years,
    isPast
  }
}

/**
 * Parse a date string safely
 * @param dateString
 */
export function parseDateSafely(
  dateString: string | null | undefined
): Date | null {
  if (!dateString) return null

  try {
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? null : date
  } catch {
    return null
  }
}

/**
 * Check if a date is valid
 * @param date
 */
export function isValidDate(date: unknown): boolean {
  if (!date) return false
  const d = new Date(date as string | number)
  return !isNaN(d.getTime())
}

/**
 * Get the start of the day for a given date
 * @param date
 */
export function startOfDay(date: string | Date | number): Date {
  const d = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date

  if (isNaN(d.getTime())) {
    return new Date()
  }

  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
}

/**
 * Get the end of the day for a given date
 * @param date
 */
export function endOfDay(date: string | Date | number): Date {
  const d = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date

  if (isNaN(d.getTime())) {
    return new Date()
  }

  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999)
}

/**
 * Check if two dates are the same day
 * @param date1
 * @param date2
 */
export function isSameDay(
  date1: string | Date | number,
  date2: string | Date | number
): boolean {
  const d1 = typeof date1 === 'string' || typeof date1 === 'number'
    ? new Date(date1)
    : date1

  const d2 = typeof date2 === 'string' || typeof date2 === 'number'
    ? new Date(date2)
    : date2

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    return false
  }

  return d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
}

/**
 * Format a date for API requests (ISO 8601)
 * @param date
 */
export function formatDateForAPI(date: string | Date | number): string {
  const d = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date

  if (isNaN(d.getTime())) {
    return ''
  }

  return d.toISOString()
}

/**
 * Format a date for display in a calendar
 * @param date
 */
export function formatCalendarDate(
  date: string | Date | number
): string {
  const d = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date

  if (isNaN(d.getTime())) {
    return ''
  }

  if (isToday(d)) {
    return t('agora', 'Today')
  }

  const isYesterday = isInLastDays(d, 1) && !isToday(d)
  if (isYesterday) {
    return t('agora', 'Yesterday')
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }

  return new Intl.DateTimeFormat(getCurrentLocale(), options).format(d)
}

// Export all functions as a default object for convenience
export default {
  formatDate,
  formatDateTime,
  formatCompactRelativeTime,
  formatDateRange,
  getTimeDifference,
  parseDateSafely,
  isValidDate,
  isToday,
  isInLastDays,
  isSameDay,
  startOfDay,
  endOfDay,
  formatDateForAPI,
  formatCalendarDate
}
