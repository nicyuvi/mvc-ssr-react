import { Request, Response } from 'express';
import { fetchAllPosts, fetchPostBySlug } from './posts.service.js';

export async function getAllPosts(_req: Request, res: Response) {
  try {
    const posts = await fetchAllPosts();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      error: `Internal Server Error: Failed to retrieve posts from the filesystem.`,
    });
  }
}

export async function getPostBySlug(req: Request, res: Response) {
  const { slug } = req.params;
  try {
    const post = await fetchPostBySlug(slug);
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statusCode: 500,
      error: `Internal Server Error: Failed to retrieve post ${slug} from the filesystem.`,
    });
  }
}
