// routes/postsRouter.js
import { Router } from 'express';
import { getAllPosts, getPostBySlug } from './posts.controller.js';

const postsRouter = Router();

// Route to get all posts
postsRouter.get('/', getAllPosts);

// Route to get a post by slug
postsRouter.get('/:slug', getPostBySlug);

export default postsRouter;
