'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

// Types for Spotify API response
interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface SpotifyArtist {
  name: string;
}

interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: {
    name: string;
    images: SpotifyImage[];
  };
  external_urls: {
    spotify: string;
  };
}

interface SpotifyRecentlyPlayed {
  track: SpotifyTrack;
  played_at: string;
}

export default function SpotifyRecent() {
  const [recentTrack, setRecentTrack] = useState<SpotifyTrack | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecentlyPlayed() {
      try {
        setLoading(true);
        const response = await fetch('/api/spotify/recent');
        
        if (!response.ok) {
          throw new Error('Failed to fetch recently played tracks');
        }
        
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setRecentTrack(data.items[0].track);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Spotify data:', err);
        setError('Could not load recent tracks');
        setLoading(false);
      }
    }

    fetchRecentlyPlayed();
  }, []);

  if (loading) {
    return (
      <div className="mt-8 p-4 border border-gray-800 rounded-md bg-gray-900 bg-opacity-50 animate-pulse">
        <p className="text-gray-400">Loading recent track...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 p-4 border border-gray-800 rounded-md bg-gray-900 bg-opacity-50">
        <p className="text-gray-400">{error}</p>
      </div>
    );
  }

  if (!recentTrack) {
    return (
      <div className="mt-8 p-4 border border-gray-800 rounded-md bg-gray-900 bg-opacity-50">
        <p className="text-gray-400">No recently played tracks found</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg text-gray-400 mb-3">recently played</h2>
      <a 
        href={recentTrack.external_urls.spotify} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center p-4 border border-gray-800 rounded-md bg-gray-900 bg-opacity-50 hover:bg-opacity-70 transition-all"
      >
        {recentTrack.album.images[0] && (
          <div className="flex-shrink-0 mr-4 relative w-16 h-16">
            <Image
              src={recentTrack.album.images[0].url}
              alt={recentTrack.album.name}
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
        <div className="flex-grow min-w-0">
          <p className="font-medium text-white truncate">{recentTrack.name}</p>
          <p className="text-gray-400 text-sm truncate">
            {recentTrack.artists.map(artist => artist.name).join(', ')}
          </p>
          <p className="text-gray-500 text-xs truncate mt-1">
            {recentTrack.album.name}
          </p>
        </div>
      </a>
    </div>
  );
} 