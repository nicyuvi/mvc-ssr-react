import { promises as fs } from 'fs';
import matter from 'gray-matter';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { markdownToHtml } from '../../utils/markdown.js';
import { PostMetaData, Post } from '../../types.js';

// NOTE: ReferenceError: __dirname is not defined in ES module scope. we derive it manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const postsDir = path.join(__dirname, 'content');

export async function fetchAllPosts(): Promise<PostMetaData[]> {
  const files = await fs.readdir(postsDir);
  const markdownFiles = files.filter((file) => file.endsWith('.md'));
  const posts = await Promise.all(
    markdownFiles.map(async (file) => {
      const filePath = path.join(postsDir, file);
      const fileContent = await fs.readFile(filePath, 'utf8');
      const { data: metadata } = matter(fileContent);
      const postMetaData: PostMetaData = {
        slug: file.replace('.md', ''),
        title: metadata.title || '',
        author: metadata.author || '',
        date: metadata.date || '',
        tags: metadata.tags || [],
        summary: metadata.summary || '',
      };
      return postMetaData;
    })
  );
  return posts;
}

export async function fetchPostBySlug(slug: string): Promise<Post> {
  const filePath = path.join(postsDir, `${slug}.md`);
  const data = await fs.readFile(filePath, 'utf-8');
  const { data: metadata, content: markdown } = matter(data);
  const html = await markdownToHtml(markdown);
  const post: Post = {
    title: metadata.title || '',
    author: metadata.author || '',
    date: metadata.date || '',
    tags: metadata.tags || [],
    summary: metadata.summary || '',
    html,
  };
  return post;
}
