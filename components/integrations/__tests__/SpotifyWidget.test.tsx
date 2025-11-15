/**
 * SpotifyWidget Component Tests
 */

import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SpotifyWidget, SpotifyWidgetCompact } from '../SpotifyWidget';

// Mock useNowPlaying hook
const mockUseNowPlaying = jest.fn();
jest.mock('@/lib/hooks/useSpotify', () => ({
  useNowPlaying: () => mockUseNowPlaying(),
}));

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

describe('SpotifyWidget', () => {
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

  it('should show loading skeleton while fetching', () => {
    mockUseNowPlaying.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    renderWithClient(<SpotifyWidget />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Connecting to Spotify')).toBeInTheDocument();
  });

  it('should show error state when API fails', () => {
    mockUseNowPlaying.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    renderWithClient(<SpotifyWidget />);

    expect(screen.getByText('Failed to load')).toBeInTheDocument();
    expect(screen.getByText("Couldn't connect to Spotify")).toBeInTheDocument();
  });

  it('should show offline state when no track is playing', () => {
    mockUseNowPlaying.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    renderWithClient(<SpotifyWidget />);

    expect(screen.getByText('Not Playing')).toBeInTheDocument();
    expect(screen.getByText('Offline')).toBeInTheDocument();
  });

  it('should display track information when playing', () => {
    const mockTrack = {
      name: 'Bohemian Rhapsody',
      artist: 'Queen',
      album: 'A Night at the Opera',
      albumArt: 'https://example.com/album-art.jpg',
      spotifyUrl: 'https://open.spotify.com/track/xyz',
      isPlaying: true,
    };

    mockUseNowPlaying.mockReturnValue({
      data: mockTrack,
      isLoading: false,
      isError: false,
    });

    renderWithClient(<SpotifyWidget />);

    expect(screen.getByText('Bohemian Rhapsody')).toBeInTheDocument();
    expect(screen.getByText('Queen')).toBeInTheDocument();
    expect(screen.getByAltText('A Night at the Opera album cover')).toBeInTheDocument();
  });

  it('should have clickable link to Spotify when track is playing', () => {
    const mockTrack = {
      name: 'Test Song',
      artist: 'Test Artist',
      album: 'Test Album',
      albumArt: 'https://example.com/art.jpg',
      spotifyUrl: 'https://open.spotify.com/track/test123',
      isPlaying: true,
    };

    mockUseNowPlaying.mockReturnValue({
      data: mockTrack,
      isLoading: false,
      isError: false,
    });

    renderWithClient(<SpotifyWidget />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://open.spotify.com/track/test123');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should show playing indicator when track is playing', () => {
    const mockTrack = {
      name: 'Playing Song',
      artist: 'Artist Name',
      album: 'Album Name',
      albumArt: 'https://example.com/art.jpg',
      spotifyUrl: 'https://open.spotify.com/track/playing',
      isPlaying: true,
    };

    mockUseNowPlaying.mockReturnValue({
      data: mockTrack,
      isLoading: false,
      isError: false,
    });

    const { container } = renderWithClient(<SpotifyWidget />);

    // Check for animated bars (playing indicator)
    const playingIndicator = container.querySelector('.animate-pulse');
    expect(playingIndicator).toBeInTheDocument();
  });

  it('should not show playing indicator when track is not playing', () => {
    const mockTrack = {
      name: 'Paused Song',
      artist: 'Artist Name',
      album: 'Album Name',
      albumArt: 'https://example.com/art.jpg',
      spotifyUrl: 'https://open.spotify.com/track/paused',
      isPlaying: false,
    };

    mockUseNowPlaying.mockReturnValue({
      data: mockTrack,
      isLoading: false,
      isError: false,
    });

    const { container } = renderWithClient(<SpotifyWidget />);

    // Check that animated bars are NOT present
    const playingIndicator = container.querySelector('.animate-pulse');
    expect(playingIndicator).not.toBeInTheDocument();
  });
});

describe('SpotifyWidgetCompact', () => {
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

  it('should render null when loading', () => {
    mockUseNowPlaying.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    const { container } = renderWithClient(<SpotifyWidgetCompact />);

    expect(container.firstChild).toBeNull();
  });

  it('should render null when no track', () => {
    mockUseNowPlaying.mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    const { container } = renderWithClient(<SpotifyWidgetCompact />);

    expect(container.firstChild).toBeNull();
  });

  it('should render compact widget with track info', () => {
    const mockTrack = {
      name: 'Compact Song',
      artist: 'Compact Artist',
      album: 'Compact Album',
      albumArt: 'https://example.com/compact-art.jpg',
      spotifyUrl: 'https://open.spotify.com/track/compact',
      isPlaying: true,
    };

    mockUseNowPlaying.mockReturnValue({
      data: mockTrack,
      isLoading: false,
      isError: false,
    });

    renderWithClient(<SpotifyWidgetCompact />);

    expect(screen.getByText('Compact Song')).toBeInTheDocument();
    expect(screen.getByText('Compact Artist')).toBeInTheDocument();
  });

  it('should have link to Spotify in compact variant', () => {
    const mockTrack = {
      name: 'Link Test',
      artist: 'Link Artist',
      album: 'Link Album',
      albumArt: 'https://example.com/link-art.jpg',
      spotifyUrl: 'https://open.spotify.com/track/linktest',
      isPlaying: false,
    };

    mockUseNowPlaying.mockReturnValue({
      data: mockTrack,
      isLoading: false,
      isError: false,
    });

    renderWithClient(<SpotifyWidgetCompact />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://open.spotify.com/track/linktest');
  });
});
