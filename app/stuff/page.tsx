import Navigation from '../components/Navigation';

type proj = {
  title: string;
  description: string;
  year : string;
  link : string;
}

export default function StuffPage() {
  const projects: proj[] = [
    {
      title: 'rossrankings.com',
      description: 'satirical website to rank Ross clubs. peaked at 2k+ active users',
      year: '2025',
      link: 'https://rossrankings.com'
    },
    {
      title: 'image compression algorithm',
      description: 'lossy image compression using the FFT',
      year: '2023',
      link: 'https://github.com/rahdal/ImageCompression'
    },
    {
      title: 'high school covid dashboard',
      description: 'dashboard to view covid cases for my high school',
      year: '2022',
      link: 'https://github.com/rahdal/NHSCovidTracker'
    }

  ];

  return (
    <div className="min-h-screen bg-black bg-opacity-80 text-white flex flex-col items-center p-8 pt-24 relative z-10">
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="max-w-xl w-full mt-12 relative">
        <h1 className="text-2xl font-semibold mb-8">stuff</h1>

        <p className="text-gray-400 mb-12">stuff i've done</p>

        <div className="space-y-8">
          {projects.map((proj, index) => (
            <div key={index} className="grid grid-cols-[100px_1fr]">
              <div className="text-gray-400">{proj.year}</div>
              <div>
              <h2 className="text-white mb-1">
                    <a href={proj.link} className="hover:opacity-80 transition-opacity" target="_blank" rel="noopener noreferrer">
                    {proj.title}
                  </a>
                </h2>
                {proj.description && <p className="text-gray-400">{proj.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

