import Navigation from './components/Navigation';
import SpotifyRecent from './components/SpotifyRecent';

export default function Home() {
  return (
    <div className="min-h-screen bg-black bg-opacity-80 text-white flex flex-col items-center p-8 pt-24 relative z-10">
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="max-w-xl w-full mt-12 relative">
        <h1 className="text-2xl font-semibold mb-8">rahul dalvi</h1>

        <div className="space-y-6 mb-12">
          <p>currently studying computer science at umich.</p>

          <p>
            on campus I'm involved with michigan investment group (vp recruiting) and mrover.
            I'm also a research assistant in the SOTA lab. find me in the fishbowl, east hall, ugli, or dude.
          </p>

          <p>
            general interests: software, ken carson, clothes, design, robotics, and ML.
          </p>
        </div>

        {/* Spotify Recently Played */}
        <SpotifyRecent />

        {/* Social links */}
        <div className="flex space-x-6 mt-12">
          <a href="https://github.com/rahdal" target="_blank" className="text-white flex items-center">
            <span className="mr-1">↗</span> github
          </a>
          <a href="https://medium.com" className="text-white flex items-center">
            <span className="mr-1">↗</span> medium
          </a>
          <a href="https://linkedin.com" className="text-white flex items-center">
            <span className="mr-1">↗</span> linkedin
          </a>
        </div>
      </main>
    </div>
  )
}

