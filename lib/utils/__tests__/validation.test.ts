import {
  validateEmail,
  validateName,
  validateUrl,
  validateMessage,
  validatePhone,
  validateFutureDate,
  validateRequired,
  validateBookingSlot,
} from '../validation'

describe('validation utils', () => {
  describe('validateEmail', () => {
    it('should validate correct email', () => {
      const result = validateEmail('test@example.com')
      expect(result.valid).toBe(true)
      expect(result.message).toBeUndefined()
    })

    it('should reject empty email', () => {
      const result = validateEmail('')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('Email is required')
    })

    it('should reject invalid email format', () => {
      const result = validateEmail('invalid-email')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('Invalid email format')
    })

    it('should reject email without domain', () => {
      const result = validateEmail('test@')
      expect(result.valid).toBe(false)
    })

    it('should reject email with spaces', () => {
      const result = validateEmail('test @example.com')
      expect(result.valid).toBe(false)
    })
  })

  describe('validateName', () => {
    it('should validate correct name', () => {
      const result = validateName('John Doe')
      expect(result.valid).toBe(true)
    })

    it('should reject empty name', () => {
      const result = validateName('')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('Name is required')
    })

    it('should reject name too short', () => {
      const result = validateName('A', 2)
      expect(result.valid).toBe(false)
      expect(result.message).toContain('at least 2 characters')
    })

    it('should reject name too long', () => {
      const longName = 'A'.repeat(51)
      const result = validateName(longName, 2, 50)
      expect(result.valid).toBe(false)
      expect(result.message).toContain('not exceed 50 characters')
    })

    it('should accept name with hyphens and apostrophes', () => {
      expect(validateName("Mary-Jane O'Brien").valid).toBe(true)
    })

    it('should reject name with numbers', () => {
      const result = validateName('John123')
      expect(result.valid).toBe(false)
      expect(result.message).toContain('letters')
    })

    it('should reject name with special characters', () => {
      const result = validateName('John@Doe')
      expect(result.valid).toBe(false)
    })

    it('should trim whitespace', () => {
      const result = validateName('  John Doe  ')
      expect(result.valid).toBe(true)
    })
  })

  describe('validateUrl', () => {
    it('should validate correct URL', () => {
      expect(validateUrl('https://example.com').valid).toBe(true)
      expect(validateUrl('http://example.com').valid).toBe(true)
      expect(validateUrl('https://example.com/path').valid).toBe(true)
    })

    it('should reject empty URL', () => {
      const result = validateUrl('')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('URL is required')
    })

    it('should reject invalid URL format', () => {
      const result = validateUrl('not-a-url')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('Invalid URL format')
    })

    it('should reject URL without protocol', () => {
      const result = validateUrl('example.com')
      expect(result.valid).toBe(false)
    })
  })

  describe('validateMessage', () => {
    it('should validate correct message', () => {
      const message = 'This is a valid message with enough content'
      const result = validateMessage(message)
      expect(result.valid).toBe(true)
    })

    it('should reject empty message', () => {
      const result = validateMessage('')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('Message is required')
    })

    it('should reject message too short', () => {
      const result = validateMessage('Short', 10)
      expect(result.valid).toBe(false)
      expect(result.message).toContain('at least 10 characters')
    })

    it('should reject message too long', () => {
      const longMessage = 'A'.repeat(1001)
      const result = validateMessage(longMessage, 10, 1000)
      expect(result.valid).toBe(false)
      expect(result.message).toContain('not exceed 1000 characters')
    })

    it('should use custom length limits', () => {
      const message = 'Valid message'
      expect(validateMessage(message, 5, 20).valid).toBe(true)
      expect(validateMessage(message, 20, 100).valid).toBe(false)
    })
  })

  describe('validatePhone', () => {
    it('should validate correct phone number', () => {
      expect(validatePhone('+1234567890').valid).toBe(true)
      expect(validatePhone('123-456-7890').valid).toBe(true)
      expect(validatePhone('123 456 7890').valid).toBe(true)
    })

    it('should reject empty phone', () => {
      const result = validatePhone('')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('Phone number is required')
    })

    it('should reject phone too short', () => {
      const result = validatePhone('12345')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('Invalid phone number format')
    })

    it('should reject phone with letters', () => {
      const result = validatePhone('123-ABC-7890')
      expect(result.valid).toBe(false)
    })

    it('should accept international format', () => {
      expect(validatePhone('+44 20 7946 0958').valid).toBe(true)
    })
  })

  describe('validateFutureDate', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      jest.setSystemTime(new Date('2024-03-15T12:00:00Z'))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should validate future date', () => {
      const futureDate = new Date('2024-03-16T12:00:00Z')
      const result = validateFutureDate(futureDate)
      expect(result.valid).toBe(true)
    })

    it('should reject past date', () => {
      const pastDate = new Date('2024-03-14T12:00:00Z')
      const result = validateFutureDate(pastDate)
      expect(result.valid).toBe(false)
      expect(result.message).toBe('Date must be in the future')
    })

    it('should reject invalid date', () => {
      const result = validateFutureDate('invalid-date')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('Invalid date')
    })

    it('should handle string input', () => {
      const result = validateFutureDate('2024-03-16T12:00:00Z')
      expect(result.valid).toBe(true)
    })
  })

  describe('validateRequired', () => {
    it('should validate non-empty value', () => {
      expect(validateRequired('value').valid).toBe(true)
      expect(validateRequired(123).valid).toBe(true)
      expect(validateRequired(true).valid).toBe(true)
    })

    it('should reject empty string', () => {
      const result = validateRequired('')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('Field is required')
    })

    it('should reject null', () => {
      const result = validateRequired(null)
      expect(result.valid).toBe(false)
    })

    it('should reject undefined', () => {
      const result = validateRequired(undefined)
      expect(result.valid).toBe(false)
    })

    it('should use custom field name', () => {
      const result = validateRequired('', 'Email')
      expect(result.message).toBe('Email is required')
    })

    it('should trim whitespace from string', () => {
      const result = validateRequired('   ')
      expect(result.valid).toBe(false)
    })

    it('should accept 0 as valid', () => {
      expect(validateRequired(0).valid).toBe(true)
    })

    it('should accept false as valid', () => {
      expect(validateRequired(false).valid).toBe(true)
    })
  })

  describe('validateBookingSlot', () => {
    beforeEach(() => {
      jest.useFakeTimers()
      // Set to Wednesday 10:00 AM
      jest.setSystemTime(new Date('2024-03-13T10:00:00Z'))
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should validate valid booking slot', () => {
      // Friday 2 PM (26 hours in advance, business hours, weekday)
      const validSlot = new Date('2024-03-15T14:00:00Z')
      const result = validateBookingSlot(validSlot)
      expect(result.valid).toBe(true)
    })

    it('should reject booking too soon', () => {
      // In 12 hours (less than 24 hours minimum)
      const tooSoon = new Date('2024-03-13T22:00:00Z')
      const result = validateBookingSlot(tooSoon)
      expect(result.valid).toBe(false)
      expect(result.message).toContain('at least 24 hours in advance')
    })

    it('should reject booking outside business hours (too early)', () => {
      // Friday 8 AM (before 9 AM)
      const tooEarly = new Date('2024-03-15T08:00:00Z')
      const result = validateBookingSlot(tooEarly)
      expect(result.valid).toBe(false)
      expect(result.message).toContain('business hours')
    })

    it('should reject booking outside business hours (too late)', () => {
      // Friday 7 PM (after 6 PM)
      const tooLate = new Date('2024-03-15T19:00:00Z')
      const result = validateBookingSlot(tooLate)
      expect(result.valid).toBe(false)
      expect(result.message).toContain('business hours')
    })

    it('should reject weekend booking (Saturday)', () => {
      // Saturday 2 PM
      const saturday = new Date('2024-03-16T14:00:00Z')
      const result = validateBookingSlot(saturday)
      expect(result.valid).toBe(false)
      expect(result.message).toContain('weekday')
    })

    it('should reject weekend booking (Sunday)', () => {
      // Sunday 2 PM
      const sunday = new Date('2024-03-17T14:00:00Z')
      const result = validateBookingSlot(sunday)
      expect(result.valid).toBe(false)
      expect(result.message).toContain('weekday')
    })

    it('should reject invalid date', () => {
      const result = validateBookingSlot('invalid-date')
      expect(result.valid).toBe(false)
      expect(result.message).toBe('Invalid date')
    })

    it('should use custom minimum advance hours', () => {
      // In 30 hours
      const slot = new Date('2024-03-14T16:00:00Z')
      expect(validateBookingSlot(slot, 48).valid).toBe(false)
      expect(validateBookingSlot(slot, 24).valid).toBe(true)
    })

    it('should accept booking at edge of business hours', () => {
      // Friday 9 AM and 5:59 PM should be valid
      const morning = new Date('2024-03-15T09:00:00Z')
      const afternoon = new Date('2024-03-15T17:59:00Z')
      expect(validateBookingSlot(morning).valid).toBe(true)
      expect(validateBookingSlot(afternoon).valid).toBe(true)
    })
  })
})
