import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  contentHtml?: string;
};

export function getSortedPostsData(): Omit<Post, 'content' | 'contentHtml'>[] {
  // Get file names under /content/blog
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'));
  const allPostsData = fileNames
    .map(fileName => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.(md|mdx)$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the slug
      return {
        slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
        description: matterResult.data.description || '',
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'));
  return fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.(md|mdx)$/, ''),
      },
    };
  });
}

export async function getPostData(slug: string): Promise<Post> {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  const chosenPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const fileContents = fs.readFileSync(chosenPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Return raw MDX/MD content; page will render via MDXRemote
  return {
    slug,
    title: matterResult.data.title,
    date: matterResult.data.date,
    description: matterResult.data.description || '',
    content: matterResult.content,
  };
} 