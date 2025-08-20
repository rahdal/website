import { getAllPostSlugs } from "@/lib/blog";
import { getSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Navigation from '../../components/Navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

// Force dynamic rendering since we need to check authentication
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateStaticParams() {
  try {
    const paths = getAllPostSlugs();
    return paths;
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Configure marked options for better rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

// Helper function to convert markdown to HTML using marked
function markdownToHtml(content: string): string {
  // First convert markdown to HTML
  let html = marked.parse(content) as string;
  
  // Post-process to handle TODO items
  html = html.replace(
    /<p>TODO:\s*([^<]+)<\/p>/g,
    '<div class="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mb-4"><span class="text-yellow-400 font-medium">TODO: $1</span></div>'
  );
  
  return html;
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  try {
    // Get session with error handling
    let session;
    try {
      session = await getSession();
    } catch (authError) {
      console.error('Auth error:', authError);
      // If auth fails, redirect to sign-in
      redirect(`/sign-in?redirect=${encodeURIComponent(`/notes/${params.slug}`)}`);
    }
    
    if (!session?.isAuthenticated) {
      redirect(`/sign-in?redirect=${encodeURIComponent(`/notes/${params.slug}`)}`);
    }

    // Read MDX file contents
    const postsDir = path.join(process.cwd(), 'content/blog');
    const fullPath = path.join(postsDir, `${params.slug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      notFound();
    }
    
    const file = fs.readFileSync(fullPath, 'utf8');
    const { content, data } = matter(file);

    return (
      <div className="min-h-screen bg-black bg-opacity-80 text-white flex flex-col items-center p-8 pt-24 relative z-10">
        <Navigation />
        <main className="max-w-xl w-full mt-12 relative">
          <article>
            <h1 className="text-2xl font-semibold mb-8">{(data as any)?.title}</h1>
            <div className="text-gray-400 mb-2">{(data as any)?.date}</div>
            <div className="text-gray-400 mb-12">{(data as any)?.description}</div>
            
            <div className="space-y-6 blog-content">
              <div 
                className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-p:leading-relaxed prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-strong:text-white prose-em:text-gray-200"
                dangerouslySetInnerHTML={{ 
                  __html: markdownToHtml(content)
                }}
              />
            </div>
          </article>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error rendering blog post:', error);
    // Return a user-friendly error page
    return (
      <div className="min-h-screen bg-black bg-opacity-80 text-white flex flex-col items-center p-8 pt-24">
        <Navigation />
        <main className="max-w-xl w-full mt-12 text-center">
          <h1 className="text-2xl font-semibold mb-4">Something went wrong</h1>
          <p className="text-gray-400">Unable to load this blog post. Please try again later.</p>
        </main>
      </div>
    );
  }
}

