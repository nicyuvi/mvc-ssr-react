import type { ViteDevServer } from 'vite';
import { BASE_URL as base } from '../constants.js';

// todo: could be class
let vite: ViteDevServer | null = null;

export async function createViteServer() {
  if (vite) return vite; // Singleton

  const { createServer } = await import('vite');

  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });

  console.log('Vite dev server running');
  return vite;
}

export function getViteServer(): ViteDevServer | null {
  return vite;
}
