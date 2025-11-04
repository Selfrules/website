import {
  formatDate,
  getRelativeTime,
  calculateReadingTime,
  isPast,
  isFuture,
} from '../date'

describe('date utils', () => {
  describe('formatDate', () => {
    const testDate = new Date('2024-03-15T10:30:00Z')

    it('should format date in short format', () => {
      const result = formatDate(testDate, 'short', 'en')
      expect(result).toContain('Mar')
      expect(result).toContain('15')
      expect(result).toContain('2024')
    })

    it('should format date in long format', () => {
      const result = formatDate(testDate, 'long', 'en')
      expect(result).toContain('March')
      expect(result).toContain('15')
      expect(result).toContain('2024')
    })

    it('should format date in full format', () => {
      const result = formatDate(testDate, 'full', 'en')
      expect(result).toContain('Friday')
      expect(result).toContain('March')
      expect(result).toContain('15')
      expect(result).toContain('2024')
    })

    it('should accept string date input', () => {
      const result = formatDate('2024-03-15', 'short', 'en')
      expect(result).toContain('Mar')
      expect(result).toContain('15')
    })

    it('should accept timestamp input', () => {
      const timestamp = testDate.getTime()
      const result = formatDate(timestamp, 'short', 'en')
      expect(result).toContain('Mar')
      expect(result).toContain('15')
    })

    it('should throw error for invalid date', () => {
      expect(() => formatDate('invalid-date')).toThrow('Invalid date provided')
    })

    it('should format in different locale', () => {
      const result = formatDate(testDate, 'short', 'it')
      expect(result).toBeTruthy()
    })
  })

  describe('getRelativeTime', () => {
    beforeEach(() => {
      // Mock current time
      jest.useFakeTimers()
      jest.setSystemTime(new Date('2024-03-15T12:00:00Z'))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should return "now" for current date', () => {
      const now = new Date('2024-03-15T12:00:00Z')
      const result = getRelativeTime(now, 'en')
      expect(result).toContain('now')
    })

    it('should return relative time for recent past', () => {
      const twoHoursAgo = new Date('2024-03-15T10:00:00Z')
      const result = getRelativeTime(twoHoursAgo, 'en')
      expect(result).toContain('hour')
    })

    it('should return relative time for days ago', () => {
      const threeDaysAgo = new Date('2024-03-12T12:00:00Z')
      const result = getRelativeTime(threeDaysAgo, 'en')
      expect(result).toContain('day')
    })

    it('should return relative time for months ago', () => {
      const twoMonthsAgo = new Date('2024-01-15T12:00:00Z')
      const result = getRelativeTime(twoMonthsAgo, 'en')
      expect(result).toContain('month')
    })

    it('should return relative time for years ago', () => {
      const oneYearAgo = new Date('2023-03-15T12:00:00Z')
      const result = getRelativeTime(oneYearAgo, 'en')
      expect(result).toContain('year')
    })
  })

  describe('calculateReadingTime', () => {
    it('should calculate reading time for short text', () => {
      const text = 'This is a short text with about twenty words in total for testing purposes.'
      const result = calculateReadingTime(text, 200)
      expect(result).toBe(1) // Minimum 1 minute
    })

    it('should calculate reading time for longer text', () => {
      const words = Array(400).fill('word').join(' ')
      const result = calculateReadingTime(words, 200)
      expect(result).toBe(2) // 400 words / 200 wpm = 2 minutes
    })

    it('should round up reading time', () => {
      const words = Array(250).fill('word').join(' ')
      const result = calculateReadingTime(words, 200)
      expect(result).toBe(2) // 250 / 200 = 1.25, rounds to 2
    })

    it('should use custom words per minute', () => {
      const words = Array(300).fill('word').join(' ')
      const result = calculateReadingTime(words, 150)
      expect(result).toBe(2) // 300 / 150 = 2 minutes
    })

    it('should handle empty text', () => {
      const result = calculateReadingTime('')
      expect(result).toBe(1) // Minimum 1 minute
    })

    it('should handle text with extra whitespace', () => {
      const text = '  word   word   word  '
      const result = calculateReadingTime(text)
      expect(result).toBe(1)
    })
  })

  describe('isPast', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      jest.setSystemTime(new Date('2024-03-15T12:00:00Z'))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should return true for past date', () => {
      const pastDate = new Date('2024-03-14T12:00:00Z')
      expect(isPast(pastDate)).toBe(true)
    })

    it('should return false for future date', () => {
      const futureDate = new Date('2024-03-16T12:00:00Z')
      expect(isPast(futureDate)).toBe(false)
    })

    it('should handle string input', () => {
      expect(isPast('2024-03-14T12:00:00Z')).toBe(true)
      expect(isPast('2024-03-16T12:00:00Z')).toBe(false)
    })

    it('should handle timestamp input', () => {
      const pastTimestamp = new Date('2024-03-14T12:00:00Z').getTime()
      const futureTimestamp = new Date('2024-03-16T12:00:00Z').getTime()
      expect(isPast(pastTimestamp)).toBe(true)
      expect(isPast(futureTimestamp)).toBe(false)
    })
  })

  describe('isFuture', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      jest.setSystemTime(new Date('2024-03-15T12:00:00Z'))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should return true for future date', () => {
      const futureDate = new Date('2024-03-16T12:00:00Z')
      expect(isFuture(futureDate)).toBe(true)
    })

    it('should return false for past date', () => {
      const pastDate = new Date('2024-03-14T12:00:00Z')
      expect(isFuture(pastDate)).toBe(false)
    })

    it('should handle string input', () => {
      expect(isFuture('2024-03-16T12:00:00Z')).toBe(true)
      expect(isFuture('2024-03-14T12:00:00Z')).toBe(false)
    })

    it('should handle timestamp input', () => {
      const futureTimestamp = new Date('2024-03-16T12:00:00Z').getTime()
      const pastTimestamp = new Date('2024-03-14T12:00:00Z').getTime()
      expect(isFuture(futureTimestamp)).toBe(true)
      expect(isFuture(pastTimestamp)).toBe(false)
    })
  })
})
