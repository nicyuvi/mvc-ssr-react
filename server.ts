import fs from 'node:fs/promises';
import express from 'express';
import { setupMiddlewares } from './src/lib/middlewares.js';
import { getViteServer } from './src/lib/vite.js';
import { IS_PRODUCTION, PORT, BASE_URL } from './src/constants.js';
import { RenderFunctionType } from './src/types.js';
import postsRouter from './src/domain/posts/posts.routes.js';

// Cached production assets
const templateProd: string = IS_PRODUCTION
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : '';

// Create http server
const app = express();

// Add Vite and production middlewares
await setupMiddlewares(app, IS_PRODUCTION);

// TODO: : move this to constants to use in client and prerender on server
// Define routes to prerender
// const routes = ['/', '/about', '/posts'];

// routes
app.use('/posts', postsRouter);

// TODO: separate logic into functions for readability
// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url =
      BASE_URL === '/'
        ? req.originalUrl
        : req.originalUrl.replace(BASE_URL, '');

    let template: string | null = null;
    let render: RenderFunctionType | null = null;

    // todo: extract render logic
    if (!IS_PRODUCTION) {
      const vite = getViteServer();
      if (vite) {
        // Always read fresh template in development
        template = await fs.readFile('./index.html', 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        // Always fresh render since we are changing modules during development
        render = (await vite.ssrLoadModule('/src/views/entry-server.tsx'))
          .render;
      }
    } else {
      template = templateProd;
      // @ts-expect-error module doesn't exists until build
      render = (await import('./entry-server/entry-server.js')).render;
    }

    if (template === null) {
      throw new Error('Template was not assigned');
    }
    if (render === null) {
      throw new Error('Render function was not assigned');
    }

    // fetch data
    // todo: specify data shape
    const data = { user: { id: 'foo', name: 'bar' } };

    try {
      const { appHTML } = render(url, data);

      const html = template
        ?.replace(`<!--app-html-->`, appHTML ?? '')
        .replace(
          `<!--app-data-->`,
          `window.__HYDRATION_DATA__ = ${JSON.stringify(data)};`
        );

      res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
    } catch (error) {
      if (error instanceof Response && error.status === 301) {
        res.redirect(301, error.headers.get('Location') || '/');
      } else {
        res.status(500).send('Internal Server Error');
      }
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      const vite = getViteServer();
      vite?.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  }
});

// Start http server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
