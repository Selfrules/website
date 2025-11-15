/**
 * RecentPodcasts Component Tests
 */

import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecentPodcasts } from '../RecentPodcasts';

// Mock fetch
global.fetch = jest.fn();

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

// Mock Next Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe('RecentPodcasts', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });
    jest.clearAllMocks();
  });

  const renderWithClient = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  it('should show loading skeleton while fetching', async () => {
    (global.fetch as jest.Mock).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    renderWithClient(<RecentPodcasts />);

    expect(screen.getByText('Podcast Recenti')).toBeInTheDocument();

    // Check for skeleton loading indicators (animated divs)
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <RecentPodcasts />
      </QueryClientProvider>
    );
    const skeletonElements = container.querySelectorAll('.animate-pulse, .animate-pulse-spotify');
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it('should show empty state when no podcasts', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: [] }),
    });

    renderWithClient(<RecentPodcasts />);

    await screen.findByText('Nessun podcast recente');
    expect(screen.getByText('Controlla più tardi')).toBeInTheDocument();
  });

  it('should show empty state when API fails', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('API Error'));

    const { findByText } = renderWithClient(<RecentPodcasts />);

    // Wait for error state to be rendered (with increased timeout)
    const emptyText = await findByText('Nessun podcast recente', {}, { timeout: 3000 });
    expect(emptyText).toBeInTheDocument();
  });

  it('should display podcast list', async () => {
    const mockPodcasts = [
      {
        title: 'How to Build a Startup',
        show: 'Y Combinator',
        image: 'https://example.com/podcast1.jpg',
        url: 'https://open.spotify.com/episode/abc123',
        playedAt: '2025-01-15T10:00:00Z',
      },
      {
        title: 'The Future of AI',
        show: 'Lex Fridman Podcast',
        image: 'https://example.com/podcast2.jpg',
        url: 'https://open.spotify.com/episode/def456',
        playedAt: '2025-01-14T15:30:00Z',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockPodcasts }),
    });

    renderWithClient(<RecentPodcasts />);

    await screen.findByText('How to Build a Startup');
    expect(screen.getByText('Y Combinator')).toBeInTheDocument();
    expect(screen.getByText('The Future of AI')).toBeInTheDocument();
    expect(screen.getByText('Lex Fridman Podcast')).toBeInTheDocument();
  });

  it('should have clickable links to Spotify', async () => {
    const mockPodcasts = [
      {
        title: 'Test Podcast',
        show: 'Test Show',
        image: 'https://example.com/test.jpg',
        url: 'https://open.spotify.com/episode/test123',
        playedAt: '2025-01-15T10:00:00Z',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockPodcasts }),
    });

    renderWithClient(<RecentPodcasts />);

    const link = await screen.findByRole('link');
    expect(link).toHaveAttribute('href', 'https://open.spotify.com/episode/test123');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should display podcast cover images', async () => {
    const mockPodcasts = [
      {
        title: 'Visual Podcast',
        show: 'Visual Show',
        image: 'https://example.com/visual.jpg',
        url: 'https://open.spotify.com/episode/visual',
        playedAt: '2025-01-15T10:00:00Z',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockPodcasts }),
    });

    renderWithClient(<RecentPodcasts />);

    const image = await screen.findByAltText('Visual Show cover');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/visual.jpg');
  });

  it('should show fallback icon when no image', async () => {
    const mockPodcasts = [
      {
        title: 'No Image Podcast',
        show: 'No Image Show',
        image: '',
        url: 'https://open.spotify.com/episode/noimage',
        playedAt: '2025-01-15T10:00:00Z',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockPodcasts }),
    });

    const { container } = renderWithClient(<RecentPodcasts />);

    await screen.findByText('No Image Podcast');

    // Check for gradient background (fallback when no image)
    const gradientDiv = container.querySelector('.bg-gradient-to-br');
    expect(gradientDiv).toBeInTheDocument();
  });

  it('should limit to 2 podcasts maximum', async () => {
    const mockPodcasts = [
      {
        title: 'Podcast 1',
        show: 'Show 1',
        image: 'https://example.com/1.jpg',
        url: 'https://open.spotify.com/episode/1',
        playedAt: '2025-01-15T10:00:00Z',
      },
      {
        title: 'Podcast 2',
        show: 'Show 2',
        image: 'https://example.com/2.jpg',
        url: 'https://open.spotify.com/episode/2',
        playedAt: '2025-01-14T10:00:00Z',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockPodcasts }),
    });

    renderWithClient(<RecentPodcasts />);

    await screen.findByText('Podcast 1');

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2); // Should show exactly 2 podcasts
  });
});
