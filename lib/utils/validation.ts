/**
 * Validation utilities for forms and user input
 */

export interface ValidationResult {
  valid: boolean
  message?: string
}

/**
 * Validate email address
 * @param email - Email to validate
 * @returns Validation result
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return { valid: false, message: 'Email is required' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { valid: false, message: 'Invalid email format' }
  }

  return { valid: true }
}

/**
 * Validate name (no numbers or special characters)
 * @param name - Name to validate
 * @param minLength - Minimum length (default: 2)
 * @param maxLength - Maximum length (default: 50)
 * @returns Validation result
 */
export function validateName(
  name: string,
  minLength: number = 2,
  maxLength: number = 50
): ValidationResult {
  if (!name || name.trim() === '') {
    return { valid: false, message: 'Name is required' }
  }

  const trimmedName = name.trim()

  if (trimmedName.length < minLength) {
    return { valid: false, message: `Name must be at least ${minLength} characters` }
  }

  if (trimmedName.length > maxLength) {
    return { valid: false, message: `Name must not exceed ${maxLength} characters` }
  }

  const nameRegex = /^[a-zA-Z\s'-]+$/
  if (!nameRegex.test(trimmedName)) {
    return { valid: false, message: 'Name can only contain letters, spaces, hyphens, and apostrophes' }
  }

  return { valid: true }
}

/**
 * Validate URL
 * @param url - URL to validate
 * @returns Validation result
 */
export function validateUrl(url: string): ValidationResult {
  if (!url || url.trim() === '') {
    return { valid: false, message: 'URL is required' }
  }

  try {
    new URL(url)
    return { valid: true }
  } catch {
    return { valid: false, message: 'Invalid URL format' }
  }
}

/**
 * Validate message/text content
 * @param message - Message to validate
 * @param minLength - Minimum length (default: 10)
 * @param maxLength - Maximum length (default: 1000)
 * @returns Validation result
 */
export function validateMessage(
  message: string,
  minLength: number = 10,
  maxLength: number = 1000
): ValidationResult {
  if (!message || message.trim() === '') {
    return { valid: false, message: 'Message is required' }
  }

  const trimmedMessage = message.trim()

  if (trimmedMessage.length < minLength) {
    return { valid: false, message: `Message must be at least ${minLength} characters` }
  }

  if (trimmedMessage.length > maxLength) {
    return { valid: false, message: `Message must not exceed ${maxLength} characters` }
  }

  return { valid: true }
}

/**
 * Validate phone number (international format)
 * @param phone - Phone number to validate
 * @returns Validation result
 */
export function validatePhone(phone: string): ValidationResult {
  if (!phone || phone.trim() === '') {
    return { valid: false, message: 'Phone number is required' }
  }

  // Basic international phone validation (allows +, -, spaces, and numbers)
  const phoneRegex = /^\+?[\d\s-]{10,}$/
  if (!phoneRegex.test(phone)) {
    return { valid: false, message: 'Invalid phone number format' }
  }

  return { valid: true }
}

/**
 * Validate date is not in the past
 * @param date - Date to validate
 * @returns Validation result
 */
export function validateFutureDate(date: Date | string): ValidationResult {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (isNaN(dateObj.getTime())) {
    return { valid: false, message: 'Invalid date' }
  }

  if (dateObj.getTime() < Date.now()) {
    return { valid: false, message: 'Date must be in the future' }
  }

  return { valid: true }
}

/**
 * Validate required field
 * @param value - Value to validate
 * @param fieldName - Name of field for error message
 * @returns Validation result
 */
export function validateRequired(value: any, fieldName: string = 'Field'): ValidationResult {
  if (value === null || value === undefined || value === '') {
    return { valid: false, message: `${fieldName} is required` }
  }

  if (typeof value === 'string' && value.trim() === '') {
    return { valid: false, message: `${fieldName} is required` }
  }

  return { valid: true }
}

/**
 * Validate booking time slot
 * @param date - Booking date
 * @param minAdvanceHours - Minimum hours in advance (default: 24)
 * @returns Validation result
 */
export function validateBookingSlot(
  date: Date | string,
  minAdvanceHours: number = 24
): ValidationResult {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (isNaN(dateObj.getTime())) {
    return { valid: false, message: 'Invalid date' }
  }

  const now = new Date()
  const minAdvanceMs = minAdvanceHours * 60 * 60 * 1000
  const diffMs = dateObj.getTime() - now.getTime()

  if (diffMs < minAdvanceMs) {
    return {
      valid: false,
      message: `Booking must be at least ${minAdvanceHours} hours in advance`
    }
  }

  // Check if it's within business hours (9 AM - 6 PM)
  const hours = dateObj.getHours()
  if (hours < 9 || hours >= 18) {
    return { valid: false, message: 'Booking must be during business hours (9 AM - 6 PM)' }
  }

  // Check if it's a weekday
  const day = dateObj.getDay()
  if (day === 0 || day === 6) {
    return { valid: false, message: 'Booking must be on a weekday (Monday-Friday)' }
  }

  return { valid: true }
}
