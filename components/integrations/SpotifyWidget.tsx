'use client';

import { motion } from 'framer-motion';
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
    <div
      className={cn(
        'w-full max-w-[300px]',
        'h-[100px] rounded-lg',
        'border-3 border-black',
        'bg-white',
        'p-3 flex items-center gap-3',
        'animate-pulse'
      )}
    >
      <div className="w-16 h-16 bg-gray-200 rounded border-2 border-black" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

function SpotifyError() {
  return (
    <div
      className={cn(
        'w-full max-w-[300px]',
        'h-[100px] rounded-lg',
        'border-3 border-black',
        'bg-red-50',
        'p-3 flex items-center gap-3'
      )}
    >
      <div className="w-16 h-16 rounded border-2 border-black bg-red-100 flex items-center justify-center">
        <Music className="w-8 h-8 text-red-500" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-red-700">Failed to load</p>
        <p className="text-xs text-red-600">Couldn&apos;t connect to Spotify</p>
      </div>
    </div>
  );
}

function SpotifyOffline() {
  return (
    <div
      className={cn(
        'w-full max-w-[300px]',
        'h-[100px] rounded-lg',
        'border-3 border-black',
        'bg-white',
        'shadow-[4px_4px_0px_#000000]',
        'p-3 flex items-center gap-3'
      )}
    >
      <div className="w-16 h-16 rounded border-2 border-black bg-gray-100 flex items-center justify-center">
        <Music className="w-8 h-8 text-gray-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-black">Not currently playing</p>
        <div className="flex items-center gap-1 mt-1">
          <div className="w-2 h-2 rounded-full bg-gray-400" />
          <p className="text-xs text-black/60">Offline</p>
        </div>
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
      className={cn(
        'w-full max-w-[300px]',
        'h-[100px] rounded-lg',
        'border-3 border-black',
        'bg-white',
        'shadow-[4px_4px_0px_#000000]',
        'p-3 flex items-center gap-3',
        'transition-all duration-200',
        'hover:shadow-[6px_6px_0px_#000000] hover:-translate-x-[2px] hover:-translate-y-[2px]',
        'group cursor-pointer'
      )}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      {/* Album Art */}
      <div className="relative flex-shrink-0">
        <img
          src={track.albumArt}
          alt={`${track.album} album cover`}
          className="w-16 h-16 rounded border-2 border-black object-cover"
        />
        {track.isPlaying && (
          <motion.div
            className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            aria-label="Currently playing"
          />
        )}
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm text-black truncate group-hover:text-purple-primary transition-colors">
          {track.name}
        </h4>
        <p className="text-xs text-black/70 truncate mt-0.5">{track.artist}</p>

        {/* Status */}
        <div className="flex items-center gap-1 mt-1.5">
          <div
            className={cn(
              'w-2 h-2 rounded-full',
              track.isPlaying ? 'bg-green-500' : 'bg-gray-400'
            )}
          />
          <p className="text-xs text-black/60">
            {track.isPlaying ? 'Playing now' : 'Paused'}
          </p>
        </div>
      </div>

      {/* External Link Icon */}
      <ExternalLink className="w-4 h-4 text-black/40 group-hover:text-purple-primary transition-colors flex-shrink-0" />
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
        'flex items-center gap-2 p-2 rounded-lg',
        'border-2 border-black bg-white',
        'shadow-[2px_2px_0px_#000000]',
        'hover:shadow-[3px_3px_0px_#000000] hover:-translate-x-[1px] hover:-translate-y-[1px]',
        'transition-all'
      )}
      whileHover={{ scale: 1.02 }}
    >
      <img
        src={track.albumArt}
        alt="Now playing"
        className="w-10 h-10 rounded border-2 border-black"
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
