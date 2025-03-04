import fs from 'node:fs/promises';
import express from 'express';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

// Cached production assets
const templateProd = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : '';

// Create http server
const app = express();

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite: import('vite').ViteDevServer | undefined;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));
}

// routes -- tsc doesn't include .js so we explicitly call it
// TODO: consider using esbuild instead of tsc so we can just call /post.routes
// and esbuild will include .js extension for me
import postRouter from './src/services/post/post.routes.js';

app.use('/post', postRouter);

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    console.log('frontend');
    const url =
      base === '/' ? req.originalUrl : req.originalUrl.replace(base, '');

    /** @type {string} */
    let template: string | undefined;
    /** @type {import('./src/views/entry-server.ts').render} */
    let render: (
      url: string,
      data: object
    ) => { appHTML: string; context: { url: string; status: number } };
    if (!isProduction && vite) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      // Always fresh render since we are changing modules during development
      render = (await vite.ssrLoadModule('/src/views/entry-server.tsx')).render;
    } else {
      template = templateProd;
      // @ts-expect-error module doesn't exists until build
      render = (await import('./entry-server/entry-server.js')).render;
    }

    // fetch data
    const data = { user: { id: 'foo', name: 'bar' } };

    const { appHTML, context } = render(url, data);

    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      res.redirect(301, context.url);
    } else {
      const html = template
        ?.replace(`<!--app-html-->`, appHTML ?? '')
        .replace(
          `<!--app-data-->`,
          `window.__HYDRATION_DATA__ = ${JSON.stringify(data)};`
        );

      res
        .status(context.status || 200)
        .set({ 'Content-Type': 'text/html' })
        .send(html);
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      vite?.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
