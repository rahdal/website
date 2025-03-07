export default function Navigation() {
  return (
    <nav className="flex space-x-6 absolute top-12 left-0 right-0 justify-center">
      <a href="/" className="text-white hover:opacity-80 transition-opacity">
        home
      </a>
      <a href="/stuff" className="text-white hover:opacity-80 transition-opacity">
        stuff
      </a>
      <a href="/notes" className="text-white hover:opacity-80 transition-opacity">
        notes
      </a>
    </nav>
  );
} 