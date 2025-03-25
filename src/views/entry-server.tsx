import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { ServerSideProps } from '@types';
import App from './App';

export function render(
  url: string,
  serverSideProps: ServerSideProps
): { appHTML: string } {
  const appHTML = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App serverSideProps={serverSideProps} />
      </StaticRouter>
    </StrictMode>
  );

  return { appHTML };
}
