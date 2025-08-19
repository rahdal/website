import { getAllPostSlugs } from "@/lib/blog";
import { getSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Navigation from '../../components/Navigation';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const session = await getSession();
  if (!session.isAuthenticated) {
    redirect(`/sign-in?redirect=${encodeURIComponent(`/notes/${params.slug}`)}`);
  }
  // Read MDX file contents and render via MDXRemote
  const postsDir = path.join(process.cwd(), 'content/blog');
  const fullPath = path.join(postsDir, `${params.slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    notFound();
  }
  const file = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(file);

  return (
    <div className="min-h-screen bg-black bg-opacity-80 text-white flex flex-col items-center p-8 pt-24 relative z-10">
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="max-w-xl w-full mt-12 relative">
        <article>
          <h1 className="text-2xl font-semibold mb-8">{(data as any)?.title}</h1>
          <div className="text-gray-400 mb-2">{(data as any)?.date}</div>
          <div className="text-gray-400 mb-12">{(data as any)?.description}</div>

          <div className="space-y-6 blog-content">
            <MDXRemote source={content} />
          </div>
        </article>
      </main>
    </div>
  );
}

