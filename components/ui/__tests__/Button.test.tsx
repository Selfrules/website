import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'

describe('Button', () => {
  describe('Rendering', () => {
    it('should render with children', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      render(<Button className="custom-class">Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('custom-class')
    })

    it('should forward ref', () => {
      const ref = jest.fn()
      render(<Button ref={ref}>Button</Button>)
      expect(ref).toHaveBeenCalled()
    })
  })

  describe('Variants', () => {
    it('should render primary variant by default', () => {
      render(<Button>Primary</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-primary')
    })

    it('should render secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-secondary')
    })

    it('should render accent variant', () => {
      render(<Button variant="accent">Accent</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-accent')
    })

    it('should render outline variant', () => {
      render(<Button variant="outline">Outline</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-transparent')
    })

    it('should render ghost variant', () => {
      render(<Button variant="ghost">Ghost</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-transparent')
      expect(button).toHaveClass('border-transparent')
    })
  })

  describe('Sizes', () => {
    it('should render medium size by default', () => {
      render(<Button>Medium</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-6')
      expect(button).toHaveClass('py-3')
    })

    it('should render small size', () => {
      render(<Button size="sm">Small</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-4')
      expect(button).toHaveClass('py-2')
    })

    it('should render large size', () => {
      render(<Button size="lg">Large</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-8')
      expect(button).toHaveClass('py-4')
    })

    it('should render extra large size', () => {
      render(<Button size="xl">Extra Large</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('px-10')
      expect(button).toHaveClass('py-5')
    })
  })

  describe('States', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
      expect(button).toHaveClass('disabled:opacity-50')
    })

    it('should not be clickable when disabled', async () => {
      const handleClick = jest.fn()
      render(<Button disabled onClick={handleClick}>Disabled</Button>)
      const button = screen.getByRole('button')

      await userEvent.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe('Interactions', () => {
    it('should call onClick handler when clicked', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      const button = screen.getByRole('button')

      await userEvent.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should support keyboard interaction', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Press me</Button>)
      const button = screen.getByRole('button')

      button.focus()
      await userEvent.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalled()
    })

    it('should support space key interaction', async () => {
      const handleClick = jest.fn()
      render(<Button onClick={handleClick}>Press me</Button>)
      const button = screen.getByRole('button')

      button.focus()
      await userEvent.keyboard(' ')
      expect(handleClick).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have proper button role', () => {
      render(<Button>Accessible Button</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should be focusable', () => {
      render(<Button>Focusable</Button>)
      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })

    it('should have focus visible styles', () => {
      render(<Button>Focus me</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('focus-visible:outline-none')
      expect(button).toHaveClass('focus-visible:ring-4')
    })

    it('should support aria-label', () => {
      render(<Button aria-label="Custom label">Icon</Button>)
      expect(screen.getByLabelText('Custom label')).toBeInTheDocument()
    })

    it('should support aria-describedby', () => {
      render(
        <>
          <Button aria-describedby="desc">Button</Button>
          <span id="desc">Description</span>
        </>
      )
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-describedby', 'desc')
    })
  })

  describe('HTML Attributes', () => {
    it('should support type attribute', () => {
      render(<Button type="submit">Submit</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('type', 'submit')
    })

    it('should support form attribute', () => {
      render(<Button form="my-form">Submit</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('form', 'my-form')
    })

    it('should support data attributes', () => {
      render(<Button data-testid="test-button" data-custom="value">Button</Button>)
      const button = screen.getByTestId('test-button')
      expect(button).toHaveAttribute('data-custom', 'value')
    })
  })

  describe('Neobrutalist Design', () => {
    it('should have brutal border styles', () => {
      render(<Button>Brutal Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('border-brutalist-border')
      expect(button).toHaveClass('rounded-brutal')
    })

    it('should have shadow-brutal styles', () => {
      render(<Button>Shadow Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('shadow-brutal')
    })

    it('should have active transform styles', () => {
      render(<Button>Active Button</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('active:translate-x-[4px]')
      expect(button).toHaveClass('active:translate-y-[4px]')
    })
  })
})
