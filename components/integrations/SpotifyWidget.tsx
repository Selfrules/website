'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Music, ExternalLink } from 'lucide-react';
import { useNowPlaying } from '@/lib/hooks/useSpotify';
import { cn } from '@/lib/utils';

export function SpotifyWidget() {
  const { data: track, isLoading, isError } = useNowPlaying();

  if (isLoading) {
    return <SpotifySkeleton />;
  }

  if (isError) {
    return <SpotifyError />;
  }

  if (!track) {
    return <SpotifyOffline />;
  }

  return <SpotifyNowPlaying track={track} />;
}

function SpotifySkeleton() {
  return (
    <div className="w-full bg-dark border-brutal-thin border-black rounded-brutal p-4 flex items-center gap-4 shadow-brutal-sm">
      {/* Album Art Placeholder */}
      <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-electric-blue to-deep-purple rounded border-brutal-thin border-spotify flex-shrink-0 animate-pulse-spotify" />

      {/* Track Info */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-5 md:h-6 bg-white/20 rounded w-3/4 animate-pulse" />
        <div className="h-4 md:h-5 bg-white/10 rounded w-1/2 animate-pulse" />
        <div className="h-3 md:h-4 bg-white/5 rounded w-2/3 animate-pulse" />
      </div>
    </div>
  );
}

function SpotifyError() {
  return (
    <div className="w-full bg-dark border-brutal-thin border-neon-pink rounded-brutal p-4 flex items-center gap-4 shadow-brutal-sm">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded border-brutal-thin border-neon-pink bg-brutalist-text-secondary flex items-center justify-center flex-shrink-0">
        <Music className="w-8 h-8 md:w-10 md:h-10 text-neon-pink" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white truncate mb-1 text-base md:text-lg font-heading font-bold">
          Failed to load
        </p>
        <p className="text-white/80 truncate text-sm md:text-base font-body">
          Couldn&apos;t connect to Spotify
        </p>
        <p className="text-white/50 truncate text-xs md:text-sm font-body italic">
          Try refreshing the page
        </p>
      </div>
    </div>
  );
}

function SpotifyOffline() {
  return (
    <div className="w-full bg-dark border-brutal-thin border-black rounded-brutal p-4 flex items-center gap-4 shadow-brutal-sm">
      {/* Album Art Placeholder */}
      <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-electric-blue to-deep-purple rounded border-brutal-thin border-spotify flex-shrink-0 animate-pulse-spotify flex items-center justify-center">
        <Music className="w-8 h-8 md:w-10 md:h-10 text-white/30" />
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white truncate mb-1 text-base md:text-lg font-heading font-bold">
          Not Playing
        </p>
        <p className="text-white/80 truncate text-sm md:text-base font-body">
          Offline
        </p>
        <p className="text-white/50 truncate text-xs md:text-sm font-body italic">
          Start listening on Spotify
        </p>
      </div>
    </div>
  );
}

interface SpotifyNowPlayingProps {
  track: {
    name: string;
    artist: string;
    album: string;
    albumArt: string;
    spotifyUrl: string;
    isPlaying: boolean;
  };
}

function SpotifyNowPlaying({ track }: SpotifyNowPlayingProps) {
  return (
    <motion.a
      href={track.spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full bg-dark border-brutal-thin border-black rounded-brutal p-4 flex items-center gap-4 shadow-brutal-sm hover:shadow-brutal hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all group will-change-transform"
      whileHover={{ scale: 1.01 }}
      style={{ isolation: 'isolate' }}
    >
      {/* Album Art - Increased size for better visibility */}
      <div className="w-20 h-20 md:w-24 md:h-24 rounded border-brutal-thin border-spotify flex-shrink-0 overflow-hidden relative">
        <Image
          src={track.albumArt}
          alt={`${track.album} album cover`}
          width={96}
          height={96}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Spotify Logo Overlay on Hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <ExternalLink className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0 overflow-hidden">
        {/* Track Name - White, bold, larger */}
        <p className="text-white truncate mb-1 text-base md:text-lg font-heading font-bold group-hover:text-spotify transition-colors">
          {track.name}
        </p>
        {/* Artist - Improved contrast with lighter gray */}
        <p className="text-white/80 truncate text-sm md:text-base font-body mb-0.5">
          {track.artist}
        </p>
        {/* Album - Subtle but visible */}
        <p className="text-white/50 truncate text-xs md:text-sm font-body italic">
          {track.album}
        </p>
      </div>

      {/* Playing Indicator */}
      {track.isPlaying && (
        <div className="flex gap-0.5 items-end flex-shrink-0">
          <div className="w-1 bg-spotify rounded-full animate-pulse" style={{ height: '12px', animationDelay: '0s' }} />
          <div className="w-1 bg-spotify rounded-full animate-pulse" style={{ height: '20px', animationDelay: '0.2s' }} />
          <div className="w-1 bg-spotify rounded-full animate-pulse" style={{ height: '16px', animationDelay: '0.4s' }} />
        </div>
      )}
    </motion.a>
  );
}

// Alternative compact variant for sidebar
export function SpotifyWidgetCompact() {
  const { data: track, isLoading } = useNowPlaying();

  if (isLoading || !track) {
    return null;
  }

  return (
    <motion.a
      href={track.spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex items-center gap-2 p-2 rounded-brutal',
        'border-brutal-thin border-black bg-white',
        'shadow-brutal-sm',
        'hover:shadow-brutal-sm hover:-translate-x-[1px] hover:-translate-y-[1px]',
        'transition-all'
      )}
      whileHover={{ scale: 1.02 }}
    >
      <Image
        src={track.albumArt}
        alt="Now playing"
        width={40}
        height={40}
        className="w-10 h-10 rounded border-brutal-thin border-black"
        loading="lazy"
      />
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold truncate">{track.name}</p>
        <p className="text-xs text-black/60 truncate">{track.artist}</p>
      </div>
      {track.isPlaying && (
        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
      )}
    </motion.a>
  );
}
