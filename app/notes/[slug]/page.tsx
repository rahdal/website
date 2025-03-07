import { getAllPostSlugs, getPostData } from "@/lib/blog";
import Navigation from '../../components/Navigation';

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-black bg-opacity-80 text-white flex flex-col items-center p-8 pt-24 relative z-10">
      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="max-w-xl w-full mt-12 relative">
        <article>
          <h1 className="text-2xl font-semibold mb-8">{post.title}</h1>
          <div className="text-gray-400 mb-2">{post.date}</div>
          <div className="text-gray-400 mb-12">{post.description}</div>

          <div 
            className="space-y-6 blog-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
          />
        </article>
      </main>
    </div>
  );
}

