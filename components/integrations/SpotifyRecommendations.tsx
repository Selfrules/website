'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Music, ExternalLink } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { SpotifyRecommendation } from '@/lib/api/spotify';

function useRecommendations() {
  return useQuery<SpotifyRecommendation[]>({
    queryKey: ['spotify-recommendations'],
    queryFn: async () => {
      const response = await fetch('/api/spotify/recommendations');

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      return data.data || [];
    },
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    refetchInterval: false, // No auto-refresh (daily update is fine)
    retry: 1,
  });
}

export function SpotifyRecommendations() {
  const t = useTranslations('whatImUpTo.recommendations');
  const { data: recommendations, isLoading, isError } = useRecommendations();

  if (isLoading) {
    return <RecommendationsSkeleton />;
  }

  if (isError || !recommendations || recommendations.length === 0) {
    return <RecommendationsEmpty />;
  }

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
        {t('title')}
      </h4>
      <div className="grid gap-3">
        {recommendations.map((track, index) => (
          <RecommendationCard key={`${track.spotifyUrl}-${index}`} track={track} />
        ))}
      </div>
    </div>
  );
}

function RecommendationCard({ track }: { track: SpotifyRecommendation }) {
  return (
    <motion.a
      href={track.spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center gap-3 p-3',
        'bg-dark border-brutal-thin border-black rounded-brutal',
        'shadow-brutal-sm',
        'hover:shadow-brutal hover:-translate-x-[2px] hover:-translate-y-[2px]',
        'transition-all group'
      )}
      whileHover={{ scale: 1.01 }}
    >
      {/* Album Cover */}
      <div className="w-14 h-14 flex-shrink-0 rounded border-brutal-thin border-spotify overflow-hidden relative">
        {track.albumArt ? (
          <>
            <Image
              src={track.albumArt}
              alt={`${track.album} cover`}
              width={56}
              height={56}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* External link icon overlay on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-white" />
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-electric-blue to-deep-purple flex items-center justify-center">
            <Music className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-heading font-bold truncate group-hover:text-spotify transition-colors">
          {track.name}
        </p>
        <p className="text-white/70 text-xs truncate">
          {track.artist}
        </p>
      </div>
    </motion.a>
  );
}

function RecommendationsSkeleton() {
  const t = useTranslations('whatImUpTo.recommendations');

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
        {t('title')}
      </h4>
      <div className="grid gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-3 bg-dark border-brutal-thin border-black rounded-brutal shadow-brutal-sm"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-electric-blue to-deep-purple rounded border-brutal-thin border-spotify animate-pulse-spotify" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-white/10 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendationsEmpty() {
  const t = useTranslations('whatImUpTo.recommendations');

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
        {t('title')}
      </h4>
      <div className="flex items-center gap-3 p-4 bg-dark border-brutal-thin border-black rounded-brutal shadow-brutal-sm">
        <div className="w-12 h-12 rounded border-brutal-thin border-white/30 bg-white/10 flex items-center justify-center flex-shrink-0">
          <Music className="w-6 h-6 text-white/50" />
        </div>
        <div className="flex-1">
          <p className="text-white text-sm font-heading font-bold">
            {t('empty.title')}
          </p>
          <p className="text-white/60 text-xs">
            {t('empty.subtitle')}
          </p>
        </div>
      </div>
    </div>
  );
}
