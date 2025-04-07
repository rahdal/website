import Navigation from './components/Navigation';
import SpotifyRecent from './components/SpotifyRecent';
import { Github, Instagram, Linkedin, Twitter } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-black bg-opacity-80 text-white flex flex-col items-center p-8 pt-24 relative z-10">
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="max-w-xl w-full mt-12 relative">
        <h1 className="text-2xl font-semibold mb-8">Rahul Dalvi</h1>

        <div className="space-y-6 mb-12">
          <p>currently studying computer science at umich.</p>

          <p>
            on campus I'm involved with michigan investment group and mrover.
            I'm also a research assistant in the SOTA lab. most frequented locations: fishbowl, east hall, ugli, dude.
          </p>

          <p>
            interests: space, software, ken carson, clothes, design, robotics, and ML.
          </p>
        </div>

        {/* Spotify Recently Played */}

        {/* Social links */}
        <div className="flex space-x-6 mt-12">
          <a href="https://instagram.com/rdalvi_" className="text-white flex items-center" target="_blank">
            <Instagram className="w-5 h-5 mr-1" /> 
          </a>
          <a href="https://x.com/rdalvi_" className="text-white flex items-center" target="_blank">
            <Twitter className="w-5 h-5 mr-1" /> 
          </a>

          <a href="https://github.com/rahdal" className="text-white flex items-center" target="_blank">
            <Github className="w-5 h-5 mr-1" /> 
          </a>
          <a href="https://linkedin.com/in/rahdal" className="text-white flex items-center" target="_blank">
            <Linkedin className="w-5 h-5 mr-1" /> 
          </a>
        </div>
      </main>
    </div>
  )
}

