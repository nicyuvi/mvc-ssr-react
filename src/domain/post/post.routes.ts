import { Request, Response, Router } from 'express';
import fs from 'fs';
import matter from 'gray-matter';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const postsRouter = Router();

// Helper function to convert Markdown to HTML
// async function markdownToHtml(markdown: unknown) {
//   const result = await remark().use(html).process(markdown);
//   return result.toString();
// }

// NOTE: ReferenceError: __dirname is not defined in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directory where Markdown files are stored
const postsDir = path.join(__dirname, 'content');

// GET all posts
// TODO: trycatch for error handling
postsRouter.get('/', (res: Response) => {
  fs.readdir(postsDir, (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Unable to read posts');
    } else {
      // Filter only .md files
      const markdownFiles = files.filter((file) => file.endsWith('.md'));
      const posts = markdownFiles.map((file) => {
        const filePath = path.join(postsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data: metadata } = matter(fileContent);
        return {
          slug: file.replace('.md', ''),
          ...metadata,
        };
      });

      console.log(posts);

      res.send('Returning all posts');
    }
  });
});

// GET a single post by ID
postsRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params; // Extract ID from request params
  res.send(`Returning post ${id}`);
});

export default postsRouter;
