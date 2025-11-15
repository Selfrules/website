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
      <div className="w-16 h-16 bg-gradient-to-br from-electric-blue to-deep-purple rounded border-brutal-thin border-spotify flex-shrink-0 animate-pulse-spotify" />

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white truncate mb-1 text-sm md:text-base font-heading font-bold">
          Loading...
        </p>
        <p className="text-brutalist-text-tertiary truncate text-xs md:text-sm font-body">
          Connecting to Spotify
        </p>
      </div>
    </div>
  );
}

function SpotifyError() {
  return (
    <div className="w-full bg-dark border-brutal-thin border-neon-pink rounded-brutal p-4 flex items-center gap-4 shadow-brutal-sm">
      <div className="w-16 h-16 rounded border-brutal-thin border-neon-pink bg-brutalist-text-secondary flex items-center justify-center flex-shrink-0">
        <Music className="w-8 h-8 text-neon-pink" />
      </div>
      <div className="flex-1">
        <p className="text-white truncate mb-1 text-sm md:text-base font-heading font-bold">
          Failed to load
        </p>
        <p className="text-brutalist-text-tertiary truncate text-xs md:text-sm font-body">
          Couldn&apos;t connect to Spotify
        </p>
      </div>
    </div>
  );
}

function SpotifyOffline() {
  return (
    <div className="w-full bg-dark border-brutal-thin border-black rounded-brutal p-4 flex items-center gap-4 shadow-brutal-sm">
      {/* Album Art Placeholder */}
      <div className="w-16 h-16 bg-gradient-to-br from-electric-blue to-deep-purple rounded border-brutal-thin border-spotify flex-shrink-0 animate-pulse-spotify" />

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white truncate mb-1 text-sm md:text-base font-heading font-bold">
          Not Playing
        </p>
        <p className="text-brutalist-text-tertiary truncate text-xs md:text-sm font-body">
          Offline
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
      className="w-full bg-dark border-brutal-thin border-black rounded-brutal p-4 flex items-center gap-4 shadow-brutal-sm hover:shadow-brutal hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all group"
      whileHover={{ scale: 1.01 }}
    >
      {/* Album Art */}
      <div className="w-16 h-16 rounded border-brutal-thin border-spotify flex-shrink-0 overflow-hidden relative">
        <Image
          src={track.albumArt}
          alt={`${track.album} album cover`}
          width={64}
          height={64}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Spotify Logo Overlay on Hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <ExternalLink className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white truncate mb-1 text-sm md:text-base font-heading font-bold group-hover:text-spotify transition-colors">
          {track.name}
        </p>
        <p className="text-brutalist-text-tertiary truncate text-xs md:text-sm font-body">
          {track.artist}
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
