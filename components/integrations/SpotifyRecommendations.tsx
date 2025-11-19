'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Headphones, ExternalLink } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { FeaturedPodcast } from '@/lib/api/spotify';

function useFeaturedPodcasts() {
  return useQuery<FeaturedPodcast[]>({
    queryKey: ['featured-podcasts'],
    queryFn: async () => {
      const response = await fetch('/api/spotify/recommendations');

      if (!response.ok) {
        throw new Error('Failed to fetch featured podcasts');
      }

      const data = await response.json();
      return data.data || [];
    },
    staleTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    refetchInterval: false, // No auto-refresh (weekly update is fine)
    retry: 1,
  });
}

export function SpotifyRecommendations() {
  const t = useTranslations('whatImUpTo.recommendations');
  const { data: podcasts, isLoading, isError } = useFeaturedPodcasts();

  if (isLoading) {
    return <PodcastsSkeleton />;
  }

  if (isError || !podcasts || podcasts.length === 0) {
    return <PodcastsEmpty />;
  }

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
        {t('title')}
      </h4>
      <div className="grid gap-3">
        {podcasts.map((podcast, index) => (
          <PodcastCard key={`${podcast.spotifyUrl}-${index}`} podcast={podcast} />
        ))}
      </div>
    </div>
  );
}

function PodcastCard({ podcast }: { podcast: FeaturedPodcast }) {
  return (
    <motion.a
      href={podcast.spotifyUrl}
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
      {/* Podcast Cover */}
      <div className="w-14 h-14 flex-shrink-0 rounded border-brutal-thin border-spotify overflow-hidden relative">
        {podcast.image ? (
          <>
            <Image
              src={podcast.image}
              alt={`${podcast.name} cover`}
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
            <Headphones className="w-6 h-6 text-white" />
          </div>
        )}
      </div>

      {/* Podcast Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-heading font-bold truncate group-hover:text-spotify transition-colors">
          {podcast.name}
        </p>
        <p className="text-white/70 text-xs truncate">
          {podcast.publisher}
        </p>
      </div>
    </motion.a>
  );
}

function PodcastsSkeleton() {
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

function PodcastsEmpty() {
  const t = useTranslations('whatImUpTo.recommendations');

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
        {t('title')}
      </h4>
      <div className="flex items-center gap-3 p-4 bg-dark border-brutal-thin border-black rounded-brutal shadow-brutal-sm">
        <div className="w-12 h-12 rounded border-brutal-thin border-white/30 bg-white/10 flex items-center justify-center flex-shrink-0">
          <Headphones className="w-6 h-6 text-white/50" />
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
