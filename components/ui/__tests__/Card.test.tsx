import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../Card'

describe('Card', () => {
  describe('Rendering', () => {
    it('should render with children', () => {
      render(<Card>Card content</Card>)
      expect(screen.getByText('Card content')).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      render(<Card className="custom-class">Content</Card>)
      const card = screen.getByText('Content').closest('div')
      expect(card).toHaveClass('custom-class')
    })

    it('should forward ref', () => {
      const ref = jest.fn()
      render(<Card ref={ref}>Card</Card>)
      expect(ref).toHaveBeenCalled()
    })
  })

  describe('Variants', () => {
    it('should render default variant', () => {
      render(<Card>Default Card</Card>)
      const card = screen.getByText('Default Card').closest('div')
      expect(card).toHaveClass('bg-brutalist-surface-light')
    })

    it('should render primary variant', () => {
      render(<Card variant="primary">Primary Card</Card>)
      const card = screen.getByText('Primary Card').closest('div')
      expect(card).toHaveClass('bg-primary')
    })

    it('should render secondary variant', () => {
      render(<Card variant="secondary">Secondary Card</Card>)
      const card = screen.getByText('Secondary Card').closest('div')
      expect(card).toHaveClass('bg-secondary')
    })

    it('should render accent variant', () => {
      render(<Card variant="accent">Accent Card</Card>)
      const card = screen.getByText('Accent Card').closest('div')
      expect(card).toHaveClass('bg-accent')
    })
  })

  describe('Interactive States', () => {
    it('should not be hoverable by default', () => {
      render(<Card>Non-hoverable</Card>)
      const card = screen.getByText('Non-hoverable').closest('div')
      expect(card).not.toHaveClass('hover:shadow-brutal-hover')
    })

    it('should be hoverable when hoverable prop is true', () => {
      render(<Card hoverable>Hoverable</Card>)
      const card = screen.getByText('Hoverable').closest('div')
      expect(card).toHaveClass('hover:shadow-brutal-hover')
    })

    it('should be clickable when clickable prop is true', () => {
      render(<Card clickable>Clickable</Card>)
      const card = screen.getByText('Clickable').closest('div')
      expect(card).toHaveClass('cursor-pointer')
      expect(card).toHaveClass('hover:shadow-brutal-hover')
    })

    it('should call onClick handler when clickable', async () => {
      const handleClick = jest.fn()
      render(
        <Card clickable onClick={handleClick}>
          Click me
        </Card>
      )
      const card = screen.getByText('Click me').closest('div')

      await userEvent.click(card!)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('CardHeader', () => {
    it('should render header with children', () => {
      render(
        <Card>
          <CardHeader>Header content</CardHeader>
        </Card>
      )
      expect(screen.getByText('Header content')).toBeInTheDocument()
    })

    it('should have proper padding', () => {
      render(
        <Card>
          <CardHeader>Header</CardHeader>
        </Card>
      )
      const header = screen.getByText('Header').closest('div')
      expect(header).toHaveClass('p-6')
    })
  })

  describe('CardTitle', () => {
    it('should render title as h3', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
          </CardHeader>
        </Card>
      )
      const title = screen.getByText('Card Title')
      expect(title.tagName).toBe('H3')
    })

    it('should have heading font styles', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Title</CardTitle>
          </CardHeader>
        </Card>
      )
      const title = screen.getByText('Title')
      expect(title).toHaveClass('font-heading')
      expect(title).toHaveClass('font-bold')
    })
  })

  describe('CardDescription', () => {
    it('should render description as paragraph', () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription>Card description</CardDescription>
          </CardHeader>
        </Card>
      )
      const description = screen.getByText('Card description')
      expect(description.tagName).toBe('P')
    })

    it('should have reduced opacity', () => {
      render(
        <Card>
          <CardHeader>
            <CardDescription>Description</CardDescription>
          </CardHeader>
        </Card>
      )
      const description = screen.getByText('Description')
      expect(description).toHaveClass('text-brutalist-text-light/80')
    })
  })

  describe('CardContent', () => {
    it('should render content with padding', () => {
      render(
        <Card>
          <CardContent>Content area</CardContent>
        </Card>
      )
      const content = screen.getByText('Content area').closest('div')
      expect(content).toHaveClass('p-6')
      expect(content).toHaveClass('pt-0')
    })
  })

  describe('CardFooter', () => {
    it('should render footer with flex layout', () => {
      render(
        <Card>
          <CardFooter>Footer content</CardFooter>
        </Card>
      )
      const footer = screen.getByText('Footer content').closest('div')
      expect(footer).toHaveClass('flex')
      expect(footer).toHaveClass('items-center')
    })

    it('should have proper gap spacing', () => {
      render(
        <Card>
          <CardFooter>Footer</CardFooter>
        </Card>
      )
      const footer = screen.getByText('Footer').closest('div')
      expect(footer).toHaveClass('gap-4')
    })
  })

  describe('Composite Card', () => {
    it('should render complete card structure', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>Test Content</CardContent>
          <CardFooter>Test Footer</CardFooter>
        </Card>
      )

      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText('Test Description')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
      expect(screen.getByText('Test Footer')).toBeInTheDocument()
    })
  })

  describe('Neobrutalist Design', () => {
    it('should have brutal border styles', () => {
      render(<Card>Brutal Card</Card>)
      const card = screen.getByText('Brutal Card').closest('div')
      expect(card).toHaveClass('border-brutalist-border')
      expect(card).toHaveClass('rounded-brutal')
    })

    it('should have shadow-brutal styles', () => {
      render(<Card>Shadow Card</Card>)
      const card = screen.getByText('Shadow Card').closest('div')
      expect(card).toHaveClass('shadow-brutal')
    })

    it('should have transition styles', () => {
      render(<Card>Transition Card</Card>)
      const card = screen.getByText('Transition Card').closest('div')
      expect(card).toHaveClass('transition-all')
      expect(card).toHaveClass('duration-200')
    })
  })

  describe('Accessibility', () => {
    it('should support aria attributes', () => {
      render(
        <Card aria-label="Test card" role="region">
          Content
        </Card>
      )
      const card = screen.getByLabelText('Test card')
      expect(card).toBeInTheDocument()
      expect(card).toHaveAttribute('role', 'region')
    })

    it('should support data attributes', () => {
      render(
        <Card data-testid="test-card">
          Content
        </Card>
      )
      expect(screen.getByTestId('test-card')).toBeInTheDocument()
    })
  })
})
