import Navigation from '../components/Navigation';
import Image from 'next/image';

// Experience data
const experiences = [
  {
    title: "Software Engineering Intern",
    company: "Palantir",
    period: "Summer 2025",
    description: "fdse intern, US commercial. summer 2025",
    icon: "/images/palantir.png"
  },
  {
    title: "Software Engineering Intern",
    company: "Capital One",
    period: "Summer 2024",
    description: "card tech swe intern. summer 2024",
    icon: "/images/c1.png"
  }
];

// Projects data
const education = [
  {
    title: "University of Michigan",
    company: "Capital One",
    period: "2022 - 2026",
    description: "studied computer science and a little math",
    icon: "/images/umich.png"
  }
];

export default function Experience() {
  return (
    <div className="min-h-screen bg-black bg-opacity-80 text-white flex flex-col items-center p-8 pt-24 relative z-10">
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="max-w-xl w-full mt-12 relative">
        <h1 className="text-2xl font-semibold mb-8">background</h1>

        {/* Work Experience Section */}
        <section className="mb-12">
          <h2 className="text-xl font-medium mb-6">experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="flex">
                <div className="mr-4 flex items-center justify-center" style={{ minWidth: '75px', width: '75px' }}>
                  <Image 
                    src={exp.icon} 
                    alt={`${exp.company} logo`} 
                    width={75} 
                    height={75}
                    className="object-contain max-h-[40px]"
                  />
                </div>
                <div>
                  <p className="text-white mb-1">{exp.company}</p>
                  <p className="mt-2 text-gray-300">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section>
          <h2 className="text-xl font-medium mb-6">education</h2>
          <div className="space-y-6">
            {education.map((education, index) => (
              <div key={index} className="flex">
                <div className="mr-4 flex items-center justify-center" style={{ minWidth: '75px', width: '75px' }}>
                  <Image 
                    src={education.icon} 
                    alt={`${education.title} icon`} 
                    width={75} 
                    height={75}
                    className="object-contain max-h-[40px]"
                  />
                </div>
                <div>
                <h3 className="text-white mb-1">{education.title}</h3>
                  <p className="text-gray-400">{education.period}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
} 