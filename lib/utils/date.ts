/**
 * Date formatting utilities for the portfolio website
 */

export type DateFormat = 'short' | 'long' | 'full' | 'relative'

/**
 * Format a date according to specified format
 * @param date - Date to format
 * @param format - Format type
 * @param locale - Locale code (default: 'en')
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number,
  format: DateFormat = 'short',
  locale: string = 'en'
): string {
  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date

  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date provided')
  }

  switch (format) {
    case 'short':
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }).format(dateObj)

    case 'long':
      return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(dateObj)

    case 'full':
      return new Intl.DateTimeFormat(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(dateObj)

    case 'relative':
      return getRelativeTime(dateObj, locale)

    default:
      return dateObj.toLocaleDateString(locale)
  }
}

/**
 * Get relative time string (e.g., "2 days ago", "in 3 hours")
 * @param date - Date to compare
 * @param locale - Locale code
 * @returns Relative time string
 */
export function getRelativeTime(date: Date | string | number, locale: string = 'en'): string {
  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date

  const now = new Date()
  const diffMs = now.getTime() - dateObj.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  const diffWeek = Math.floor(diffDay / 7)
  const diffMonth = Math.floor(diffDay / 30)
  const diffYear = Math.floor(diffDay / 365)

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (Math.abs(diffYear) > 0) {
    return rtf.format(-diffYear, 'year')
  } else if (Math.abs(diffMonth) > 0) {
    return rtf.format(-diffMonth, 'month')
  } else if (Math.abs(diffWeek) > 0) {
    return rtf.format(-diffWeek, 'week')
  } else if (Math.abs(diffDay) > 0) {
    return rtf.format(-diffDay, 'day')
  } else if (Math.abs(diffHour) > 0) {
    return rtf.format(-diffHour, 'hour')
  } else if (Math.abs(diffMin) > 0) {
    return rtf.format(-diffMin, 'minute')
  } else {
    return rtf.format(-diffSec, 'second')
  }
}

/**
 * Calculate reading time based on word count
 * @param text - Text content
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return Math.max(1, minutes) // Minimum 1 minute
}

/**
 * Check if a date is in the past
 * @param date - Date to check
 * @returns True if date is in the past
 */
export function isPast(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date
  return dateObj.getTime() < Date.now()
}

/**
 * Check if a date is in the future
 * @param date - Date to check
 * @returns True if date is in the future
 */
export function isFuture(date: Date | string | number): boolean {
  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date
  return dateObj.getTime() > Date.now()
}
