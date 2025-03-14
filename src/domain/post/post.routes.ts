import { Router, Request, Response } from 'express';

const postsRouter = Router();

// GET all posts
postsRouter.get('/', (req: Request, res: Response) => {
  console.log(req);
  res.send('Returning all posts');
});

// GET a single post by ID
postsRouter.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params; // Extract ID from request params
  res.send(`Returning post ${id}`);
});

export default postsRouter;
