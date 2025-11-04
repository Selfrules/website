import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../Input'

describe('Input', () => {
  describe('Rendering', () => {
    it('should render input field', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('should render with label', () => {
      render(<Input label="Email address" />)
      expect(screen.getByLabelText('Email address')).toBeInTheDocument()
    })

    it('should render with placeholder', () => {
      render(<Input placeholder="Enter email" />)
      expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
    })

    it('should render with helper text', () => {
      render(<Input helperText="We'll never share your email" />)
      expect(screen.getByText("We'll never share your email")).toBeInTheDocument()
    })

    it('should render with error message', () => {
      render(<Input error="Email is required" />)
      expect(screen.getByRole('alert')).toHaveTextContent('Email is required')
    })

    it('should prioritize error over helper text', () => {
      render(<Input error="Error message" helperText="Helper text" />)
      expect(screen.getByText('Error message')).toBeInTheDocument()
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument()
    })
  })

  describe('Input Types', () => {
    it('should render text input by default', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
    })

    it('should render password input', () => {
      const { container } = render(<Input type="password" />)
      const input = container.querySelector('input[type="password"]')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'password')
    })

    it('should render email input', () => {
      render(<Input type="email" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
    })

    it('should render number input', () => {
      render(<Input type="number" />)
      expect(screen.getByRole('spinbutton')).toHaveAttribute('type', 'number')
    })
  })

  describe('User Interactions', () => {
    it('should accept user input', async () => {
      render(<Input />)
      const input = screen.getByRole('textbox')

      await userEvent.type(input, 'Hello World')
      expect(input).toHaveValue('Hello World')
    })

    it('should call onChange handler', async () => {
      const handleChange = jest.fn()
      render(<Input onChange={handleChange} />)
      const input = screen.getByRole('textbox')

      await userEvent.type(input, 'Test')
      expect(handleChange).toHaveBeenCalled()
    })

    it('should call onFocus handler', async () => {
      const handleFocus = jest.fn()
      render(<Input onFocus={handleFocus} />)
      const input = screen.getByRole('textbox')

      await userEvent.click(input)
      expect(handleFocus).toHaveBeenCalled()
    })

    it('should call onBlur handler', async () => {
      const handleBlur = jest.fn()
      render(<Input onBlur={handleBlur} />)
      const input = screen.getByRole('textbox')

      await userEvent.click(input)
      await userEvent.tab()
      expect(handleBlur).toHaveBeenCalled()
    })
  })

  describe('Disabled State', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Input disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('should not accept input when disabled', async () => {
      render(<Input disabled />)
      const input = screen.getByRole('textbox')

      await userEvent.type(input, 'Test')
      expect(input).toHaveValue('')
    })

    it('should have disabled styles', () => {
      render(<Input disabled />)
      expect(screen.getByRole('textbox')).toHaveClass('disabled:opacity-50')
    })
  })

  describe('Error State', () => {
    it('should have error styles when error prop is provided', () => {
      render(<Input error="Error message" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-accent')
    })

    it('should have aria-invalid when error exists', () => {
      render(<Input error="Error message" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    })

    it('should link error message with aria-describedby', () => {
      render(<Input error="Error message" id="test-input" />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-describedby', 'test-input-error')
    })
  })

  describe('Accessibility', () => {
    it('should generate unique id if not provided', () => {
      const { container } = render(<Input label="Test" />)
      const input = screen.getByRole('textbox')
      const id = input.getAttribute('id')
      expect(id).toBeTruthy()
      expect(id).toMatch(/^input-/)
    })

    it('should use provided id', () => {
      render(<Input id="custom-id" label="Test" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-id')
    })

    it('should link label with input', () => {
      render(<Input label="Username" id="username" />)
      const label = screen.getByText('Username')
      expect(label).toHaveAttribute('for', 'username')
    })

    it('should be focusable', () => {
      render(<Input />)
      const input = screen.getByRole('textbox')
      input.focus()
      expect(input).toHaveFocus()
    })

    it('should support aria-label', () => {
      render(<Input aria-label="Search" />)
      expect(screen.getByLabelText('Search')).toBeInTheDocument()
    })

    it('should support required attribute', () => {
      render(<Input required />)
      expect(screen.getByRole('textbox')).toBeRequired()
    })
  })

  describe('Form Integration', () => {
    it('should work with name attribute', () => {
      render(<Input name="email" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'email')
    })

    it('should work with value prop (controlled)', () => {
      render(<Input value="Controlled value" onChange={() => {}} />)
      expect(screen.getByRole('textbox')).toHaveValue('Controlled value')
    })

    it('should work with defaultValue prop (uncontrolled)', () => {
      render(<Input defaultValue="Default value" />)
      expect(screen.getByRole('textbox')).toHaveValue('Default value')
    })

    it('should support maxLength', () => {
      render(<Input maxLength={10} />)
      expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '10')
    })

    it('should support pattern', () => {
      render(<Input pattern="[0-9]*" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('pattern', '[0-9]*')
    })
  })

  describe('Neobrutalist Design', () => {
    it('should have brutal border styles', () => {
      render(<Input />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-brutalist-border')
    })

    it('should have shadow-brutal-sm styles', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).toHaveClass('shadow-brutal-sm')
    })

    it('should have hover transform effect', () => {
      render(<Input />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('hover:translate-x-[-2px]')
      expect(input).toHaveClass('hover:translate-y-[-2px]')
    })
  })

  describe('Ref Forwarding', () => {
    it('should forward ref to input element', () => {
      const ref = jest.fn()
      render(<Input ref={ref} />)
      expect(ref).toHaveBeenCalled()
    })
  })
})
