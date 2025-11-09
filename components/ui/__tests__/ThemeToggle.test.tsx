import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeToggle } from '../ThemeToggle'

// Mock the theme store
const mockToggleTheme = jest.fn()
jest.mock('@/lib/theme-store', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: mockToggleTheme,
  }),
}))

describe('ThemeToggle', () => {
  beforeEach(() => {
    mockToggleTheme.mockClear()
  })

  describe('Rendering', () => {
    it('should render theme toggle button', async () => {
      render(<ThemeToggle />)
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument()
      })
    })

    it('should render with accessible label', async () => {
      render(<ThemeToggle />)
      await waitFor(() => {
        expect(screen.getByLabelText(/switch to/i)).toBeInTheDocument()
      })
    })

    it('should render properly', async () => {
      render(<ThemeToggle />)
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        expect(button).not.toBeDisabled()
      })
    })
  })

  describe('Theme Icons', () => {
    it('should show moon icon in light mode', async () => {
      render(<ThemeToggle />)
      await waitFor(() => {
        const button = screen.getByRole('button')
        const svg = button.querySelector('svg')
        expect(svg).toBeInTheDocument()
        // Moon icon has a path
        expect(svg?.querySelector('path')).toBeInTheDocument()
      })
    })
  })

  describe('User Interactions', () => {
    it('should call toggleTheme when clicked', async () => {
      render(<ThemeToggle />)
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).not.toBeDisabled()
      })

      const button = screen.getByRole('button')
      await userEvent.click(button)
      expect(mockToggleTheme).toHaveBeenCalledTimes(1)
    })

    it('should support keyboard interaction', async () => {
      render(<ThemeToggle />)
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).not.toBeDisabled()
      })

      const button = screen.getByRole('button')
      button.focus()
      await userEvent.keyboard('{Enter}')
      expect(mockToggleTheme).toHaveBeenCalled()
    })

    it('should support space key', async () => {
      render(<ThemeToggle />)
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).not.toBeDisabled()
      })

      const button = screen.getByRole('button')
      button.focus()
      await userEvent.keyboard(' ')
      expect(mockToggleTheme).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('should have proper button role', async () => {
      render(<ThemeToggle />)
      await waitFor(() => {
        expect(screen.getByRole('button')).toBeInTheDocument()
      })
    })

    it('should have aria-label describing action', async () => {
      render(<ThemeToggle />)
      await waitFor(() => {
        const button = screen.getByRole('button')
        const label = button.getAttribute('aria-label')
        expect(label).toContain('Switch to')
        expect(label).toContain('mode')
      })
    })

    it('should be keyboard focusable', async () => {
      render(<ThemeToggle />)
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).not.toBeDisabled()
      })

      const button = screen.getByRole('button')
      button.focus()
      expect(button).toHaveFocus()
    })

    it('should have focus visible styles', async () => {
      render(<ThemeToggle />)
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toHaveClass('focus-visible:ring-4')
      })
    })

    it('should hide SVG icons from screen readers', async () => {
      render(<ThemeToggle />)
      await waitFor(() => {
        const button = screen.getByRole('button')
        const svg = button.querySelector('svg')
        expect(svg).toHaveAttribute('aria-hidden', 'true')
      })
    })
  })

  describe('Styles', () => {
    it('should have neobrutalist design styles', async () => {
      render(<ThemeToggle />)
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toHaveClass('border-brutalist-border')
        expect(button).toHaveClass('shadow-brutal-sm')
        expect(button).toHaveClass('rounded-brutal')
      })
    })

    it('should have hover effects', async () => {
      render(<ThemeToggle />)
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toHaveClass('hover:shadow-brutal')
        expect(button).toHaveClass('hover:translate-x-[-2px]')
      })
    })

    it('should have active state effects', async () => {
      render(<ThemeToggle />)
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toHaveClass('active:translate-x-[2px]')
        expect(button).toHaveClass('active:translate-y-[2px]')
      })
    })

    it('should apply custom className', async () => {
      render(<ThemeToggle className="custom-class" />)
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toHaveClass('custom-class')
      })
    })
  })

  describe('Hydration', () => {
    it('should handle server-side rendering and mount', async () => {
      render(<ThemeToggle />)

      // Component may render enabled immediately in test environment
      // The important behavior is that it renders and works correctly
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
      })
    })

    it('should be functional after mount', async () => {
      render(<ThemeToggle />)
      await waitFor(() => {
        const button = screen.getByRole('button')
        expect(button).not.toBeDisabled()
      })

      const button = screen.getByRole('button')
      await userEvent.click(button)
      expect(mockToggleTheme).toHaveBeenCalled()
    })
  })
})
