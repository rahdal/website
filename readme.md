# Personal Website

A personal website built with Next.js, featuring a blog and Spotify integration.

## Features

- Responsive design with Tailwind CSS
- Blog with markdown content
- Recently played Spotify track display
- Beautiful rainbow string background animation

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Spotify Developer account (for the Spotify integration)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```
4. Set up your Spotify API credentials (see below)
5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Setting Up Spotify Integration

To display your recently played Spotify tracks, you need to set up the Spotify API:

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and log in
2. Create a new app
3. Note your Client ID and Client Secret
4. Set the redirect URI to `http://localhost:3000/api/spotify/callback`
5. Add these credentials to your `.env.local` file:
   ```
   SPOTIFY_CLIENT_ID=your_client_id_here
   SPOTIFY_CLIENT_SECRET=your_client_secret_here
   ```
6. Get a refresh token by visiting this URL (replace YOUR_CLIENT_ID):
   ```
   https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/api/spotify/callback&scope=user-read-recently-played
   ```
7. After authorization, you'll be redirected with a code parameter
8. The callback route will exchange this code for tokens and display the refresh token
9. Add the refresh token to your `.env.local` file:
   ```
   SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
   ```
10. **Optional**: Once you have your refresh token, you can safely remove the callback endpoint (`app/api/spotify/callback/route.ts`) as it's only needed for the initial OAuth flow.

## Deployment

This project can be deployed on Vercel, Netlify, or any other platform that supports Next.js applications. Make sure to set up the environment variables on your hosting platform.

## License

MIT 