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
    <div className="w-full bg-[#0A0A0A] border-3 border-[#000] rounded-lg p-4 flex items-center gap-4 shadow-brutal-sm">
      {/* Album Art Placeholder */}
      <div className="w-16 h-16 bg-gradient-to-br from-[#0D7EFF] to-[#7209B7] rounded border-3 border-[#1DB954] flex-shrink-0 animate-pulse-spotify" />

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white truncate mb-1 text-sm md:text-base font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Loading...
        </p>
        <p className="text-[#6B7280] truncate text-xs md:text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          Connecting to Spotify
        </p>
      </div>
    </div>
  );
}

function SpotifyError() {
  return (
    <div className="w-full bg-[#0A0A0A] border-3 border-[#FF006E] rounded-lg p-4 flex items-center gap-4 shadow-brutal-sm">
      <div className="w-16 h-16 rounded border-3 border-[#FF006E] bg-[#2D2D2D] flex items-center justify-center flex-shrink-0">
        <Music className="w-8 h-8 text-[#FF006E]" />
      </div>
      <div className="flex-1">
        <p className="text-white truncate mb-1 text-sm md:text-base font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Failed to load
        </p>
        <p className="text-[#6B7280] truncate text-xs md:text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          Couldn&apos;t connect to Spotify
        </p>
      </div>
    </div>
  );
}

function SpotifyOffline() {
  return (
    <div className="w-full bg-[#0A0A0A] border-3 border-[#000] rounded-lg p-4 flex items-center gap-4 shadow-brutal-sm">
      {/* Album Art Placeholder */}
      <div className="w-16 h-16 bg-gradient-to-br from-[#0D7EFF] to-[#7209B7] rounded border-3 border-[#1DB954] flex-shrink-0 animate-pulse-spotify" />

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white truncate mb-1 text-sm md:text-base font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Not Playing
        </p>
        <p className="text-[#6B7280] truncate text-xs md:text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
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
    <div className="w-full bg-[#0A0A0A] border-3 border-[#000] rounded-lg p-4 flex items-center gap-4 shadow-brutal-sm">
      {/* Album Art Placeholder */}
      <div className="w-16 h-16 rounded border-3 border-[#1DB954] flex-shrink-0 overflow-hidden">
        <Image
          src={track.albumArt}
          alt={`${track.album} album cover`}
          width={64}
          height={64}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Track Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white truncate mb-1 text-sm md:text-base font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          {track.name}
        </p>
        <p className="text-[#6B7280] truncate text-xs md:text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
          {track.artist}
        </p>
      </div>

      {/* Playing Indicator */}
      {track.isPlaying && (
        <div className="flex gap-0.5 items-end flex-shrink-0">
          <div className="w-1 bg-[#1DB954] rounded-full animate-pulse" style={{ height: '12px', animationDelay: '0s' }} />
          <div className="w-1 bg-[#1DB954] rounded-full animate-pulse" style={{ height: '20px', animationDelay: '0.2s' }} />
          <div className="w-1 bg-[#1DB954] rounded-full animate-pulse" style={{ height: '16px', animationDelay: '0.4s' }} />
        </div>
      )}
    </div>
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
      <Image
        src={track.albumArt}
        alt="Now playing"
        width={40}
        height={40}
        className="w-10 h-10 rounded border-2 border-black"
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
