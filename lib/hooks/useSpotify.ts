import { useQuery } from '@tanstack/react-query';
import type { SpotifyTrack } from '@/types/integrations';

export function useNowPlaying() {
  return useQuery<SpotifyTrack | null>({
    queryKey: ['spotify', 'now-playing'],
    queryFn: async () => {
      const response = await fetch('/api/spotify/now-playing');

      if (!response.ok) {
        if (response.status === 204) {
          // No content = not playing
          return null;
        }
        throw new Error('Failed to fetch now playing');
      }

      const json = await response.json();
      // Extract data from API response format: {data: SpotifyTrack, message?: string}
      return json.data;
    },
    refetchInterval: 30000, // Poll every 30 seconds
    refetchIntervalInBackground: false, // Don't poll when tab is inactive
    staleTime: 20000, // Consider data stale after 20 seconds
    retry: 1,
  });
}
