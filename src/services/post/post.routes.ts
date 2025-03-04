import { Router } from 'express';

// Create a new Router instance for post-related routes
const postRouter = Router();

postRouter.get('/', () => console.log('get post'));

export default postRouter;
