import type { Express } from 'express';
import { createViteServer } from './vite.js';
import { BASE_URL } from '../constants.js';

export async function setupMiddlewares(app: Express, isProduction: boolean) {
  if (!isProduction) {
    const vite = await createViteServer();
    app.use(vite.middlewares);
  } else {
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;
    app.use(compression());
    app.use(BASE_URL, sirv('./dist/client', { extensions: [] }));
    console.log('Production middlewares applied');
  }
}
