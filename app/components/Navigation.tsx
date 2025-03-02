export default function Navigation() {
  return (
    <nav className="flex space-x-6 absolute top-12 left-0 right-0 justify-center">
      <a href="/" className="text-white hover:opacity-80 transition-opacity">
        home
      </a>
      <a href="/background" className="text-white hover:opacity-80 transition-opacity">
        background
      </a>
      <a href="/books" className="text-white hover:opacity-80 transition-opacity">
        books
      </a>
      <a href="/blog" className="text-white hover:opacity-80 transition-opacity">
        blog
      </a>
    </nav>
  );
} 