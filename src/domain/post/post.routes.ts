import { Request, Response, Router } from 'express';
import { promises as fs } from 'fs';
import matter from 'gray-matter';
import path, { dirname } from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import { fileURLToPath } from 'url';

const postsRouter = Router();

// NOTE: ReferenceError: __dirname is not defined in ES module scope. we derive it manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const postsDir = path.join(__dirname, 'content');

postsRouter.get('/', (_req: Request, res: Response) => {
  (async () => {
    try {
      const files = await fs.readdir(postsDir);
      const markdownFiles = files.filter((file) => file.endsWith('.md'));
      const posts = await Promise.all(
        markdownFiles.map(async (file) => {
          const filePath = path.join(postsDir, file);
          const fileContent = await fs.readFile(filePath, 'utf8');
          const { data: metadata } = matter(fileContent);
          return {
            slug: file.replace('.md', ''),
            ...metadata,
          };
        })
      );
      res.json(posts);
    } catch (err) {
      console.error(err);
      res.status(500).send('Unable to read posts');
    }
  })();
});

// Helper function to convert Markdown to HTML
// TODO: move this to utils
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

postsRouter.get('/:slug', (req: Request, res: Response) => {
  const { slug } = req.params;
  (async () => {
    try {
      const filePath = path.join(postsDir, `${slug}.md`);
      const data = await fs.readFile(filePath, 'utf-8');
      const { data: metadata, content: markdown } = matter(data);
      const html = await markdownToHtml(markdown);
      res.json({ ...metadata, html });
    } catch (error) {
      console.error(error);
      res.status(500).send(`Unable to read post: ${slug}`);
    }
  })();
});

export default postsRouter;
