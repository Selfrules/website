import {
  slugify,
  truncate,
  excerpt,
  capitalize,
  toTitleCase,
  stripHtml,
  countWords,
  randomString,
  isValidEmail,
  normalizeWhitespace,
} from '../string'

describe('string utils', () => {
  describe('slugify', () => {
    it('should convert text to slug', () => {
      expect(slugify('Hello World')).toBe('hello-world')
    })

    it('should handle special characters', () => {
      expect(slugify('Hello, World!')).toBe('hello-world')
      expect(slugify('Hello@World#123')).toBe('helloworld123')
    })

    it('should handle multiple spaces', () => {
      expect(slugify('Hello    World')).toBe('hello-world')
    })

    it('should handle underscores', () => {
      expect(slugify('Hello_World')).toBe('hello-world')
    })

    it('should trim leading/trailing hyphens', () => {
      expect(slugify('-Hello World-')).toBe('hello-world')
    })

    it('should handle already slugified text', () => {
      expect(slugify('hello-world')).toBe('hello-world')
    })

    it('should handle empty string', () => {
      expect(slugify('')).toBe('')
    })

    it('should handle accented characters', () => {
      expect(slugify('Café München')).toBe('caf-mnchen')
    })
  })

  describe('truncate', () => {
    it('should truncate long text', () => {
      const text = 'This is a long text that needs to be truncated'
      expect(truncate(text, 20)).toBe('This is a long te...')
    })

    it('should not truncate short text', () => {
      const text = 'Short text'
      expect(truncate(text, 20)).toBe('Short text')
    })

    it('should use custom suffix', () => {
      const text = 'This is a long text'
      expect(truncate(text, 15, '…')).toBe('This is a long…')
    })

    it('should handle empty string', () => {
      expect(truncate('', 10)).toBe('')
    })

    it('should trim whitespace before adding suffix', () => {
      const text = 'This is text'
      expect(truncate(text, 8)).toBe('This...')
    })
  })

  describe('excerpt', () => {
    it('should extract excerpt preserving word boundaries', () => {
      const text = 'This is a long text that needs an excerpt'
      const result = excerpt(text, 20)
      expect(result.endsWith('...')).toBe(true)
      expect(result.split(' ').every(word => word.length > 0)).toBe(true)
    })

    it('should not break words', () => {
      const text = 'This is a longword that continues'
      const result = excerpt(text, 15)
      expect(result).not.toContain('longword')
    })

    it('should not truncate short text', () => {
      const text = 'Short'
      expect(excerpt(text, 20)).toBe('Short')
    })

    it('should use custom suffix', () => {
      const text = 'This is a long text for excerpt'
      expect(excerpt(text, 15, ' [...]')).toContain('[...]')
    })
  })

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
    })

    it('should lowercase rest of string', () => {
      expect(capitalize('HELLO')).toBe('Hello')
    })

    it('should handle single character', () => {
      expect(capitalize('h')).toBe('H')
    })

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('')
    })

    it('should handle already capitalized', () => {
      expect(capitalize('Hello')).toBe('Hello')
    })
  })

  describe('toTitleCase', () => {
    it('should convert to sentence case', () => {
      expect(toTitleCase('hello world')).toBe('Hello world')
    })

    it('should preserve rest of string', () => {
      expect(toTitleCase('hello WORLD')).toBe('Hello WORLD')
    })

    it('should handle empty string', () => {
      expect(toTitleCase('')).toBe('')
    })

    it('should handle single word', () => {
      expect(toTitleCase('word')).toBe('Word')
    })
  })

  describe('stripHtml', () => {
    it('should remove HTML tags', () => {
      const html = '<p>Hello <strong>World</strong></p>'
      expect(stripHtml(html)).toBe('Hello World')
    })

    it('should handle nested tags', () => {
      const html = '<div><p><span>Text</span></p></div>'
      expect(stripHtml(html)).toBe('Text')
    })

    it('should handle self-closing tags', () => {
      const html = 'Text<br/>More text'
      expect(stripHtml(html)).toBe('TextMore text')
    })

    it('should handle plain text', () => {
      expect(stripHtml('Plain text')).toBe('Plain text')
    })

    it('should handle empty string', () => {
      expect(stripHtml('')).toBe('')
    })

    it('should handle tags with attributes', () => {
      const html = '<a href="url" class="link">Link</a>'
      expect(stripHtml(html)).toBe('Link')
    })
  })

  describe('countWords', () => {
    it('should count words in text', () => {
      expect(countWords('Hello world')).toBe(2)
    })

    it('should handle multiple spaces', () => {
      expect(countWords('Hello    world')).toBe(2)
    })

    it('should handle leading/trailing spaces', () => {
      expect(countWords('  Hello world  ')).toBe(2)
    })

    it('should handle empty string', () => {
      expect(countWords('')).toBe(0)
    })

    it('should handle single word', () => {
      expect(countWords('Hello')).toBe(1)
    })

    it('should handle newlines and tabs', () => {
      expect(countWords('Hello\nworld\t!')).toBe(3)
    })
  })

  describe('randomString', () => {
    it('should generate string of specified length', () => {
      const result = randomString(10)
      expect(result).toHaveLength(10)
    })

    it('should use default character set', () => {
      const result = randomString(20)
      expect(/^[A-Za-z0-9]+$/.test(result)).toBe(true)
    })

    it('should use custom character set', () => {
      const result = randomString(10, '0123456789')
      expect(/^[0-9]+$/.test(result)).toBe(true)
    })

    it('should generate different strings', () => {
      const result1 = randomString(20)
      const result2 = randomString(20)
      expect(result1).not.toBe(result2)
    })

    it('should handle length of 0', () => {
      expect(randomString(0)).toBe('')
    })
  })

  describe('isValidEmail', () => {
    it('should validate correct email', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true)
      expect(isValidEmail('test+tag@example.com')).toBe(true)
    })

    it('should reject invalid email', () => {
      expect(isValidEmail('invalid')).toBe(false)
      expect(isValidEmail('invalid@')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
      expect(isValidEmail('test @example.com')).toBe(false)
    })

    it('should reject empty string', () => {
      expect(isValidEmail('')).toBe(false)
    })
  })

  describe('normalizeWhitespace', () => {
    it('should replace multiple spaces with single space', () => {
      expect(normalizeWhitespace('Hello    world')).toBe('Hello world')
    })

    it('should trim leading/trailing spaces', () => {
      expect(normalizeWhitespace('  Hello world  ')).toBe('Hello world')
    })

    it('should handle tabs and newlines', () => {
      expect(normalizeWhitespace('Hello\t\nworld')).toBe('Hello world')
    })

    it('should handle already normalized text', () => {
      expect(normalizeWhitespace('Hello world')).toBe('Hello world')
    })

    it('should handle empty string', () => {
      expect(normalizeWhitespace('')).toBe('')
    })

    it('should handle only whitespace', () => {
      expect(normalizeWhitespace('   \t\n  ')).toBe('')
    })
  })
})
