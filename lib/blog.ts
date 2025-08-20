import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

export async function getSortedPostsData(): Promise<PostMeta[]> {
  const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith('.mdx'));
  const metas: PostMeta[] = [];
  for (const fileName of fileNames) {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    metas.push({
      slug,
      title: data.title || slug,
      date: data.date || '',
      description: data.description || '',
    });
  }
  return metas.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllPostSlugs() {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.mdx'));
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.mdx$/, ''),
      },
    };
  });
}
