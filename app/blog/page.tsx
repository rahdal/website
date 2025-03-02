import { getSortedPostsData } from "@/lib/blog";
import Navigation from '../components/Navigation';

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <div className="min-h-screen bg-black bg-opacity-80 text-white flex flex-col items-center p-8 pt-24 relative z-10">
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="max-w-xl w-full mt-12 relative">
        <h1 className="text-2xl font-semibold mb-8">blog</h1>

        <p className="text-gray-400 mb-12">a collection of random passionate thoughts.</p>

        <div className="space-y-8">
          {posts.map((post, index) => (
            <div key={index} className="grid grid-cols-[140px_1fr] gap-4">
              <div className="text-gray-400">{post.date}</div>
              <div>
                <h2 className="text-white mb-1">
                  <a href={`/blog/${post.slug}`} className="hover:opacity-80 transition-opacity">
                    {post.title}
                  </a>
                </h2>
                {post.description && <p className="text-gray-400">{post.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

