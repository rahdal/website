import { NextResponse } from 'next/server';

// Spotify API credentials
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

// Spotify API endpoints
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played';

// Get a new access token using the refresh token
async function getAccessToken() {
  console.log('🔄 Attempting to refresh access token...');

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
      throw new Error('❌ Missing Spotify credentials in environment variables');
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch("https://accounts.spotify.com/api/token", {
      method: 'POST',
      headers: {
          'Authorization': `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
      }).toString(),
  });

  const data = await response.json();
  console.log('🔍 Token Refresh Response:', data);

  if (!response.ok) {
      console.error('❌ Failed to refresh access token:', response.status, data);
      throw new Error('Failed to refresh access token');
  }

  console.log('✅ New access token:', data.access_token);

  return data.access_token;
}

// Fetch recently played tracks
async function getRecentlyPlayed(accessToken: string) {
  console.log('🔎 Using access token:', accessToken);

  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  console.log('📡 Fetch options:', options);

  const response = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=2", options);

  console.log('📡 Response headers:', response.headers);
  console.log('📡 Response status:', response.status, response.statusText);

  if (!response.ok) {
    const errorData = await response.json();
    console.error('❌ Failed to fetch recently played tracks:', errorData);
    throw new Error('Failed to fetch recently played tracks');
  }

  return response.json();
}

// API route handler
export async function GET() {
  try {
    // Check if required environment variables are set
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      return NextResponse.json(
        { error: 'Spotify API credentials not configured' },
        { status: 500 }
      );
    }

    // Get access token and fetch recently played tracks
    const accessToken = await getAccessToken();
    console.log('Access token:', accessToken);
    const recentlyPlayed = await getRecentlyPlayed(accessToken);

    return NextResponse.json(recentlyPlayed);
  } catch (error) {
    console.error('Error in Spotify API:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Spotify data' },
      { status: 500 }
    );
  }
} 